


funcionalidadUsuariMenu();




function funcionalidadUsuariMenu(){
    try {
        (document.querySelector(".nav-item-usuario")).addEventListener("click",(e)=>{
            var aux = document.querySelector(".opciones-usuario");
        
            if (aux.classList.contains("oculto")) {
                aux.classList.remove("oculto");
                
            }else{
                aux.classList.add("oculto");
            }
        });
        
        
        (document.querySelector(".nav-item-usuario")).addEventListener("mouseover",(e)=>{
            var aux = document.querySelector(".imagen-usuario");
            var aux2 = document.querySelector(".nombre-usuario-menu");
        
            aux.classList.add("imagen-usuario-hover");
            aux2.classList.add("nombre-usuario-hover");
        
        
           
        });
        
        (document.querySelector(".nav-item-usuario")).addEventListener("mouseleave",(e)=>{
            var aux = document.querySelector(".imagen-usuario");
            var aux2 = document.querySelector(".nombre-usuario-menu");
            aux.classList.remove("imagen-usuario-hover");
            aux2.classList.remove("nombre-usuario-hover");
           
        });

        (document.querySelector(".contenido-main")).addEventListener("click",(e)=>{
        
            var aux3 = document.querySelector(".opciones-usuario");
             aux3.classList.add("oculto");
           
        });
        
        
    } catch (error) {
        
    }

}








