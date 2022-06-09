var btn_nuevo_usuario = document.querySelector(".btn-encabezado-a");




var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");

var btn_buscar= document.querySelector(".btn-input-bucar");
var btn_cancelar_form = document.querySelector(".seccion-botones-form-a .btn-cancelar");
var btn_aceptar_form = document.querySelector(".seccion-botones-form-a .btn-aceptar");
var mensajeError = document.querySelectorAll(".mensaje-error-form-a")



ponerFuncionBotones();
ponerFuncionalidadMesajeErrorFom();





function ponerFuncionBotones(){

    btn_buscar.addEventListener("click",()=>{
        buscar($(".opcion-busqueda").val(),document.querySelector(".encabezado-input-buscar").value);
     });
     ponerEventoInputBuscar();
    
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

obtenerListaBaseDatos();
var paginaActual= 1;
var cantPaginas = 1;
var maxFilasPagina = Number($(".select-filtro-mostrar").val()); 

if (!(maxFilasPagina == 25 ||maxFilasPagina == 50 ||maxFilasPagina == 70 ||maxFilasPagina == 100 )){
    maxFilasPagina = 50;
    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaDocente(1);
}

datosTablaOriginal = [];
datosTabla = [];

function obtenerListaBaseDatos(){
    $('#tbody-lista-docentes').html("");
    var loader = document.querySelector(".seccion-loader");
    loader.classList.remove("oculto");
    $.post("./php/consultaListaDocentes.php","datos",function(respuesta){
        var lista = JSON.parse(respuesta);
        datosTablaOriginal = lista;
        datosTabla = lista;
        datosTabla.sort((a,b)=>{
            var nombreA = a.nombre.toLowerCase();
            var nombreB = b.nombre.toLowerCase();
            
            if (nombreA < nombreB) {
                return -1;
            }

            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });
        loader.classList.add("oculto");
        establecerPaginacion();
        ponerFuncionBotonesPaginacion();
        cargarDatosPaginaTablaDocente(1);
    });
}

function cargarDatosPaginaTablaDocente(numPagina){
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
                          <td class="codigosis-tabla">${element.codigoSis}</td>
                          <td>${element.nombre}</td>
                          <td>${element.apellido}</td>
                          <td>${element.ci}</td>
                          <td>${element.nombreFacultad}</td>
                          <td>${element.telefono}</td>
                          <td>${element.correo}</td>
                          <td>${element.celular}</td>
                          <td>${element.contrasenia}</td>
                        
                    </tr>`;
    }
    $('#tbody-lista-docentes').html(template);
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
             cargarDatosPaginaTablaDocente(aux);
        });
        n++;
    });

    if (btnIniciados == 0) {
        btnAtras.addEventListener("click",()=>{
            console.log(paginaActual);
            cargarDatosPaginaTablaDocente(paginaActual-1);
        });
        btnAdelante.addEventListener("click",()=>{
            console.log(paginaActual);
            cargarDatosPaginaTablaDocente(paginaActual+1);
        });
        btnIniciados = 1;
    }

}

/* --------------------------------   funciones para  los filtos y busqueda */
ponerFuncionalidadFiltrosDocentes();


function ponerFuncionalidadFiltrosDocentes(){

    $(".select-filtro-facultad").change(function(){
        document.querySelector(".encabezado-input-buscar").value ="";
        verificarYAplicarFiltrosDocentes();
    });

    $(".select-filtro-ordenar").change(function(){
        document.querySelector(".encabezado-input-buscar").value ="";
        verificarYAplicarFiltrosDocentes();
    });
    $(".select-filtro-mostrar").change(function(){
        console.log($(this).val())
        cambiarCantidadDatosAMostrar(Number($(this).val()));
    });

}

function verificarYAplicarFiltrosDocentes(){

 

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

    if (ordenar == "nombre") {
        datosTabla.sort((a,b)=>{
            var nombreA = a.nombre.toLowerCase();
            var nombreB = b.nombre.toLowerCase();
            
            if (nombreA < nombreB) {
                return -1;
            }

            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });
    }else if(ordenar == "apellido"){
        datosTabla.sort((a,b)=>{
            var apellidoA = a.apellido.toLowerCase();
            var apellidoB = b.apellido.toLowerCase();

            if (apellidoA < apellidoB) {
                return -1;
            }

            if (apellidoA > apellidoB) {
                return 1;
            }
            return 0;
        });
    }else if (ordenar == "codigoSis") {
        datosTabla.sort((a,b)=>{
            var codigoSisA = a.codigoSis.toLowerCase();
            var codigoSisB = b.codigoSis.toLowerCase();

            if (codigoSisA < codigoSisB) {
                return -1;
            }

            if (codigoSisA > codigoSisB) {
                return 1;
            }
            return 0;
        });
        
    }

    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaDocente(1);
}



function buscar(nombreColum,busqueda){

    if (datosTablaOriginal.length == 0) {
        return ;
    }

    datosTabla = datosTablaOriginal ; 
    verificarYAplicarFiltrosDocentes();

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
    cargarDatosPaginaTablaDocente(1);
    
}

function  ponerEventoInputBuscar(){
    console.log(  document.querySelector(".encabezado-input-buscar"));
    document.querySelector(".encabezado-input-buscar").addEventListener('keyup', function(e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            buscar($(".opcion-busqueda").val(),document.querySelector(".encabezado-input-buscar").value);
        }
      });

}

function cambiarCantidadDatosAMostrar(cant){
    if (cant == 25 ||cant == 50 ||cant == 70 ||cant == 100 ) {
        maxFilasPagina = cant;
        establecerPaginacion();
        ponerFuncionBotonesPaginacion();
        cargarDatosPaginaTablaDocente(1);
    }
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
               obtenerListaBaseDatos();
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



