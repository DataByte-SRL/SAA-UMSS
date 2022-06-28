/*-------------------------------------------  Script  para el formulario de configuraicon e Historial------------------------------------------*/

funcionalidadBotonesEncabezado();
funcionBtnGuardaConfiguracion();

function cargarSeccionCofiguracion(){
    document.querySelector('.contenedor-formulario').classList.add("oculto");
    document.querySelector('.seccion-loader-configuracion').classList.remove("oculto");
    var mensajesError= document.querySelectorAll('.mensaje-error');
    mensajesError.forEach(element => {
        element.classList.add('oculto');
        
    });

    $.post("./php/configuracionReservas.php","",function (respuesta) {
        res = JSON.parse(respuesta);
        if (res["habilitado"] == "si") {
            document.querySelector("#radio-btn-si").checked=true;
        }else{
            document.querySelector("#radio-btn-no").checked=true;
        }

        document.querySelector('#input-minimo-dias').value = res["minimo"];
        document.querySelector('#input-maximo-dias').value = res["maximo"] ;

        document.querySelector('.contenedor-formulario').classList.remove("oculto");
        document.querySelector('.seccion-loader-configuracion').classList.add("oculto");
        
    });
    
}
function funcionalidadBotonesEncabezado(){
    document.querySelector(".opcion-lista-reservas").addEventListener("click",e=>{
        ocultarPestanias();
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".contenedor-lista-reservas").classList.remove("oculto");
    });

    document.querySelector(".opcion-configuracion-reservas").addEventListener("click",e=>{
        ocultarPestanias();
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".formulario-configuracion").classList.remove("oculto");
        cargarSeccionCofiguracion();
        
    });

    document.querySelector(".opcion-historial-configuracions").addEventListener("click",e=>{
        ocultarPestanias();
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".seccion-historial-configuraciones").classList.remove("oculto");
        ponerDatosTablaHistorial();
        
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
        document.querySelector(".mensaje-error-maximo-dias").textContent = "Debe poner un valor mayor al minimo de dias";
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
        e.target.disabled = true;
        e.target.textContent = "Guardando ...";

        if (  validarFormularioConfiguracion() == 1) {
            var datos = {
                minimo : document.querySelector("#input-minimo-dias").value,
                maximo : document.querySelector("#input-maximo-dias").value,
                habilitado : $('input[name="radio-btn-habilitar-reserva"]:checked').val(),
                motivo : document.querySelector("#input-motivo").value
            };

            $.post("./php/modificarCofiguracionReservas.php",datos,function (respuesta) {
                 e.target.disabled = false;
                 e.target.textContent = "Guardar Cambios";
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
            
        }else{
            e.target.disabled = false;
            e.target.textContent = "Guardar Cambios";
        }
    });
    
}


function ponerDatosTablaHistorial() {
    document.querySelector(".seccion-loader-historial").classList.remove("oculto");
    document.querySelector(".contenedor-tabla-historial").classList.add("oculto");
    $.post("./php/hitorialConfiguraciones.php",'',function (respuesta) {
        var res = JSON.parse(respuesta);
        
        var  template ="";
        var n=1;
        res.forEach(element => {
            template += `<tr>
                            <td class="celda-tabla-historial" scope="row">${n++}</td>
                            <td class="celda-tabla-historial">${element.codAministrador}</td>
                            <td class="celda-tabla-historial">${element.nombreAdmin + " " + element.apellidoAdmin}</td>
                            <td class="celda-tabla-historial">${element.fechaConfiguracion}</td>
                            <td class="celda-tabla-historial">${element.habilitado}</td>
                            <td class="celda-tabla-historial">${element.minimo}</td>
                            <td class="celda-tabla-historial">${element.maximo}</td>
                            <td class="celda-tabla-historial celda-tabla-historial-motivo">${element.motivo}</td>
                        </tr>`;           
        });

        document.querySelector(".seccion-loader-historial").classList.add("oculto");
        document.querySelector(".contenedor-tabla-historial").classList.remove("oculto");

        $('.tbody-tabla-historial').html(template);
        
    });
    
}

function ocultarPestanias() {
    document.querySelector(".opcion-configuracion-reservas").classList.remove("opcion-encabezdo-selecionado");
    document.querySelector(".opcion-lista-reservas").classList.remove("opcion-encabezdo-selecionado");
    document.querySelector(".opcion-historial-configuracions").classList.remove("opcion-encabezdo-selecionado");

    document.querySelector(".seccion-historial-configuraciones").classList.add("oculto");
    document.querySelector(".formulario-configuracion").classList.add("oculto");
    document.querySelector(".contenedor-lista-reservas").classList.add("oculto");
    
}


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */








/*-------------------------------------------------------------  script para a lista de reservas------------------------------------------------ */















/*---------------------------------------------------------------------------------------------------------------------------------------------------------------*/