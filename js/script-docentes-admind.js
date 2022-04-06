var btn_nuevo_usuario = document.querySelector(".btn-encabezado-a");
var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");

ponerFuncionBotones();



function ponerFuncionBotones(){
    
    btn_nuevo_usuario.addEventListener("click",()=>{
         overlay_form.classList.add("formulario-activo"); 
         form.classList.add("formulario-activo"); 
    });
    btn_cancelar_form.addEventListener("click",()=>{
        overlay_form.classList.remove("formulario-activo");
        form.classList.remove("formulario-activo"); 
        /* funcion para pobra doso los datos de los imputs */
    });
    overlay_form.addEventListener("click",(e)=>{
        if(e.target.classList.contains("overlay-form-a")){
                 overlay_form.classList.remove("formulario-activo");
                form.classList.remove("formulario-activo"); 

        }
    });
}