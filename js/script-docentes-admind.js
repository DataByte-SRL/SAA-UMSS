var btn_nuevo_usuario = document.querySelector(".btn-encabezado-a");




var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");


var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var btn_aceptar_form = document.querySelector(".seccion-botones-form-a .btn-aceptar");
var mensajeError = document.querySelectorAll(".mensaje-error-form-a")



ponerFuncionBotones();
ponerFuncionalidadMesajeErrorFom();





function ponerFuncionBotones(){
    
    btn_nuevo_usuario.addEventListener("click",()=>{
        abrirFormulario();
    });
    btn_cancelar_form.addEventListener("click",()=>{
        cerrarFormulario();
        borrarDatosForm("formulario-nuevo-docente");
    });
    overlay_form.addEventListener("click",(e)=>{
        if(e.target.classList.contains("overlay-form-a")){
                 overlay_form.classList.remove("formulario-activo");
                form.classList.remove("formulario-activo"); 

        }
    });

    btn_aceptar_form.addEventListener('click',()=>{
        var datosFormulario = obtenerDatosFormulario();
        var resValidacion = ValidarDatosFormulario(datosFormulario)
        if (resValidacion == "1") {
            guardarDatosEnBD(datosFormulario , "agregarDocente.php");
        }
    });
}



function obtenerDatosFormulario(){
    var datosForm ={
     codigoSis : $('#codigosis').val(),
     nombre : $('#nombre').val(),
     apellido : $('#apellido').val(),
     ci : $('#ci').val(),
     codFacultad : $('#facultad').val(),
    // departamento : $('#departamento').val(),
     celular : $('#celular').val(),
     telefono : $('#telefono').val(),
     correo : $('#correo').val(),
    };
     return datosForm ;  
}



