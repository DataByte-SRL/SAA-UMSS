var btn_nueva_aula = document.querySelector(".btn-encabezado-a");


var overlay_form = document.querySelector(".overlay-form-a");
var form = document.querySelector(".form-a");

var ordenarPor = "capacidad";
var sentidoOrdenamiento = 1; // 1 (de menor a mayor) 0 (de mayor a menor)

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
            guardarDatosEnBD(datosFormulario , "agregarAmbiente.php");
        }
    });
}



function obtenerDatosFormulario(){
     var datosForm ={
      codFacultad : $('#facultad').val(),
      codTipoAmbiente: $('#tipo-ambiente').val(),
      codAmbiente : $('#nombre').val(),
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
    /* validando tipoAmbiente */
    if(datos['codTipoAmbiente']  == ""  ||  datos['codTipoAmbiente']  == null) {
        darMesajeErrorInput("seccion-advertencia-tipo-ambiente","Debe selecionar un tipo ambiente");
        res = 0;
    }else{
        borrarMensajeErrorInput( 'seccion-advertencia-tipo-ambiente');
    }
       

    /* Validando codAmbiente */
    var expresion= /^\s*[a-zA-Z0-9\-\s]{1,20}\s*$/;
    if(expresion.test(datos['codAmbiente'].trim())) {
        borrarMensajeErrorInput( 'seccion-advertencia-nombre');
    }else{
        darMesajeErrorInput("seccion-advertencia-nombre","Solo se acepta entre 1-20 caracteres alfanumericos y el simbolo - ");
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

obtenerListaBaseDatos();
var paginaActual= 1;
var cantPaginas = 1;
var maxFilasPagina = Number($(".select-filtro-mostrar").val()); 
if (!(maxFilasPagina == 25 ||maxFilasPagina == 50 ||maxFilasPagina == 70 ||maxFilasPagina == 100 )){
    maxFilasPagina = 50;
    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaAula(1);
}

datosTablaOriginal = [];
datosTabla = [];


function obtenerListaBaseDatos(){
    $('#tbody-lista-aulas').html("");
    var loader = document.querySelector(".seccion-loader");
    loader.classList.remove("oculto");
    $.post("./php/consultaListaAmbientes.php","datos",function(respuesta){
        var lista = JSON.parse(respuesta);
        datosTablaOriginal = lista;
        datosTabla = lista;
        loader.classList.add("oculto");
        verificarYAplicarFiltrosAulas();
        establecerPaginacion();
        ponerFuncionBotonesPaginacion();
        cargarDatosPaginaTablaAula(1);
    });
}

function cargarDatosPaginaTablaAula(numPagina){
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
                           <td class="codigosis-tabla">${element.nombreFacultad}</td>
                           <td>${element.codAmbiente}</td>
                           <td>${element.tipoAmbiente}</td>
                           <td>${element.detalles}</td>
                           <td>${element.capacidad}</td>
                           <td>${element.proyector}</td>
                           
                         
                     </tr>`;
    }
    $('#tbody-lista-aulas').html(template);
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
             cargarDatosPaginaTablaAula(aux);
        });
        n++;
    });

    if (btnIniciados == 0) {
        btnAtras.addEventListener("click",()=>{
            console.log(paginaActual);
            cargarDatosPaginaTablaAula(paginaActual-1);
        });
        btnAdelante.addEventListener("click",()=>{
            console.log(paginaActual);
            cargarDatosPaginaTablaAula(paginaActual+1);
        });
        btnIniciados = 1;
    }

}

ponerFuncionalidadFiltrosAulas();


function ponerFuncionalidadFiltrosAulas(){

    $(".select-filtro-facultad").change(function(){
        document.querySelector(".encabezado-input-buscar").value ="";
        verificarYAplicarFiltrosAulas();
    });

    $(".select-filtro-tipo-ambiente").change(function(){
        document.querySelector(".encabezado-input-buscar").value ="";
        verificarYAplicarFiltrosAulas();
    });


    $(".select-filtro-mostrar").change(function(){
        console.log($(this).val())
        cambiarCantidadDatosAMostrar(Number($(this).val()));
    });
    

}

function verificarYAplicarFiltrosAulas(){

    if (datosTablaOriginal.length == 0) {
        return;
    }
 
    var facultad = $(".select-filtro-facultad").val();
    var tipoAmbiente =  $(".select-filtro-tipo-ambiente").val();

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

    if (expresion.test(tipoAmbiente)){
        var filtradoTipoAmbiente = datosTabla.filter(item =>{
            if (tipoAmbiente  == 0) {
                return 1;
            }
           return item.codTipoAmbiente == tipoAmbiente;
        });

        datosTabla = filtradoTipoAmbiente;
    }

    ordenarTabla();

    


    establecerPaginacion();
    ponerFuncionBotonesPaginacion();
    cargarDatosPaginaTablaAula(1);
}

function ordenarTabla() {
    datosTabla.sort((a,b)=>{
        if (ordenarPor == "capacidad") {
            a = Number(a[ordenarPor].trim());

            b = Number(b[ordenarPor].trim());
            
        }else{
            a = a[ordenarPor].trim();
            a = a.toLowerCase();

            b = b[ordenarPor].trim();
            b = b.toLowerCase();
        }

        if (a == b) {
            return 0;
        }

        if (sentidoOrdenamiento) {
            if (a < b) {
                return -1;
            }
        }else{
            if (a > b) {
                return -1;
            }

        }

        return 1;
    });
    cargarDatosPaginaTablaAula(1);
}


function buscar(nombreColum,busqueda){

    if (datosTablaOriginal.length == 0) {
        return ;
    }

    datosTabla = datosTablaOriginal ; 
    verificarYAplicarFiltrosAulas();

    if (busqueda.length != 0) {
        var datoBusqueda = busqueda.toLowerCase();
        datoBusqueda = datoBusqueda.trim();
        datoBusqueda = datoBusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
        arregloFiltrado = datosTabla.filter(element =>{
            console.log(nombreColum);
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
    cargarDatosPaginaTablaAula(1);
    
}

function  ponerEventoInputBuscar(){
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
        cargarDatosPaginaTablaAula(1);
    }
}

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
               obtenerListaBaseDatos();
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