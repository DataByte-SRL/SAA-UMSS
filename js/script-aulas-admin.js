var btn_nueva_aula = document.querySelector(".btn-encabezado-a");


var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");


var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var btn_aceptar_form = document.querySelector(".seccion-botones-form-a .btn-aceptar");
var mensajeError = document.querySelectorAll(".mensaje-error-form-a")


ponerFuncionBotones();
ponerFuncionalidadMesajeErrorFom();




function ponerFuncionBotones(){
    
    btn_nueva_aula.addEventListener("click",()=>{
        abrirFormulario();
    });
    btn_cancelar_form.addEventListener("click",()=>{
        cerrarFormulario();
        borrarDatosForm("formulario-nueva-aula");
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
            guardarDatosEnBD(datosFormulario , "agregarAula.php");
        }
    });
}



function obtenerDatosFormulario(){
     var datosForm ={
      codFacultad : $('#facultad').val(),
      codAula : $('#nombre').val(),
      capacidad : $('#capacidad').val(),
      detalles : $('#detalles').val(),
      proyector : $('input[name="proyector"]:checked').val()
     };
    return  datosForm;
}



function ValidarDatosFormulario(datos){
    var res = 1 ;  // se cambiara a 0 si hay error

    /* validando facultad */
    if(datos['codFacultad']  == ""  ||  datos['codFacultad']  == null) {
        darMesajeErrorInput("seccion-advertencia-facultad","Debe selecionar una facultad");
        res = 0;
    }else{
        borrarMensajeErrorInput( 'seccion-advertencia-facultad');
    }

    /* Validando codAula */
    var expresion= /^\s*[a-zA-Z0-9\s]{1,20}\s*$/;
    if(expresion.test(datos['codAula'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-nombre');
    }else{
        darMesajeErrorInput("seccion-advertencia-nombre","Debe tener almenos 1 caracter y maximo 20");
        res = 0;
    }

    /* validando capacidad */
    expresion= /^\s*[0-9]{1,20}\s*$/;
    if(expresion.test(datos['capacidad'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-capacidad');
    }else{
        darMesajeErrorInput("seccion-advertencia-capacidad","Este campo debe ser un numero positivo");
        res = 0;
    }
    /* validando detalles */
    datos['detalles'].trim()
    if(datos['detalles'].length <= 100) {
        borrarMensajeErrorInput( 'seccion-advertencia-detalles');
        console.log("detalles acptados")
    }else{
        darMesajeErrorInput("seccion-advertencia-detalles","Maximo 100 caracteres");
        res = 0;
    }

    // se aceptara cualquier tipo de caracter icluco puede  esta vacio

    /* validando proyector*/

    if(datos['proyector'] !== undefined && (datos['proyector'] == "si"  ||  datos['proyector'] == "no") ) {
        borrarMensajeErrorInput( 'seccion-advertencia-proyector');
    }else{
        darMesajeErrorInput("seccion-advertencia-proyector","Eliga una opcion");
        res = 0;
    }

    return res;
}
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


llenarTablaAulas();

function llenarTablaAulas(){
    var loader = document.querySelector(".seccion-loader");
    loader.classList.remove("oculto");
    $.post("./php/consultaListaAulas.php","datos",function(respuesta){
        console.log(respuesta);
        var lista = JSON.parse(respuesta);
        var template = "";
        
        console.log(lista);
        var n = 1;

        lista.forEach(element => {
           console.log(element.codigoSis);
             template += ` <tr>
                               <td>${n}</td>
                               <td class="codigosis-tabla">${element.codFacultad}</td>
                               <td>${element.codAula}</td>
                               <td>${element.detalles}</td>
                               <td>${element.capacidad}</td>
                               <td>${element.proyector}</td>
                             
                         </tr>`;
            n++;
        });
        loader.classList.add("oculto");
        $('#tbody-lista-docentes').html(template);
    });

    


}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function  guardarDatosEnBD(datosForm , nombreArchivoPHP){ // usar este metodo despues de validad los datos
    $(function(){
       $.post("./php/"+ nombreArchivoPHP,datosForm,function(respuestaArchivoPHP){
           //dependiendo del dato mostraremos  una alerta
           if(respuestaArchivoPHP == "1"){ // exito
               cerrarFormulario();
               borrarDatosForm("formulario-nueva-aula");
               Swal.fire({
                   title : "Registro Exitoso!",
                   icon: "success",
                   showConfirmButton: false,
                   timer: 1300
               });
               llenarTablaAulas()
           }else{
               Swal.fire({
                   title : "Error!",
                   text: "No se puedo agregar por estos motivos:"+respuestaArchivoPHP,
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