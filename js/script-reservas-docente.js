var reservasHabilitads = 'no';

var horariosGrupos =  [];
var materia = [];
var solicitantes = [];
var grupos = [];
var periodos = [];
var sugerencias =[];
var ambientes =[];
var fecha = "";

var fechaActual = null;
var fechaMinima = null;
var fechaMaxima = null;
var fechaEmergencia = null;

var listaAmbientesDisponibles = [];

var usuario= {codigoSis:"" , nombre:"",codFacultad:""};


inicializar();




function inicializar(){
    $.post('./php/obtenerFechas.php','',function(respuestaFechas){
        var  aux = funcionalidadInputFecha(respuestaFechas);
        if (aux == 1) {
            $.post("./php/datosUsuario.php","",function(respuesta){
                var res = JSON.parse(respuesta);
                usuario.codigoSis = res.codigoSis;
                usuario.nombre = res.nombre + " " + res.apellido ;
                usuario.codFacultad = res.codFacultad ;
                //ponerHoverEnInputsFormulario();
                funcionBotonAgregar();
                funcionBotonesCerrarPopUp();
                agregarDatosSolicitantes(usuario.codigoSis,usuario.nombre);
                funcionBonesCambiarPasoFormulario();
                checkboxEmergencia();
                ponerHoverBtnInfoUrgencia();
                document.querySelector(".seccion-loader-formulario-reserva").classList.add("oculto");
                document.querySelector(".seccion-datos-reserva").classList.remove("oculto");
                
            });
        }else{
            document.querySelector(".seccion-loader-formulario-reserva").classList.add("oculto");
            document.querySelector(".contenedor-mensaje-formulario").classList.remove("oculto")
        }
        
    });
    
}



/* -------------------------Agregando funcionalidad a los botones--------------------------------- */

function funcionBonesCambiarPasoFormulario(){   // se pondra la funcio alo botones de anterios y siguiente paso
    document.querySelector(".btn-siguiente-paso").addEventListener("click",(e)=>{
        $.post('./php/obtenerFechas.php','',function(respuesta){
            var res = JSON.parse(respuesta);
            var inputFecha = document.querySelector(".input-fecha");
            inputFecha.setAttribute("value",res.fechaMinimaReserva);
            inputFecha.setAttribute("max",res.fechaMaximaReserva);
    
            var timeStamp = Number(res.timeStamp);
    
            fechaActual = new Date(timeStamp*1000);
    
            fechaMinima = new Date(((timeStamp)+(Number(res.minimo)*24*60*60))*1000);
            fechaMinima.setHours(0);fechaMinima.setMinutes(0);fechaMinima.setSeconds(0);
    
            fechaEmergencia =new Date(timeStamp*1000);
            fechaEmergencia.setHours(0);fechaEmergencia.setMinutes(0);fechaEmergencia.setSeconds(0);
    
            fechaMaxima = new Date(((timeStamp)+(Number(res.maximo)*24*60*60))*1000);
            fechaMaxima.setHours(0);fechaMaxima.setMinutes(0);fechaMaxima.setSeconds(0)

            if (document.querySelector(".checkbox-ergencia").checked) {
                auxDay = fechaEmergencia.getDate();
                if (Number(auxDay) < 10) {
                    auxDay = "0"+auxDay;
                }
                auxMonth = fechaEmergencia.getMonth() + 1;
                if (Number(auxMonth  < 10)) {
                    auxMonth = "0"+auxMonth;
                }
                inputFecha.setAttribute("min",fechaEmergencia.getFullYear()+"-"+auxMonth+"-"+auxDay);
            }else{
                inputFecha.setAttribute("min",res.fechaMinimaReserva);
            }

            if (verificarCamposFormulario(1) == 1) {
                document.querySelector(".seccion-aulas-reserva").classList.remove("oculto");
                document.querySelector(".seccion-datos-reserva").classList.add("oculto");
                var horaInicio = (periodos[0].nombre)[1];
                var horaFin =  (periodos[periodos.length-1].nombre)[2];
                var fechaReserva = fecha / 1000;
                var codFacultad = usuario.codFacultad;
           
                var dato = {fechaReserva ,codFacultad ,horaInicio,horaFin };

                $(".input-sugerencias").html("");
                $.post("./php/obtenerAmbientes.php",dato,function(respuesta){
                     try {
                         listaAmbientesDisponibles = JSON.parse(respuesta);
                         ponerDatosSeccionSugerencias();
                         
                     } catch (error) {
                         
                     }
                 });
            }
        });

        
    }); 

    document.querySelector(".btn-anterior-paso").addEventListener("click",(e)=>{
        document.querySelector(".seccion-aulas-reserva").classList.add("oculto");
        document.querySelector(".seccion-datos-reserva").classList.remove("oculto")
        
    }); 

    document.querySelector(".btn-reservar-aula").addEventListener('click',e=>{

        e.target.textContent = "Reservando ...";
        e.target.disabled = true;
        

        var horaInicio = (periodos[0].nombre)[1];
        var horaFin =  (periodos[periodos.length-1].nombre)[2];
        var fechaReserva = fecha / 1000;
        var codFacultad = usuario.codFacultad;

        var dato = {fechaReserva ,codFacultad ,horaInicio,horaFin };
        $.post("./php/obtenerAmbientes.php",dato,function(respuesta){
            try {
                listaAmbientesDisponibles = JSON.parse(respuesta);
                $.post('./php/obtenerFechas.php','',function(respuesta){
                    var res = JSON.parse(respuesta);
                    var inputFecha = document.querySelector(".input-fecha");
                    inputFecha.setAttribute("value",res.fechaMinimaReserva);
                    inputFecha.setAttribute("max",res.fechaMaximaReserva);
            
                    var timeStamp = Number(res.timeStamp);
            
                    fechaActual = new Date(timeStamp*1000);
            
                    fechaMinima = new Date(((timeStamp)+(Number(res.minimo)*24*60*60))*1000);
                    fechaMinima.setHours(0);fechaMinima.setMinutes(0);fechaMinima.setSeconds(0);
            
                    fechaEmergencia =new Date(timeStamp*1000);
                    fechaEmergencia.setHours(0);fechaEmergencia.setMinutes(0);fechaEmergencia.setSeconds(0);
            
                    fechaMaxima = new Date(((timeStamp)+(Number(res.maximo)*24*60*60))*1000);
                    fechaMaxima.setHours(0);fechaMaxima.setMinutes(0);fechaMaxima.setSeconds(0)
        
                    if (document.querySelector(".checkbox-ergencia").checked) {
                        auxDay = fechaEmergencia.getDate();
                        if (Number(auxDay) < 10) {
                            auxDay = "0"+auxDay;
                        }
                        auxMonth = fechaEmergencia.getMonth() + 1;
                        if (Number(auxMonth  < 10)) {
                            auxMonth = "0"+auxMonth;
                        }
                        inputFecha.setAttribute("min",fechaEmergencia.getFullYear()+"-"+auxMonth+"-"+auxDay);
                    }else{
                        inputFecha.setAttribute("min",res.fechaMinimaReserva);
                    }
        
                    if (verificarCamposFormulario(0) == 1) {
            

                        var asunto = document.querySelector('.input-asunto').value;
                        var codMateria = materia[0].codigo;
                        var codFacultad = usuario.codFacultad;
                        var horaInicio = (periodos[0].nombre)[1];
                        var fechaReserva = fecha / 1000;
                        var horaFin =  (periodos[periodos.length-1].nombre)[2];
                        var comentario = document.querySelector('.input-comentario').value;
                        var motivoEmergencia = "";
                        var emergencia = "no";
                        if (document.querySelector(".checkbox-ergencia").checked) {
                            emergencia = "si"
                            motivoEmergencia = document.querySelector(".input-motivo-emergencia").value;
                        }

                
                        var dato = {asunto,codMateria,codFacultad,horaInicio,horaFin,fechaReserva,comentario,motivoEmergencia,emergencia,ambientes,grupos,solicitantes};
                        console.log(dato);

                        $.post("./php/reservarAmbientes.php",dato,function(respuesta) {
                            if (respuesta ==  '1') {
                                Swal.fire({
                                    icon:'success',
                                    text:"La reserva fue exitosa"
                                });
                                
                            }else{
                                Swal.fire({
                                    icon:'error',
                                    text:"No se pudo hacer la reserva, intentelo denuevo"
                                });
                            }
                            e.target.disabled = false;
                            e.target.textContent = "Reservar Ambientes";
                        });
                    }else{ 

                        Swal.fire({
                            icon:'error',
                            text:"Por favor revise los campos del formuario"
                        });
                        e.target.disabled = false;
                        e.target.textContent = "Reservar Ambientes";
                    }
                });
                
            } catch (error) {
                console.log(error)
                console.log("error al optener los datos");
                e.target.disabled = false;
                e.target.textContent = "Reservar Ambientes";
            }
        });

    });
    
}