function ValidarDatosFormulario(datos){
    var res = 1 ;  // se cambiara a 0 si hay error
    /*  Validando codigo sis */
    var expresion= /^\s*[0-9]{1,20}\s*$/;
    if(expresion.test(datos['codigoSis'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-codigosis');
    }else{
        darMesajeErrorInput("seccion-advertencia-codigosis","Campo obligatorio ,solo se aceptan numeros");
        res = 0;
    }
    /* Validando nombre */
     expresion= /^\s*[a-zA-Z\s]{3,20}\s*$/;
    if(expresion.test(datos['nombre'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-nombre');
    }else{
        darMesajeErrorInput("seccion-advertencia-nombre","Solo se aceptan letras,entre 3 y 20 caracteres ");
        res = 0;
    }
    /* Validando apellido*/
    expresion= /^\s*[a-zA-Z\s]{3,20}\s*$/;
    if(expresion.test(datos['apellido'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-apellido');
    }else{
        darMesajeErrorInput("seccion-advertencia-apellido","Solo se aceptan letras,entre 3 y 20 caracteres ");
        res = 0;
    }
    /* Validando ci*/
    expresion= /^\s*[0-9]{7}\s*$/;
    if(expresion.test(datos['ci'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-ci');
    }else{
        darMesajeErrorInput("seccion-advertencia-ci","Este campo debe tener 7 digitos");
        res = 0;
    }
    /* validando facultad */
    if(datos['codFacultad']  == ""  ||  datos['codFacultad']  == null) {
        darMesajeErrorInput("seccion-advertencia-facultad","Debe selecionar una facultad");
        res = 0;
    }else{
        borrarMensajeErrorInput( 'seccion-advertencia-facultad');
    }
    /* validando departamento 
    expresion= /^\s*[a-zA-Z\s]{0,25}\s*$/;
    if(expresion.test(datos['departamento'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-departamento');
    }else{
        darMesajeErrorInput("seccion-advertencia-departamento","Solo se aceptan letras,entre 5 y 25 caracteres ");
        res = 0;
    }*/
    /* validando celular */
    expresion= /^\s*[0-9]{7}\s*$/;
    if(expresion.test(datos['celular'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-celular');
    }else{
        darMesajeErrorInput("seccion-advertencia-celular","Debe tener 7 caracteres numericos");
        res = 0;
    }
    /* validadndo telefono*/

    expresion= /^\s*[0-9]{7}\s*$/;
    if(expresion.test(datos['telefono'].trim()) ||datos['telefono'].trim() == "" ) {
        borrarMensajeErrorInput( 'seccion-advertencia-telefono');
    }else{
        darMesajeErrorInput("seccion-advertencia-telefono","Debe tener 7 caracteres numericos");
        res = 0;
    }
    /* validando correo */
    expresion=/^\s*[^\(\)\<\>\@\,\;\:\"\[\]\ç\%\&\s]+@[a-zA-Z0-9\-\_]+\.[a-zA-Z0-9\-\_\.]+\s*$/; 
    var expresion1=/^.*[^\.]\s*$/; 
    var expresion2 = /.*@+.*\.\./;
    if(!expresion.test(datos['correo'].trim()) || !expresion1.test(datos['correo'].trim()) ||expresion2.test(datos['correo'].trim()) ){
        darMesajeErrorInput("seccion-advertencia-correo","Se debe seguir el formato user@dominio");
        res = 0;   
    }else{
        borrarMensajeErrorInput( 'seccion-advertencia-correo');
    }
    return res;
}


/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

llenarTablaDocnetes();

function llenarTablaDocnetes(){
    var loader = document.querySelector(".seccion-loader");
    loader.classList.remove("oculto");
    $.post("./php/consultaListaDocentes.php","datos",function(respuesta){
        console.log(respuesta);
        var lista = JSON.parse(respuesta);
        var template = "";
        
        console.log(lista);
        var n = 1;

        lista.forEach(element => {
           console.log(element.codigoSis);
             template += ` <tr>
                               <td>${n}</td>
                               <td class="codigosis-tabla">${element.codigoSis}</td>
                               <td>${element.nombre}</td>
                               <td>${element.apellido}</td>
                               <td>${element.ci}</td>
                               <td>${element.codFacultad}</td>
                               <td>${element.telefono}</td>
                               <td>${element.correo}</td>
                               <td>${element.celular}</td>
                               <td>${element.contrasena}</td>
                             
                         </tr>`;
            n++;
        });
        loader.classList.add("oculto");
        $('#tbody-lista-docentes').html(template);
    });

    


}
/*---------------------------------------------------------------------------------------------------------------------------------------------------------- */

function  guardarDatosEnBD(datosForm , nombreArchivoPHP){ // usar este metodo despues de validad los datos
    $(function(){
       $.post("./php/"+ nombreArchivoPHP,datosForm,function(respuestaArchivoPHP){
           //dependiendo del dato mostraremos  una alerta
           if(respuestaArchivoPHP == "1"){ // exito
               cerrarFormulario();
               borrarDatosForm("formulario-nuevo-docente");
               llenarTablaDocnetes();
               Swal.fire({
                   title : "Registro Exitoso!",
                   icon: "success",
                   showConfirmButton: false,
                   timer: 1300
               });
           }else{
               Swal.fire({
                   title : "Error!",
                   text: "No se puedo agregar por los siguientes motivos" +respuestaArchivoPHP ,
                   icon: "error" ,
                   confirmButtonColor:"#1071E5",
                   confirmButtonText:"Aceptar"
               });
           }
           
        });
    });
}



function ponerFuncionalidadMesajeErrorFom(){
    mensajeError.forEach(element => {
        var img = element.querySelector(".img-advertencia");
        img.addEventListener("mouseenter",()=>{
            var m = element.querySelector(".mensaje-error");
            m.classList.remove("oculto");
        });
        img.addEventListener("mouseleave",()=>{
            var m = element.querySelector(".mensaje-error");
            m.classList.add("oculto");
       });
    });
}


function darMesajeErrorInput(nombreSeccionAdvertencia,mensaje){
    var imgAdvertencia = document.querySelector( "."+nombreSeccionAdvertencia + " .img-advertencia") ;
    var mensajeAdvertencia = document.querySelector( "."+nombreSeccionAdvertencia + " .mensaje-error") ;
    try {
        imgAdvertencia.classList.remove('oculto')
        mensajeAdvertencia.textContent = mensaje;
    }  catch (error) {
        console.log("no se entro  boton para mostrar advertencia")
    }

}

function borrarMensajeErrorInput(nombreSeccionAdvertencia){

    var imgAdvertencia = document.querySelector( "."+nombreSeccionAdvertencia + " .img-advertencia") ;
    var mensajeAdvertencia = document.querySelector( "."+nombreSeccionAdvertencia + " .mensaje-error") ;
    try {
        imgAdvertencia.classList.add('oculto')
        mensajeAdvertencia.textContent = "";
    }  catch (error) {
        console.log("no se entro  boton para mostrar advertencia")
    }

}


function borrarDatosForm(nombreForm){
    try {
        var dato = '#'+nombreForm;
        var imgAdvertencias = document.querySelectorAll(".img-advertencia")
        var mensajesAdvertencias = document.querySelectorAll(".mensaje-error")
        imgAdvertencias.forEach(element => {
            element.classList.add('oculto');
            
        });
        mensajesAdvertencias.forEach(element => {
            element.textContent = "";
        });
        $(dato).trigger('reset');
    } catch (error) {
        console.log("problemas al resetear formulario")
        
    }

}

function cerrarFormulario(){
    overlay_form.classList.remove("formulario-activo");
    form.classList.remove("formulario-activo"); 

}

function abrirFormulario(){
    overlay_form.classList.add("formulario-activo"); 
    form.classList.add("formulario-activo"); 
}