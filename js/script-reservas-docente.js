var materia = [];
var solicitantes = [];
var grupos = [];





ponerHoverEnInputsFormulario();







































function ponerHoverEnInputsFormulario(){
    var aux = document.querySelectorAll(".selecciones-seccion-input");
    aux.forEach(element => {
        element.addEventListener("mouseover",(e)=>{
            element.classList.add("selecciones-seccion-input-seleccionado");
        });
    
        element.addEventListener("mouseleave",(e)=>{
            element.classList.remove("selecciones-seccion-input-seleccionado");
        });
        
    });

}