function  funcionBotonesCerrarPopUp(){
    var btns = document.querySelectorAll(".btn-cerrar-popup");
    btns.forEach(element => {
        element.addEventListener("click",()=>{
            cerrarPopUp();
        });
    });

    document.querySelector(".overlay-pagina-reserva").addEventListener("click",(e)=>{
        
        if(e.target.classList.contains("overlay-pagina-reserva")){
            
            cerrarPopUp();
         }
    });

}

function funcionBotonAgregar(){ // los botones de estan a la derecha de los inputs 
    var  btnAgregarMateria = document.querySelector(".btn-agregar-materia");
    var  btnAgregarSolicitante = document.querySelector(".btn-agregar-solicitante");
    var btnBuscarSolicitante = document.querySelector(".btn-buscar-solicitante");
    var btnBuscarGrupo = document.querySelector(".btn-agregar-grupo");
    var btnAgregarPerido = document.querySelector(".btn-agregar-periodo");
    var btnAgregarAmbiente = document.querySelector(".btn-agregar-ambiente");

    btnAgregarMateria.addEventListener("click",(e)=>{
        if (materia.length > 0) {
            Swal.fire({
                icon: 'error',
                text: 'Solo se permite una materia'
            });
        }else{
            abrirPopUp("popup-materia");
            ponerDatosPopUpMateria();
        }
    });
    
    btnAgregarSolicitante.addEventListener("click",(e)=>{
            if (materia.length == 0) {
                Swal.fire({
                    icon: 'error',
                    text: 'Primero debe elegir una materia'
                });
                
            }else{
                //document.querySelector(".input-buscar-solicitante").value="";
                ponerDatosPopUpSolicitantes(usuario.codigoSis);
                abrirPopUp("popup-solicitantes");
            }
    });
/*
    btnBuscarSolicitante.addEventListener("click",(e)=>{
        var dato = ""+document.querySelector(".input-buscar-solicitante").value;
        dato=dato.trim();
        ponerDatosPopUpSolicitantes(dato);
        
    });*/

    btnBuscarGrupo.addEventListener("click",(e)=>{

        if (materia.length != 1) {
            Swal.fire({
                icon:"error",
                text:"Primero debe elegir una materia"
            });
        }else{
            ponerDatosPopUpGrupos();
            abrirPopUp("popup-grupos");
        }
        
    });

    btnAgregarPerido.addEventListener("click" , (e)=>{
        controlarEstadoBotonesPeriodo();
            abrirPopUp("popup-periodos");
            
            
    });

    ponerFuncionalidadBotonesPeriodo();

    btnAgregarAmbiente.addEventListener("click", (e)=>{
        
            abrirPopUp("popup-ambientes");
            ponerDatosPopUpAmbientes();
        
    });


}


function checkboxEmergencia(){
    document.querySelector(".checkbox-ergencia").addEventListener("click" , e =>{
        
        if (e.target.checked) {
            var inputFecha = document.querySelector(".input-fecha");
            document.querySelector(".seccion-input-motivo").classList.remove("oculto");
            auxDay = fechaEmergencia.getDate();
            if (Number(auxDay) < 10) {
                auxDay = "0"+auxDay;
            }
            auxMonth = fechaEmergencia.getMonth() + 1;
            if (Number(auxMonth  < 10)) {
                auxMonth = "0"+auxMonth;
            }
            inputFecha.setAttribute("min",fechaEmergencia.getFullYear()+"-"+auxMonth+"-"+auxDay);
            
        }else{
            var inputFecha = document.querySelector(".input-fecha");
            auxDay = fechaMinima.getDate();
            if (Number(auxDay) < 10) {
                auxDay = "0"+auxDay;
            }
            auxMonth = fechaMinima.getMonth() + 1;
            if (Number(auxMonth  < 10)) {
                auxMonth = "0"+auxMonth;
            }

            inputFecha.setAttribute("min",fechaEmergencia.getFullYear()+"-"+auxMonth+"-"+auxDay);
            document.querySelector(".seccion-input-motivo").classList.add("oculto");
            document.querySelector(".mensaje-error-motivo").classList.add("oculto");
        }
    })
}

