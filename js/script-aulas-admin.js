var btn_nuevo_usuario = document.querySelector(".btn-encabezado-a");




var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");


var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var btn_aceptar_form = document.querySelector(".seccion-botones-form-a .btn-aceptar");
var mensajeError = document.querySelectorAll(".mensaje-error-form-a")



ponerFuncionBotones();
mostrarMesajeErrorFormulario();





function ponerFuncionBotones(){
    
    btn_nuevo_usuario.addEventListener("click",()=>{
         overlay_form.classList.add("formulario-activo"); 
         form.classList.add("formulario-activo"); 
    });
    btn_cancelar_form.addEventListener("click",()=>{
        overlay_form.classList.remove("formulario-activo");
        form.classList.remove("formulario-activo"); 
        borrarDatosForm("formulario-nuevo-aula");
    });
    overlay_form.addEventListener("click",(e)=>{
        if(e.target.classList.contains("overlay-form-a")){
                 overlay_form.classList.remove("formulario-activo");
                form.classList.remove("formulario-activo"); 

        }
    });

    btn_aceptar_form.addEventListener('click',()=>{
        obtenerDatosFormulario();
    });
}



function obtenerDatosFormulario(){
    $(function(){

        var datosForm ={
         facultad : $('#facultad').val(),
         nombre : $('#nombre').val(),
         capacidad : $('#capacidad').val(),
         detalles : $('#detalles').val(),
         proyector : $('input[name="proyector"]:checked').val()
        };
    
         console.log(ValidarDatosFormulario(datosForm));


         //  borrarDatosForm("formulario-nuevo-aula");
        
    });

}



function ValidarDatosFormulario(datos){
    var res = 1 ;  // se cambiara a 0 si hay error

    /* validando facultad */
    if(datos['facultad']  == ""  ||  datos['facultad']  == null) {
        darMesajeErrorInput("seccion-advertencia-facultad","Debe selecionar una facultad");
        res = 0;
    }else{
        borrarMensajeErrorInput( 'seccion-advertencia-facultad');
    }

    /* Validando nombre */
    var expresion= /^\s*[a-zA-Z0-9\s]{1,20}\s*$/;
    if(expresion.test(datos['nombre'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-nombre');
    }else{
        darMesajeErrorInput("seccion-advertencia-nombre","Debe tener almenos 1 caracter");
        res = 0;
    }

    /* validando capacidad */
    expresion= /^\s*[0-9]{1,7}\s*$/;
    if(expresion.test(datos['capacidad'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-capacidad');
    }else{
        darMesajeErrorInput("seccion-advertencia-capacidad","Este campo debe ser un numero positivo");
        res = 0;
    }
    /* validando detalles */

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



function mostrarMesajeErrorFormulario(){
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




/*var btn_nuevo_usuario = document.querySelector(".btn-encabezado-a");
var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");

var mensajeError = document.querySelectorAll(".mensaje-error-form-a")

ponerFuncionBotones();
mostrarMesajeErrorFormulario();


function mostrarMesajeErrorFormulario(){
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












function ponerFuncionBotones(){
    
    btn_nuevo_usuario.addEventListener("click",()=>{
         overlay_form.classList.add("formulario-activo"); 
         form.classList.add("formulario-activo"); 
    });
    btn_cancelar_form.addEventListener("click",()=>{
        overlay_form.classList.remove("formulario-activo");
        form.classList.remove("formulario-activo"); 
         //funcion para pobra doso los datos de los imputs 
    }); 
    overlay_form.addEventListener("click",(e)=>{
        if(e.target.classList.contains("overlay-form-a")){
                 overlay_form.classList.remove("formulario-activo");
                form.classList.remove("formulario-activo"); 

        }
    });


}


*/