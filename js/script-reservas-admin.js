


funcionalidadBotonesEncabezado();
funcionBtnGuardaConfiguracion();

function cargarSeccionCofiguracion(){

    $.post("./php/configuracionReservas.php","",function (respuesta) {
        console.log(respuesta)
        res = JSON.parse(respuesta);
        console.log(res)
        if (res["habilitado"] == "si") {
            document.querySelector("#radio-btn-si").checked=true;
        }else{
            document.querySelector("#radio-btn-no").checked=true;
        }

        document.querySelector('#input-minimo-dias').value = res["minimo"];
        document.querySelector('#input-maximo-dias').value = res["maximo"] ;

        
    });
    
}
function funcionalidadBotonesEncabezado(){
    document.querySelector(".opcion-lista-reservas").addEventListener("click",e=>{
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".opcion-configuracion-reservas").classList.remove("opcion-encabezdo-selecionado");
        document.querySelector(".formulario-configuracion").classList.add("oculto");
         // ahcer visible la lista de reservas
    });

    document.querySelector(".opcion-configuracion-reservas").addEventListener("click",e=>{
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".opcion-lista-reservas").classList.remove("opcion-encabezdo-selecionado");
        document.querySelector(".formulario-configuracion").classList.remove("oculto");
        cargarSeccionCofiguracion();
        //ocultar la lsira de reservas
        
    });
}


function validarFormularioConfiguracion(){
    var exito = 1;
    
    var radioBtnVal =$('input[name="radio-btn-habilitar-reserva"]:checked').val();

    if ( radioBtnVal == "si"  || radioBtnVal == "no"  ) {
        
    }else{
        exito = 0;
    }

    var inputMin = document.querySelector("#input-minimo-dias").value;
    
    if (Number(inputMin) <=  0){
        document.querySelector(".mensaje-error-minimo-dias").textContent = "No puede poner un valor menor a 1";
        document.querySelector(".mensaje-error-minimo-dias").classList.remove("oculto");
        exito =0 ;
    }else{
        document.querySelector(".mensaje-error-minimo-dias").classList.add("oculto");
    }

    var inputMax = document.querySelector("#input-maximo-dias").value;

    if (Number(inputMax) <=  inputMin){
        document.querySelector(".mensaje-error-maximo-dias").textContent = "Depe poner un valor mayor al minimo de dias";
        document.querySelector(".mensaje-error-maximo-dias").classList.remove("oculto");
        exito =0 ;
    }else{
        
        document.querySelector(".mensaje-error-maximo-dias").classList.add("oculto");
    }

    var inputMotivo = document.querySelector("#input-motivo").value;
    
    document.querySelector(".mensaje-error-motivo").classList.add("oculto");
    if (inputMotivo.length  == 0 ){
        document.querySelector(".mensaje-error-motivo").textContent = "Debe poner el motivo de la modificacion";
        document.querySelector(".mensaje-error-motivo").classList.remove("oculto");
        exito =0 ;
    }

    if ( inputMotivo.length > 100){
        document.querySelector(".mensaje-error-motivo").textContent = "No debe para de los 100 caracteres";
        document.querySelector(".mensaje-error-motivo").classList.remove("oculto");
        exito =0 ;
    }

    return exito;

}

function funcionBtnGuardaConfiguracion() {
    document.querySelector(".btn-guardar-cambios").addEventListener("click",e=>{

        if (  validarFormularioConfiguracion() == 1) {
            var datos = {
                minimo : document.querySelector("#input-minimo-dias").value,
                maximo : document.querySelector("#input-maximo-dias").value,
                habilitado : $('input[name="radio-btn-habilitar-reserva"]:checked').val(),
                motivo : document.querySelector("#input-motivo").value
            };

            console.log(datos);

            $.post("./php/modificarCofiguracionReservas.php",datos,function (respuesta) {
                console.log(respuesta);
                if (respuesta == "1") {
                    document.querySelector("#input-motivo").value = "";
                    Swal.fire({
                        icon: "success",
                        text: "Se guardo los cambios con exito"
                    });

                }else{
                    Swal.fire({
                        icon: "error",
                        text: "No se puedo guardar la configuracion"
                    });
                }
                
            });
            
        }
    });
    
}