/*------------------------------------------ */
/* -------------------- poner datos a un popup y  funcionalida del boton agregar-------------------------- */
function ponerDatosPopUpMateria(){
    $(".contenido-tabla-reserva-materia").html("");
    document.querySelector(".seccion-loader-reserva").classList.remove("oculto");
      
    $.post("./php/obtenerMateriasDocente.php",usuario,function(respuesta){
        try {
            var lista = JSON.parse(respuesta);
            var template ="";
            lista.forEach(element => {
                 template+=`<tr class="fila-tabla-reserva">
                                <td class="casilla-columna casilla-columna-btn">
                                    <button class="btn-agregar-item-tabla">Agregar</button>
                                </td>
                                <td class="casilla-columna casilla-codigo ">${element.codigo}</td>
                                <td class="casilla-columna casilla-nombre ">${element.nombre}</td>
                            </tr>`;
                
            });
            document.querySelector(".seccion-loader-reserva").classList.add("oculto");
            $(".contenido-tabla-reserva-materia").html(template);
            var botones = document.querySelectorAll(".contenido-tabla-reserva-materia .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
            for (let index = 0; index < botones.length; index++) {
                botones[index].addEventListener("click",(e)=>{
                    agregarDatosMateria(e,lista[index].codigo ,lista[index].nombre);
                });
            }
        } catch (error) {
            console.log(error)
            console.log("error al optener los datos");
            
        }
    });
}

function ponerDatosPopUpSolicitantes(codigoSisSolicitante){

    var dato = {codigoSolicitante:""+codigoSisSolicitante, codMateria : ""+materia[0].codigo};
    
    $(".contenido-tabla-reserva-solicitantes").html("");
    document.querySelector(".popup-solicitantes .contenedor-tabla-loader .seccion-loader-reserva").classList.remove("oculto");
    $.post("./php/obtenerSolicitantes.php",dato,function(respuesta){
        try {
            var lista = JSON.parse(respuesta);
            var template ="";
            var indiceRepetidos = [];
            var n = 0;
            lista.forEach(element => {
                 solicitantes.forEach(element2 => {
                     if (element2.codigoSis == element.codigoSis) {
                         indiceRepetidos.push(n);
                     }
                 });
                 template+=`<tr class="fila-tabla-reserva">
                                <td class="casilla-columna casilla-columna-btn">
                                    <button class="btn-agregar-item-tabla">Agregar</button>
                                </td>
                                <td class="casilla-columna casilla-codigo ">${element.codigoSis}</td>
                                <td class="casilla-columna casilla-nombre ">${element.nombre}</td>
                            </tr>`;
                n++;
            });
            document.querySelector(".popup-solicitantes .contenedor-tabla-loader .seccion-loader-reserva").classList.add("oculto");
            $(".contenido-tabla-reserva-solicitantes").html(template);

            var botones = document.querySelectorAll(".contenido-tabla-reserva-solicitantes .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
            for (let index = 0; index < botones.length; index++) {

                if (indiceRepetidos.indexOf(index) != -1) {
                    
                    botones[index].classList.add("btn-agregar-deshabilitado");
                    botones[index].addEventListener("click",(e)=>{
                        Swal.fire({
                            icon: 'error',
                            text: 'Este usuario ya fue agregado'
                        });
                    });
                    
                }else{
                     botones[index].addEventListener("click",(e)=>{
                       agregarDatosSolicitantes(lista[index].codigoSis ,lista[index].nombre);
                     });
                }
            }
        } catch (error) {
            console.log(error)
            console.log("error al optener los datos");
            
        }
    });
}


function ponerDatosPopUpGrupos(){
    var dato = {solicitantes, materia: materia[0].codigo};
  
    $(".contenido-tabla-reserva-grupos").html("");
    document.querySelector(".popup-grupos .contenedor-tabla-loader .seccion-loader-reserva").classList.remove("oculto");
    $.post("./php/obtenerGrupos.php",dato,function(respuesta){
        try {
            var lista = JSON.parse(respuesta);
            var template ="";
            var indiceRepetidos = [];
            var n = 0;
            lista.forEach(element => {
                 grupos.forEach(element2 => {
                     if (element2.codigoGrupo == element.codigoGrupo) {
                         indiceRepetidos.push(n);
                     }
                 });

                template+=`<tr class="fila-tabla-reserva">
                                <td class="casilla-columna casilla-columna-btn">
                                    <button class="btn-agregar-item-tabla">Agregar</button>
                                </td>
                                <td class="casilla-columna casilla-codigo ">${element.codigoGrupo}</td>
                                <td class="casilla-columna casilla-codigo ">${element.cantidad}</td>
                                <td class="casilla-columna casilla-nombre ">${element.docente}</td>
                            </tr>`;
                n++;
            });

            document.querySelector(".popup-grupos .contenedor-tabla-loader .seccion-loader-reserva").classList.add("oculto");
            $(".contenido-tabla-reserva-grupos").html(template);

            var botones = document.querySelectorAll(".contenido-tabla-reserva-grupos .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
            for (let index = 0; index < botones.length; index++) {

                if (indiceRepetidos.indexOf(index) != -1) {
                    
                    botones[index].classList.add("btn-agregar-deshabilitado");
                    botones[index].addEventListener("click",(e)=>{
                        Swal.fire({
                            icon: 'error',
                            text: 'Este Grupo ya fue agregado'
                        });
                    });
                    
                }else{
                     botones[index].addEventListener("click",(e)=>{
                       agregarDatosGrupos(lista[index].codigoGrupo,lista[index].cantidad ,lista[index].codDocente );
                     });
                }
            }
            
        } catch (error) {
            console.log(error)
            console.log("error al optener los datos");
            
        }
    });

}


function ponerFuncionalidadBotonesPeriodo(){
    var botones = document.querySelectorAll(".contenido-tabla-reserva-periodos .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
    var nombrePeriodos =[['6:45 - 8:15','6:45:00','8:15:00'],
                        ["8:15 - 9:45",'8:15:00','9:45:00'],
                        ["9:45 - 11:15",'9:45:00','11:15:00'],
                        ["11:15 - 12:45",'11:15:00','12:45:00'],
                        ["12:45 - 14:15",'12:45:00','14:15:00'],
                        ["14:15 - 15:45",'14:15:00','15:45:00'],
                        ["15:45 - 17:15",'15:45:00','17:15:00'],
                        ["17:15 - 18:45",'17:15:00','18:45:00'],
                        ["18:45 - 20:15",'18:45:00','20:15:00'],
                        ["20:15 - 21:45",'20:15:00','21:45:00']];


    //var nombrePeriodos =["6:45 - 8:15","8:15 - 9:45","9:45 - 11:15","11:15 - 12:45","12:45 - 14:15","14:15 - 15:45","15:45 - 17:15","17:15 - 18:45","18:45 - 20:15","20:15 - 21:45"];

    

    for (let index = 0; index < botones.length; index++) {
        botones[index].addEventListener("click",(e)=>{
        
            if (periodos.length > 0) {
                if (periodos.length == 2) {
                    Swal.fire({
                        icon:"error",
                        text:"Ya no puede agregar este periodo"
                    });
                    return;
                }

                if (index <= Number(periodos[0].codigoPeriodo)  || index > Number(periodos[0].codigoPeriodo) + 1 ) {
                    Swal.fire({
                        icon:"error",
                        text:"Ya no puede agregar este periodo"
                    });
                }else{
                    if ( document.querySelector(".checkbox-ergencia").checked){
                        if (fechaEmergencia.getTime() == fecha) {
                            if (verificarPeriodoValido(index) == 0) {
                                Swal.fire({
                                    icon:"error",
                                    text:"Ya no puede reservar este periodo para hoy"
                                });
                            }else{
                                agregarDatosPeriodo(index,nombrePeriodos[index]);
                            }
                        }else{
                            agregarDatosPeriodo(index,nombrePeriodos[index]);
                        }

                    }else{
                        agregarDatosPeriodo(index,nombrePeriodos[index]);
                        
                    }
                }
                
            }else{
                if ( document.querySelector(".checkbox-ergencia").checked){
                    if (fechaEmergencia.getTime() == fecha) {
                        if (verificarPeriodoValido(index) == 0) {
                            Swal.fire({
                                icon:"error",
                                text:"Ya no puede reservar este periodo para hoy"
                            });
                        }else{
                            agregarDatosPeriodo(index,nombrePeriodos[index]);
                        }
                    }else{
                        agregarDatosPeriodo(index,nombrePeriodos[index]);
                    }

                }else{
                    agregarDatosPeriodo(index,nombrePeriodos[index]);
                    
                }
            }
           
        });
       
    }

}

function verificarPeriodoValido(codigoPeriodo){  // cuando la reserva sea el mismo dia nos dira si el periodo aun se puede reservar 
    var exito = 1;
    var timeStampPerido = (Number(fechaEmergencia.getTime())) + (6*60*60*1000)+ (45*60*1000);  
    timeStampPerido = timeStampPerido +(1.5*60*60*1000*codigoPeriodo); 
    if (timeStampPerido < fechaActual.getTime()){
        exito = 0;
    }
    return exito;
}

function controlarEstadoBotonesPeriodo(){
    var botones = document.querySelectorAll(".contenido-tabla-reserva-periodos .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
    
    for (let index = 0; index < botones.length; index++) {
        const element = botones[index];
        if (periodos.length == 0) {
            if ( document.querySelector(".checkbox-ergencia").checked){
                if (fechaEmergencia.getTime() == fecha) {
                    if (verificarPeriodoValido(index) == 0) {
                        element.classList.add("btn-agregar-deshabilitado");
                    }else{
                        element.classList.remove("btn-agregar-deshabilitado");
                    }
                }else{
                    element.classList.remove("btn-agregar-deshabilitado");
                }

            }else{
                element.classList.remove("btn-agregar-deshabilitado");
            }
        }else{
            if (periodos.length == 2) {
                element.classList.add("btn-agregar-deshabilitado");
            }else if (index <= Number(periodos[0].codigoPeriodo)  || index > Number(periodos[0].codigoPeriodo) + 1 ) {
                element.classList.add("btn-agregar-deshabilitado");
            }else{
                if ( document.querySelector(".checkbox-ergencia").checked){
                    if (fechaEmergencia.getTime() == fecha) {
                        if (verificarPeriodoValido(index) == 0) {
                            element.classList.add("btn-agregar-deshabilitado");
                        }else{
                            element.classList.remove("btn-agregar-deshabilitado");
                        }
                    }else{
                        element.classList.remove("btn-agregar-deshabilitado");
                    }

                }else{
                    element.classList.remove("btn-agregar-deshabilitado");
                    
                }
            }
        }
    }
}

function ponerDatosSeccionSugerencias(){
    $(".input-sugerencias").html("");
    sugerencias = [];
     var lista = [];
     lista = sugerirAmbientes();
     lista.forEach(element => {
        agregarDatosSugerenciaAmbientes(element.codigoAmbiente,element.capacidad);
     });

}


function ponerDatosPopUpAmbientes(){
     var horaInicio = (periodos[0].nombre)[1];
     var horaFin =  (periodos[periodos.length-1].nombre)[2];
     var fechaReserva = fecha / 1000;
     var codFacultad = usuario.codFacultad;

    var dato = {fechaReserva ,codFacultad ,horaInicio,horaFin };

    $(".contenido-tabla-reserva-ambientes").html("");
    document.querySelector(".popup-ambientes .contenedor-tabla-loader .seccion-loader-reserva").classList.remove("oculto");
    $.post("./php/obtenerAmbientes.php",dato,function(respuesta){
        try {
            
            var lista = JSON.parse(respuesta);
            listaAmbientesDisponibles = JSON.parse(respuesta);
            var template ="";
            var indiceRepetidos = [];
            var n = 0;
            lista.forEach(element => {
                 ambientes.forEach(element2 => {
                     if (element2.codigoAmbiente == element.codigoAmbiente) {
                         indiceRepetidos.push(n);
                     }
                 });

                template+=`<tr class="fila-tabla-reserva">
                                <td class="casilla-columna casilla-columna-btn">
                                    <button class="btn-agregar-item-tabla">Agregar</button>
                                </td>
                                <td class="casilla-columna casilla-codigo ">${element.codigoAmbiente}</td>
                                <td class="casilla-columna casilla-nombre ">${element.capacidad}</td>
                            </tr>`;
                n++;
            });

            document.querySelector(".popup-ambientes .contenedor-tabla-loader .seccion-loader-reserva").classList.add("oculto");
            $(".contenido-tabla-reserva-ambientes").html(template);

            var botones = document.querySelectorAll(".contenido-tabla-reserva-ambientes .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
            for (let index = 0; index < botones.length; index++) {

                if (indiceRepetidos.indexOf(index) != -1) {
                    botones[index].classList.add("btn-agregar-deshabilitado");
                    botones[index].addEventListener("click",(e)=>{
                        Swal.fire({
                            icon: 'error',
                            text: 'Este Ambiente ya fue agregado'
                        });
                    });
                    
                }else{
                    
                    botones[index].addEventListener("click",(e)=>{
                        if (ambientes.length >= 2) {
                            Swal.fire({
                                icon: 'error',
                                text: 'Solo  puede elegir 2 ambientes como maximo'
                            });
                        }else{
                            var cantEstudiantes = 0;
                            var capacidadTotal =0;
                            grupos.forEach(element => {
                                cantEstudiantes = cantEstudiantes + element.cantidad;
                            });
                            ambientes.forEach(element => {
                                capacidadTotal = capacidadTotal + element.capacidad;
                            });
                            if (cantEstudiantes <= capacidadTotal) {
                                Swal.fire({
                                    icon: 'error',
                                    text: 'La capacidad total ya es suficiente para la cantidad de estudiantes'
                                });
                            }else{
                                agregarDatosAmbientes(lista[index].codigoAmbiente,lista[index].capacidad );
                            }
                        }
                        
                    });

                    
                     
                }
            }
            
        } catch (error) {
            console.log(error)
            console.log("error al optener los datos");
            
        }
    });

}



/* ------------------------------------------------------------------------------------------ */


/*  --------------------------------  Agregar los datos a  un imput------------------------- */
function agregarDatosMateria(boton,codigoM,nombreM){
    if (materia.length == 0) {
        
        var dato = {codMateria:""+codigoM}
        $.post("./php/obtenerHorariosGrupos.php",dato,function(respuesta) {
            var res = JSON.parse(respuesta);
            horariosGrupos = res;
        });

        materia.push({codigo:""+codigoM,nombre:""+nombreM});
        var template = `<div class="item-seccion-input">
                            <p class="info-input">${nombreM}</p>
                            <button class="btn-item-input">x</button>
                        </div>`;

        $(".input-materia").html(template);

        document.querySelector(".btn-agregar-solicitante").classList.remove("btn-agregar-deshabilitado");
        document.querySelector(".btn-agregar-grupo").classList.remove("btn-agregar-deshabilitado");
        document.querySelector(".btn-agregar-materia").classList.add("btn-agregar-deshabilitado");


        document.querySelector('.input-materia .item-seccion-input .btn-item-input').addEventListener("click",(e)=>{
            if (grupos.length > 0 || solicitantes.length > 1) {
                Swal.fire({
                    text: "Tambien se borraran los solicitantes y grupos que anteriormente agrego",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        materia = [];
                        grupos = [];
                        $(".input-grupos").html("");
                        solicitantes = [];
                        agregarDatosSolicitantes(usuario.codigoSis,usuario.nombre);
                        $(".input-materia").html("");
                        document.querySelector(".dato-cantidad-estudiantes").textContent=0;
                        document.querySelector(".dato-cantidad-estudiantes2").textContent=0;
                        document.querySelector(".btn-agregar-solicitante").classList.add("btn-agregar-deshabilitado");
                        document.querySelector(".btn-agregar-grupo").classList.add("btn-agregar-deshabilitado");
                        document.querySelector(".btn-agregar-materia").classList.remove("btn-agregar-deshabilitado");
                    }
                  })
            }else{
                materia = [];
                $(".input-materia").html("");
                document.querySelector(".btn-agregar-solicitante").classList.add("btn-agregar-deshabilitado");
                document.querySelector(".btn-agregar-grupo").classList.add("btn-agregar-deshabilitado");
                document.querySelector(".btn-agregar-materia").classList.remove("btn-agregar-deshabilitado");
            }
            
        });
        
        cerrarPopUp();
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Solo se permite una materia'
        });
    }

}

function agregarDatosSolicitantes(codigoS,nombreS){
        solicitantes.push({codigoSis:""+codigoS,nombre:""+nombreS});
        var template ="";

        solicitantes.forEach(element => {
            if (element.codigoSis == usuario.codigoSis) {
                template += `<div class="item-seccion-input">
                                <p class="info-input">${element.nombre}</p>
                                <button class="btn-item-input oculto">x</button>
                            </div>`;
                
            }else{
                template += `<div class="item-seccion-input">
                            <p class="info-input">${element.nombre}</p>
                            <button class="btn-item-input">x</button>
                        </div>`;

            }
        });

        $(".input-solicitantes").html(template);

        var datosinput = document.querySelectorAll('.input-solicitantes .item-seccion-input .btn-item-input');

        for (let index = 0; index < datosinput.length; index++) {
            var element = datosinput[index];
            element.addEventListener("click",(e)=>{
                eliminarSolicitante(index);
            });
        }

        cerrarPopUp();
}

function eliminarSolicitante(indice){
    if (solicitantes[indice].codigoSis == usuario.codigoSis) {
        Swal.fire({
            icon: 'error',
            text: 'Es obligatorio que participe como solicitante'
        });
        return;
    }
    $(".input-solicitantes").html("");
     var nuevaLista = [];
     var nuevaListaGrupos = [];
     
     var codigoSolicitante = solicitantes[indice].codigoSis;

     for (let index = 0; index < grupos.length; index++) {
         if (grupos[index].codDocente != codigoSolicitante) {
            nuevaListaGrupos.push(grupos[index]);
         }
     }

     grupos = [];
     nuevaListaGrupos.forEach(element => {
        agregarDatosGrupos(element.codigoGrupo ,element.cantidad,element.codDocente);
     });

     for (let index = 0; index < solicitantes.length; index++) {
         if (index != indice) {
            nuevaLista.push(solicitantes[index]);
         }
     }
     solicitantes = [];
     nuevaLista.forEach(element => {
        agregarDatosSolicitantes(element.codigoSis ,element.nombre);
     });
}


function agregarDatosGrupos(codigoG,cantidadG,codDocenteG){
    grupos.push({codigoGrupo:""+codigoG,cantidad:Number(cantidadG),codDocente:""+codDocenteG});
    sugerirHorario();
    var template ="";

    grupos.forEach(element => {
        template += `<div class="item-seccion-input">
                        <p class="info-input">Grupo-${element.codigoGrupo}  </p>
                        <button class="btn-item-input">x</button>
                    </div>`;
    });

    $(".input-grupos").html(template);

    var datosinput = document.querySelectorAll('.input-grupos .item-seccion-input .btn-item-input');

    for (let index = 0; index < datosinput.length; index++) {
        var element = datosinput[index];
        element.addEventListener("click",(e)=>{
            eliminarGrupo(index);
        });
    }



    var infoCantidadEst = document.querySelector(".dato-cantidad-estudiantes").textContent;
    var cantidadEst = 0;
    grupos.forEach(element => {
        cantidadEst = cantidadEst + element.cantidad;
    });
    document.querySelector(".dato-cantidad-estudiantes").textContent=cantidadEst;
    document.querySelector(".dato-cantidad-estudiantes2").textContent= cantidadEst;
    
    cerrarPopUp();
}

function eliminarGrupo(indice){

    $(".input-grupos").html("");
     var nuevaLista = [];
     for (let index = 0; index < grupos.length; index++) {
         if (index != indice) {
            nuevaLista.push(grupos[index]);
         }
     }
     grupos = [];
     document.querySelector(".dato-cantidad-estudiantes").textContent= "0";
     document.querySelector(".dato-cantidad-estudiantes2").textContent= "0";
     nuevaLista.forEach(element => {
        agregarDatosGrupos(element.codigoGrupo,element.cantidad,element.codDocente);
     });

}

function agregarDatosPeriodo(codigoP,nombreP){

    periodos.push({codigoPeriodo:""+codigoP,nombre: nombreP});
    var template ="";
    periodos.forEach(element => {
        template += `<div class="item-seccion-input">
                        <p class="info-input">${element.nombre[0]}</p>
                        <button class="btn-item-input">x</button>
                    </div>`;
    });

    $(".input-periodos").html(template);

    var datosinput = document.querySelectorAll('.input-periodos .item-seccion-input .btn-item-input');

    for (let index = 0; index < datosinput.length; index++) {
        var element = datosinput[index];
        element.addEventListener("click",(e)=>{
            eliminarPeriodo(index);
        });
    }
    controlarEstadoBotonesPeriodo();
    cerrarPopUp();
}
function eliminarPeriodo(indice){
    $(".input-periodos").html("");
     var nuevaLista = [];
    for (let index = 0; index < periodos.length; index++) {
         if (index != indice) {
            nuevaLista.push(periodos[index]);
         }
     }
     periodos = [];
     
     if (periodos.length == 0) {
        controlarEstadoBotonesPeriodo();
     }
     nuevaLista.forEach(element => {
        agregarDatosPeriodo(element.codigoPeriodo,element.nombre);
     });
}

function agregarDatosSugerenciaAmbientes(codigoA,capacidadA){
    sugerencias.push({codigoAmbiente:""+codigoA,capacidad:Number(capacidadA)});
    var template ="";

    sugerencias.forEach(element => {
        template += `<div class="item-seccion-input">
                        <p class="info-input">${element.codigoAmbiente} - Capacidad ${element.capacidad}</p>
                        <button class="btn-item-input btn-item-input-sugerencia">+</button>
                    </div>`;
    });

    $(".input-sugerencias").html(template);

    var datosinput = document.querySelectorAll('.input-sugerencias .item-seccion-input .btn-item-input');

    for (let index = 0; index < datosinput.length; index++) {
        var element = datosinput[index];
        element.addEventListener("click",(e)=>{
            if (ambientes.length >= 2) {
                Swal.fire({
                    icon: 'error',
                    text: 'Solo  puede elegir 2 ambientes como maximo'
                });
            }else{

                var repetido = 0;
                ambientes.forEach(element => {
                    if (element.codigoAmbiente == sugerencias[index].codigoAmbiente) {
                        repetido = 1;
                        Swal.fire({
                            icon: 'error',
                            text: 'ya se agrego ese ambiente'
                        });
                    }
                });
                if (repetido == 0) {
                    var cantEstudiantes = 0;
                    var capacidadTotal =0;
                    grupos.forEach(element => {
                        cantEstudiantes = cantEstudiantes + element.cantidad;
                    });
                    ambientes.forEach(element => {
                        capacidadTotal = capacidadTotal + element.capacidad;
                    });
                    if (cantEstudiantes <= capacidadTotal) {
                        Swal.fire({
                            icon: 'error',
                            text: 'La capacidad total ya es suficiente para la cantidad de estudiantes'
                        });
                    }else{
                        agregarDatosAmbientes(sugerencias[index].codigoAmbiente,sugerencias[index].capacidad);
                    }
                }
            }
           
        });
    }
}




function agregarDatosAmbientes(codigoA,capacidadA){
    ambientes.push({codigoAmbiente:""+codigoA,capacidad:Number(capacidadA)});
    var template ="";

    ambientes.forEach(element => {
        template += `<div class="item-seccion-input">
                        <p class="info-input">${element.codigoAmbiente} - Capacidad ${element.capacidad}</p>
                        <button class="btn-item-input">x</button>
                    </div>`;
    });

    $(".input-ambientes").html(template);

    var datosinput = document.querySelectorAll('.input-ambientes .item-seccion-input .btn-item-input');

    for (let index = 0; index < datosinput.length; index++) {
        var element = datosinput[index];
        element.addEventListener("click",(e)=>{
            eliminarAmbiente(index);
        });
    }

     var infoCapacidadTotal = document.querySelector(".dato-capacidad-total");
     infoCapacidadTotal.textContent= Number(infoCapacidadTotal.textContent)+Number(capacidadA);

    cerrarPopUp();
}

function eliminarAmbiente(indice){
    $(".input-ambientes").html("");
     var nuevaLista = [];
     for (let index = 0; index < ambientes.length; index++) {
         if (index != indice) {
            nuevaLista.push(ambientes[index]);
         }
     }
     ambientes = [];
     document.querySelector(".dato-capacidad-total").textContent= "0";
     nuevaLista.forEach(element => {
        agregarDatosAmbientes(element.codigoAmbiente,element.capacidad);
     });

}




/*---------------------------------------------------------- */


/*  ------------------------ fucion para  sugerir ambientes  ---------------------- */


function sugerirAmbientes() {

    var listaSugerencias = [];
    var auxListaAmbientes = listaAmbientesDisponibles.slice();
    var limite = 0;
    var cantidadEstudiantes = 0;

    if (auxListaAmbientes.length == 0) {
        return [];
    }

    grupos.forEach(element => {
        cantidadEstudiantes += element.cantidad;
    });


    if (auxListaAmbientes[0].capacidad < cantidadEstudiantes){
        var capaciodadTotal = 0;
        auxListaAmbientes.forEach(element => {
            capaciodadTotal += element.capacidad;
        });
        if (capaciodadTotal < cantidadEstudiantes) {
            return listaSugerencias;
        }else{
            while ( auxListaAmbientes.length > 0  && auxListaAmbientes[0].capacidad < cantidadEstudiantes) {
                listaSugerencias.push(JSON.parse(JSON.stringify(auxListaAmbientes[0])));
                cantidadEstudiantes = cantidadEstudiantes - auxListaAmbientes[0].capacidad;
                auxListaAmbientes.shift();
            }
            var agregado = 0;
            for (let index = auxListaAmbientes.length -1 ; index >=  0 && agregado == 0; index--) {
                if (auxListaAmbientes[index].capacidad >= cantidadEstudiantes) {
                    listaSugerencias.push(auxListaAmbientes[index]);
                    agregado = 1;
                }
            }
            return listaSugerencias;
        }
    }

    
    while (limite <= cantidadEstudiantes) {
        limite += 50;
    }

 
    var aux = 0;

    while (listaSugerencias.length == 0 && aux < 10) {
        aux++;
        auxListaAmbientes.forEach(element => {
            if (element.capacidad >= cantidadEstudiantes && element.capacidad <= limite &&  listaSugerencias.length < 7) {
                listaSugerencias.push(element);
            }
        });
        if (listaSugerencias.length == 0) {
            limite += 50;
        }
    }
    return listaSugerencias;
}


/*-------------------------------------------------------------------------- */


/*  ------------------------ cerrar y abrir popup ---------------------- */
function cerrarPopUp(){
    document.querySelector(".overlay-pagina-reserva").classList.remove("overlay-pagina-reserva-activo");
    document.querySelector(".popup-pagina-reserva").classList.remove("popup-pagina-reserva-activo");
    var popups = document.querySelectorAll(".popup");
    var body = document.querySelector("body");
    body.classList.remove("scroll-y-hidden");    
    
    popups.forEach(element => {
        element.classList.add("oculto");
    });

    $(".contenido-tabla-reserva-solicitantes").html("");
}

function abrirPopUp(nombrePopup){
    var overlay = document.querySelector(".overlay-pagina-reserva");
    var popupReserva = document.querySelector(".popup-pagina-reserva");
    var popup = document.querySelector("."+nombrePopup);
    var body = document.querySelector("body");

    body.classList.add("scroll-y-hidden");    
    overlay.classList.add("overlay-pagina-reserva-activo");
    popupReserva.classList.add("popup-pagina-reserva-activo");
    popup.classList.remove("oculto");
}

/*----------------------------------------------------------------------- */



/*-------------------------- verificar campos del formulario ------------- */
function verificarCamposFormulario(parte){  // 1 em caso de verificar la primera parte 2 en caso de verificar la segunda parte , 0 si se verificara todo
    var exito = 1 ;

    
    if (parte == 1 || parte == 0) {
        var inputAsunto = document.querySelector(".input-asunto").value;
        var checkEmergencia = document.querySelector(".checkbox-ergencia");
        var textAreaEmergencia = document.querySelector(".input-motivo-emergencia").value;
    
        if (inputAsunto.length == 0 || inputAsunto.length > 150) {
            document.querySelector(".mensaje-error-asunto").classList.remove("oculto");
            exito = 0;
        }else{
            document.querySelector(".mensaje-error-asunto").classList.add("oculto");
        }
    
        if (materia.length == 0) {
            document.querySelector(".mensaje-error-materia").classList.remove("oculto");
            exito = 0;
        }else{
            document.querySelector(".mensaje-error-materia").classList.add("oculto");
        }
    
        if (grupos.length == 0) {
            document.querySelector(".mensaje-error-grupos").textContent = "Debe elegir almenos 1 grupo";
            document.querySelector(".mensaje-error-grupos").classList.remove("oculto");
            exito = 0;
        }else{
            var error = 0;
            solicitantes.forEach(element => {
                var encontrado = 0;
                for (let index = 0; index < grupos.length && encontrado == 0; index++) {
                    if (grupos[index].codDocente == element.codigoSis) {
                        encontrado = 1;
                    }
                }
                if (encontrado == 0) {
                    error = 1;
                    exito = 0;
                }
            });

            if (error == 1) {
                document.querySelector(".mensaje-error-grupos").textContent = "Debe elegir almenos 1 grupo de cada solicitante";
                document.querySelector(".mensaje-error-grupos").classList.remove("oculto");
                
            }else{
                document.querySelector(".mensaje-error-grupos").classList.add("oculto");
            }

            
        }
    
        if (checkEmergencia.checked) {
            if (textAreaEmergencia.length == 0 || textAreaEmergencia.length > 200 ) {
                document.querySelector(".mensaje-error-motivo").classList.remove("oculto");
                exito = 0;
            }else{
                document.querySelector(".mensaje-error-motivo").classList.add("oculto");
            }
        }
    
        if (!checkEmergencia.checked) {
            document.querySelector(".mensaje-error-fecha").classList.add("oculto");

            if (Number(new Date(Number(fecha)).getDay()) == 0 ) { // si devuelve sero significa que es domingo
                document.querySelector(".mensaje-error-fecha").textContent = "No se puede reservar para un domingo a menos que sea una emergencia";
                document.querySelector(".mensaje-error-fecha").classList.remove("oculto");
                exito = 0;
            }

            if (Number(fecha) < fechaMinima.getTime() || Number(fecha)  >  fechaMaxima.getTime()) {
                document.querySelector(".mensaje-error-fecha").textContent = `Debe elgir una fecha entre ${fechaMinima.toLocaleDateString()}  y  ${fechaMaxima.toLocaleDateString()} `;
                document.querySelector(".mensaje-error-fecha").classList.remove("oculto");
                exito = 0;
            }
        }else{
            document.querySelector(".mensaje-error-fecha").classList.add("oculto");
            if (Number(fecha) < fechaEmergencia.getTime() || Number(fecha)  >  fechaMaxima.getTime()) {
                document.querySelector(".mensaje-error-fecha").textContent = `Debe elgir una fecha entre ${fechaEmergencia.toLocaleDateString()}  y  ${fechaMaxima.toLocaleDateString()} `;
                document.querySelector(".mensaje-error-fecha").classList.remove("oculto");
                exito = 0;
            }
        }

        if (periodos.length == 0) {
            document.querySelector(".mensaje-error-periodos").textContent = "Debe elegir minimo 1 periodo";
            document.querySelector(".mensaje-error-periodos").classList.remove("oculto");
            exito = 0;
        }else{
            if (fecha == fechaEmergencia.getTime()){
                var periodoValido = 1;
                periodos.forEach(element => {
                    if (verificarPeriodoValido(element.codigoPeriodo) == 0) {
                        periodoValido = 0;
                    }
                });
                if (periodoValido == 0) {
                    document.querySelector(".mensaje-error-periodos").textContent = "Estos periodos no estan disponibles para hoy";
                    document.querySelector(".mensaje-error-periodos").classList.remove("oculto");
                    exito = 0;
                }else{
                    document.querySelector(".mensaje-error-periodos").classList.add("oculto");
                }
                
            }else{
                document.querySelector(".mensaje-error-periodos").classList.add("oculto");
            }
        }
    
        
    }
    
    var capacidadTotal = 0;
    var cantidadEstudiantes = 0 ;
    ambientes.forEach(element => {
        capacidadTotal = capacidadTotal + element.capacidad;
    });
    
    grupos.forEach(element => {
        cantidadEstudiantes = cantidadEstudiantes + element.cantidad;
    });
    
    
    if (parte == 2 || parte == 0) {
        document.querySelector(".mensaje-error-ambientes").classList.add("oculto");

        if (capacidadTotal < cantidadEstudiantes ) {
            document.querySelector(".mensaje-error-ambientes").textContent= "La capacidad total debe ser igual o mayor la cantidad de estudiantes";
            document.querySelector(".mensaje-error-ambientes").classList.remove("oculto");
            exito = 0;
        }
        var valido = 1;
        var mError = "";
        ambientes.forEach(element => {
            var econtrado= 0;
            for (let index = 0; index < listaAmbientesDisponibles.length  &&  econtrado == 0; index++) {
                const element2 = listaAmbientesDisponibles[index];
                if (element.codigoAmbiente == element2.codigoAmbiente) {
                    econtrado = 1;
                }                
            }
            if (econtrado == 0) {
                mError = mError + element.codigoAmbiente +" "
                exito = 0;
                valido = 0;
            }
        });

        if (valido == 0) {
            document.querySelector(".mensaje-error-ambientes").textContent= "Los ambientes [ "+ mError + "] ya no estan disponibles";
            document.querySelector(".mensaje-error-ambientes").classList.remove("oculto");
        }

        if (ambientes.length == 0 || ambientes.length > 2  ) {
            document.querySelector(".mensaje-error-ambientes").textContent= "Debe elegir 1 ambiente y maximo 2";
            document.querySelector(".mensaje-error-ambientes").classList.remove("oculto");
            exito = 0;
        }
        
    }
    return exito;

}



/*--------------------------------------------------------------------------- */




function funcionalidadInputFecha(respuesta){
    var inputFecha = document.querySelector(".input-fecha");
    inputFecha.setAttribute("onkeydown","return false");
    var respaldo = inputFecha.value;

    inputFecha.addEventListener("click",e=>{
         respaldo = inputFecha.value;
    });

    $('.input-fecha').change(function(){
        var datoInput = inputFecha.value
        datoInput = datoInput.split("-");
        var aux = new Date( datoInput[0], datoInput[1] - 1, datoInput[2]);

        fecha = aux.getTime();
        sugerirHorario();

    });
    
    
    var res = JSON.parse(respuesta);
    if (res.habilitado == 'no') {
        return 0;
    }
    inputFecha.setAttribute("value",res.fechaMinimaReserva);
    inputFecha.setAttribute("min",res.fechaMinimaReserva);
    inputFecha.setAttribute("max",res.fechaMaximaReserva);

    var timeStamp = Number(res.timeStamp);

    fechaActual = new Date(timeStamp*1000);

    fechaMinima = new Date(((timeStamp)+(Number(res.minimo)*24*60*60))*1000);
    fechaMinima.setHours(0);fechaMinima.setMinutes(0);fechaMinima.setSeconds(0);

    fechaEmergencia =new Date(timeStamp*1000);
    fechaEmergencia.setHours(0);fechaEmergencia.setMinutes(0);fechaEmergencia.setSeconds(0);

    fechaMaxima = new Date(((timeStamp)+(Number(res.maximo)*24*60*60))*1000);
    fechaMaxima.setHours(0);fechaMaxima.setMinutes(0);fechaMaxima.setSeconds(0);

    fecha = fechaMinima.getTime();

    return 1;

}




function ponerHoverBtnInfoUrgencia(){
    var aux = document.querySelector(".info-checkbox");

    aux.addEventListener("mouseenter",(e)=>{
        document.querySelector(".mesaje-info-checkbox").classList.remove("mesaje-info-checkbox-oculto");
    });
    
    aux.addEventListener("mouseout",(e)=>{
        document.querySelector(".mesaje-info-checkbox").classList.add("mesaje-info-checkbox-oculto");
    });

}






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


botonesEncabezado();

function botonesEncabezado() {

    document.querySelector(".opcion-encabezado-pagina-reserva-formulario").addEventListener("click", e =>{
        ocultarPestanias();
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".formulario-reserva").classList.remove("oculto");
    } );

    document.querySelector(".opcion-encabezado-pagina-reserva-lista").addEventListener("click",e =>{
        ocultarPestanias();
        e.target.classList.add("opcion-encabezdo-selecionado");
        document.querySelector(".contenedor-lista-reservas").classList.remove("oculto");
    });
    
}


function ocultarPestanias() {
    document.querySelector(".opcion-encabezado-pagina-reserva-formulario").classList.remove("opcion-encabezdo-selecionado");
    document.querySelector(".opcion-encabezado-pagina-reserva-lista").classList.remove("opcion-encabezdo-selecionado");
   
    document.querySelector(".contenedor-lista-reservas").classList.add("oculto");
    document.querySelector(".formulario-reserva").classList.add("oculto");
   
}



function sugerirHorario(){

    if (periodos.length > 0) {
        return;
    }

    if (grupos.length == 0) {
        return;
    }

    var  aux = new Date(fecha);
    var dia = aux.getDay();

    var nombrePeriodos =[['6:45 - 8:15','06:45:00','08:15:00'],
    ["8:15 - 9:45",'08:15:00','09:45:00'],
    ["9:45 - 11:15",'09:45:00','11:15:00'],
    ["11:15 - 12:45",'11:15:00','12:45:00'],
    ["12:45 - 14:15",'12:45:00','14:15:00'],
    ["14:15 - 15:45",'14:15:00','15:45:00'],
    ["15:45 - 17:15",'15:45:00','17:15:00'],
    ["17:15 - 18:45",'17:15:00','18:45:00'],
    ["18:45 - 20:15",'18:45:00','20:15:00'],
    ["20:15 - 21:45",'20:15:00','21:45:00']];

    var dias = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];


    var encontrado = 0;

   
    for (let i = 0; i < grupos.length && encontrado == 0; i++) {
        const element = grupos[i];
        var auxHorariosGrupo = horariosGrupos.filter(horario =>{
            if (horario.codGrupo == element.codigoGrupo) {
                return 1;
            }else{
                return 0;
            }
        });

        auxHorariosGrupo.forEach(element2 =>{
            if (element2.dia == dias[dia]) {
                for (let index = 0; index < nombrePeriodos.length && encontrado == 0 ; index++) {
                    if ((nombrePeriodos[index])[1] == element2.horaInicio  && (nombrePeriodos[index])[2]  == element2.horaFin) {
                        if (periodos.length == 0) {
                            agregarDatosPeriodo(index,nombrePeriodos[index]);
                        }
                        encontrado = 1;
                    }
                }
            }

        });

    }
    
}



function ponerEnMayuscula(frase) {  // pone en mayusula solo la primera letra de cada palabra
    if (typeof frase != 'string') {
        return "";
    }
    frase = frase.trim();
    var espacio = 0;
    var aux = "";
    for (let index = 0; index < frase.length; index++) {
           if (frase[index] == " ") {
               if (espacio == 0) {
                espacio = 1;
                aux = aux + frase[index];  
               }           
           }else{
                espacio = 0;
                aux = aux + frase[index];
           }
     }
    frase = aux;
    if (frase.length == 0) {
        return "";
    }
    frase = frase.toLowerCase();
    let palabras = frase.split(' ');
    return palabras.map(p => p[0].toUpperCase() + p.slice(1)).join(' ');
}

