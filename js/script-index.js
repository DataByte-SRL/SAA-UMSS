

funcionBtnIniciarSesion();
funcionalidadUsuariMenu();
funcionalidadBtnContrasenia();



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





function funcionBtnIniciarSesion(){
    try {
        document.querySelector(".btn-iniciar-sesion").addEventListener("click",e=>{
            e.preventDefault();
            e.target.textContent ="INICIANDO ....";
            var datos = {
                codigosis:$(".input-codigoSis").val(),
                contrasena:$(".input-contrasena").val()
            }
            $.post("./php/iniciar-sesion.php",datos,function(respuesta){
                if (respuesta == "iniciado") {
                    location.reload();
                    
                }else{
                    document.querySelector(".mensaje-error-sesion").classList.remove("mensaje-error-sesion-oculto");
                    document.querySelector(".titulo-inicio-sesion").classList.add("mensaje-error-sesion-visible");
                    e.target.textContent ="INICIAR SESION";
                    console.log(respuesta);
                   

                }
                
            });
        });
    } catch (error) {
        
    }
}


function funcionalidadBtnContrasenia() {
    try {
        document.querySelector(".btn-contrasenia").addEventListener("click", e=>{
            if (e.target.classList.contains("btn-ver-contrasenia")) {
                e.target.classList.remove("btn-ver-contrasenia");
                e.target.classList.add("btn-ocultar-contrasenia");
                document.querySelector(".input-contrasena").setAttribute("type","password");
            }else{
                e.target.classList.remove("btn-ocultar-contrasenia");
                e.target.classList.add("btn-ver-contrasenia");
                document.querySelector(".input-contrasena").setAttribute("type","text");
            }
        });
        
    } catch (error) {
        
    }
    
    
}






