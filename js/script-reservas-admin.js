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
        (document.querySelector(".seccion-paginacion")).classList.add("oculto");
        ponerDatosTablaListaReservas();
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

var btn_cerrar_detalles = document.querySelector(".seccion-botones-detalles-reservas .btn-cerrar");

var overlay_detalles_reserva = document.querySelector(".overlay-detalles-reservas");
var detalle_reserva = document.querySelector(".detalles-reservas");

/*var ordenarPor = "nombre";
var sentidoOrdenamiento = 1; // 1 (de menor a mayor) 0 (de mayor a menor)
var btn_buscar= document.querySelector(".btn-input-bucar");*/


ponerFuncionBotones();


function ponerFuncionBotones(){
    /*btn_buscar.addEventListener("click",()=>{
        buscar($(".opcion-busqueda").val(),document.querySelector(".encabezado-input-buscar").value);
     });
     ponerEventoInputBuscar();*/

    btn_cerrar_detalles.addEventListener("click",()=>{
        cerrarDetallesReserva();
    });

    overlay_detalles_reserva.addEventListener("click",(e)=>{
        if(e.target.classList.contains("overlay-detalles-reservas")){
                 overlay_detalles_reserva.classList.remove("destalles-reserva-activo");
                detalle_reserva.classList.remove("destalles-reserva-activo"); 

        }
    });
}


ponerDatosTablaListaReservas();
var paginaActual= 1;
var cantPaginas = 1;
var maxFilasPagina = Number($(".select-filtro-mostrar").val()); 

if (!(maxFilasPagina == 5 || maxFilasPagina == 25 ||maxFilasPagina == 50 ||maxFilasPagina == 70 ||maxFilasPagina == 100 )){
    maxFilasPagina = 50;
    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaReservas(1);
}

var datosTablaOriginal = [];
var datosTabla = [];

var datosAmbientes = [];
var datosDocentes = [];
var datosGrupos =[];

function ponerDatosTablaListaReservas(){
    $('#tbody-lista-reservas').html("");
    var loader = document.querySelector(".seccion-loader-lista-reservas ");
    loader.classList.remove("oculto");
    $.post("./php/consultaListaReservas.php","datos",function(respuesta){
        var lista = JSON.parse(respuesta);
        datosTablaOriginal = lista.reservas;
        datosTabla = lista.reservas;
        datosAmbientes = lista.ambientes;
        datosDocentes = lista.docentes;
        datosGrupos =lista.grupos;

        loader.classList.add("oculto");
        establecerPaginacion();
        ponerFuncionBotonesPaginacion();
        cargarDatosPaginaTablaReservas(1);
    });
}

function cargarDatosPaginaTablaReservas(numPagina){
    var template = "";
    if (numPagina < 1 || numPagina > cantPaginas) {
        return;
    }
    paginaActual = numPagina;

    var aux =  ((numPagina-1) * (maxFilasPagina));

    for (let index = aux ; index < (aux + maxFilasPagina) && index < datosTabla.length ; index++) {
        var element = datosTabla[index];
        template += ` <tr>
                          <td>${index+1}</td>
                          <td class="codigosis-tabla">${element.asunto}</td>
                          <td>${element.codMateria+ " - "+element.nombreMateria}</td>
                          <td>${element.fechaRerserva}</td>
                          <td>${element.horaInicio + " - " + element.horaFin}</td>
                          <td>
                            <Button class="btn-ver-detalles" value="${element.codReserva}" >Ver Detalles</Button>
                          </td>
                    </tr>`;
    }
    $('#tbody-lista-reservas').html(template);
    fucionalidadBtnVerDetalles();
    var numerosPaginacion = document.querySelectorAll(".page-item-numero");
    for (let index = 0; index < numerosPaginacion.length; index++) {
        element = numerosPaginacion[index];
        if (index == numPagina -1 ) {
            element.classList.add("active"); 
        }else{
            element.classList.remove("active");
        }
        
    }

}


function establecerPaginacion(){
    var template = ``;

    cantPaginas = Math.ceil(datosTabla.length / maxFilasPagina);

    if (cantPaginas == 0) {
         cantPaginas = 1;
    }

    for (let index = 1; index <= cantPaginas; index++) {
        template += `<li class="page-item page-item-numero" value = '${index}' ><a class="page-link value = '${index}' " href="#">${index}</a></li>`;
    }
     $('#numeros-paginacion').html(template);
     (document.querySelector(".seccion-paginacion")).classList.remove("oculto");
    

}

var btnIniciados = 0;

function ponerFuncionBotonesPaginacion(){
    var numerosPaginacion = document.querySelectorAll(".page-item-numero");
    var btnAtras = document.querySelector(".page-item-atras");
    var btnAdelante = document.querySelector(".page-item-adelante");
    var n = 1;
    numerosPaginacion.forEach(element => {
        var aux = n;
        element.addEventListener("click", (e)=>{
             cargarDatosPaginaTablaReservas(aux);
        });
        n++;
    });

    if (btnIniciados == 0) {
        btnAtras.addEventListener("click",()=>{
            cargarDatosPaginaTablaReservas(paginaActual-1);
        });
        btnAdelante.addEventListener("click",()=>{
            cargarDatosPaginaTablaReservas(paginaActual+1);
        });
        btnIniciados = 1;
    }

}

/* --------------------------------   funciones para  los filtos y busqueda */
ponerFuncionalidadFiltrosReservas();


function ponerFuncionalidadFiltrosReservas(){

   /* $(".select-filtro-facultad").change(function(){
        document.querySelector(".encabezado-input-buscar").value ="";
        verificarYAplicarFiltrosReservas();
    });*/

    $(".select-filtro-mostrar").change(function(){
        cambiarCantidadDatosAMostrar(Number($(this).val()));
    });

}
/*
function verificarYAplicarFiltrosReservas(){

    if (datosTablaOriginal.length == 0) {
        return;
    }
 
    var facultad = $(".select-filtro-facultad").val();
    var ordenar = $(".select-filtro-ordenar").val();


    datosTabla = datosTablaOriginal;

    var expresion= /^\s*[0-9]{1,5}\s*$/;

    if (expresion.test(facultad)){
        var filtradoFacultad = datosTabla.filter(item =>{
            if (facultad  == 0) {
                return 1;
            }
           return item.codFacultad == facultad;
        });

        datosTabla = filtradoFacultad;
    }

    ordenarTabla();
    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaReservas(1);
}*/

function ordenarTabla() {
    /*datosTabla.sort((a,b)=>{
    });
    cargarDatosPaginaTablaReservas(1);*/
}


/*function buscar(nombreColum,busqueda){

    if (datosTablaOriginal.length == 0) {
        return ;
    }

    datosTabla = datosTablaOriginal ; 
    verificarYAplicarFiltrosReservas();

    if (busqueda.length != 0) {
        var datoBusqueda = busqueda.toLowerCase();
        datoBusqueda = datoBusqueda.trim();
        datoBusqueda = datoBusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
        arregloFiltrado = datosTabla.filter(element =>{
            var datoColum = element[""+nombreColum].toLowerCase();
            datoColum = datoColum.trim();
            datoColum = datoColum.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
            
            if (datoColum.search(datoBusqueda) >= 0) {
                return 1;
            } 
            return 0;
        });
    
        datosTabla = arregloFiltrado;
    }
    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaReservas(1);
    
}

function  ponerEventoInputBuscar(){
    console.log(  document.querySelector(".encabezado-input-buscar"));
    document.querySelector(".encabezado-input-buscar").addEventListener('keyup', function(e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            buscar($(".opcion-busqueda").val(),document.querySelector(".encabezado-input-buscar").value);
        }
      });

}*/

function cambiarCantidadDatosAMostrar(cant){
    if (cant == 5 ||cant == 25 ||cant == 50 ||cant == 70 ||cant == 100 ) {
        maxFilasPagina = cant;
        establecerPaginacion();
        ponerFuncionBotonesPaginacion();
        cargarDatosPaginaTablaReservas(1);
    }
}
/*
funcionalidadColumnaTablero();

function funcionalidadColumnaTablero() {  // cuando haga click en alguno le los titulos de una columna de ordenara la tabla segun esa columana
    var tituloColumanas = document.querySelectorAll(".opcion-columna-tabla");
    tituloColumanas.forEach(element => {
        element.addEventListener("click",e=>{
            if (ordenarPor == e.target.attributes.value.textContent ) {
                if (sentidoOrdenamiento) {
                    sentidoOrdenamiento = 0;
                }else{
                    sentidoOrdenamiento = 1 ;
                }
                
            }else{
                ordenarPor = e.target.attributes.value.textContent;
                sentidoOrdenamiento = 1;
            }

            ordenarTabla()

            var aux = document.querySelectorAll(".opcion-columna-tabla");
            aux.forEach(element => {
                element.classList.remove("opcion-columna-tabla-seleccionado");
            });
            e.target.classList.add("opcion-columna-tabla-seleccionado");
            
        });

        
    });
}*/



function cerrarDetallesReserva(){
    overlay_detalles_reserva.classList.remove("destalles-reserva-activo");
    detalle_reserva.classList.remove("destalles-reserva-activo"); 
}

function abrirDetallesReserva(codReserva){
    overlay_detalles_reserva.classList.add("destalles-reserva-activo"); 
    detalle_reserva.classList.add("destalles-reserva-activo"); 
    auxDatosReserva = obtenerReserva(codReserva) ;
    auxDatosAmbientes = obtenerAmbientes(codReserva);
    auxDatosDocentes = obtenerDocentes(codReserva);
    auxDatosGrupos = obtenerGrupos(codReserva);
    document.querySelector(".contenido-asunto").textContent = auxDatosReserva.asunto;
    document.querySelector(".contenido-materia").textContent = auxDatosReserva.codMateria+" - "+ auxDatosReserva.nombreMateria;
    document.querySelector(".contenido-solicitantes").textContent = auxDatosDocentes;
    document.querySelector(".contenido-grupos").textContent = auxDatosGrupos[0];
    document.querySelector(".contenido-estudiantes").textContent = auxDatosGrupos[1];
    document.querySelector(".contenido-emeregencia").textContent = auxDatosReserva.emergencia;
    document.querySelector(".contenido-motivo-emergencia").textContent = auxDatosReserva.motivoEmergencia;
    document.querySelector(".contenido-fecha-reservada").textContent = auxDatosReserva.fechaRerserva;
    document.querySelector(".contenido-horario").textContent = auxDatosReserva.horaInicio+" - "+auxDatosReserva.horaFin;
    document.querySelector(".contenido-ambientes").textContent = auxDatosAmbientes[0];
    document.querySelector(".contenido-capacidad").textContent = auxDatosAmbientes[1];
    document.querySelector(".contenido-comentario").textContent = auxDatosReserva.comentario;
}


function fucionalidadBtnVerDetalles() {

    var btns = document.querySelectorAll(".btn-ver-detalles");
    
    btns.forEach(element => {
        element.addEventListener("click", e=>{
            abrirDetallesReserva(e.target.attributes.value.textContent);
        });
    });
    
    
}



function obtenerReserva(codReserva){
    var res = [];
    datosTablaOriginal.forEach(element => {
        if (element.codReserva == codReserva) {
            res = element;
        }
    });
    return res;
}

function obtenerAmbientes(codReserva){
    var res = ["",0];
    datosAmbientes.forEach(element => {
        if (element.codReserva == codReserva) {
            res[0] = res[0] +  " [ " + element.codAmbiente + " - Capacidad "+element.capacidad +" ]"  ;
            res[1] = Number(res[1]) + Number(element.capacidad);
        }
    });

    return res;
}

function obtenerDocentes(codReserva){
    var res = "";
    datosDocentes.forEach(element => {
        if (element.codReserva == codReserva) {
            res = res +  " [ "+ element.codDocente+" - " + element.nombreDocente + " ]"  ;
        }
    });
    return res;
}

function obtenerGrupos(codReserva){
    var res = ["",0];
    datosGrupos.forEach(element => {
        if (element.codReserva == codReserva) {
            res[0] = res[0] +  " [ Grupo - "  + element.codGrupo + " - Estudiantes " + element.estudiantes +  " ]"  ;
            res[1] = Number(res[1]) + Number(element.estudiantes);
        }
    });

    return res;
}


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------*/