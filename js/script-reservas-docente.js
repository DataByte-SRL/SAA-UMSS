var materia = [];
var solicitantes = [];
var grupos = [];
var periodos = [];
var ambientes =[];


var usuario= {codigoSis:"" , nombre:""};


inicializar();




function inicializar(){
    $.post("./php/datosUsuario.php","",function(respuesta){
        var res = JSON.parse(respuesta);
        usuario.codigoSis = res.codigoSis;
        usuario.nombre = res.nombre + " " + res.apellido ;
        //ponerHoverEnInputsFormulario();
        funcionBotonAgregar();
        funcionBotonesCerrarPopUp();
        agregarDatosSolicitantes(usuario.codigoSis,usuario.nombre);
        
    });
    
}



/* -------------------------Agregando funcionalidad a los botones--------------------------------- */
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
                document.querySelector(".input-buscar-solicitante").value="";
                ponerDatosPopUpSolicitantes("");
                abrirPopUp("popup-solicitantes");
            }
    });

    btnBuscarSolicitante.addEventListener("click",(e)=>{
        var dato = ""+document.querySelector(".input-buscar-solicitante").value;
        dato=dato.trim();
        ponerDatosPopUpSolicitantes(dato);
        
    });

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
            abrirPopUp("popup-periodos");
            
    });

    ponerFuncionalidadBotonesPeriodo();

}


/*------------------------------------------ */
/* -------------------- poner datos a un popup y  funcionalida del boton agregar-------------------------- */
function ponerDatosPopUpMateria(){
    $(".contenido-tabla-reserva-materia").html("");
    document.querySelector(".seccion-loader-reserva").classList.remove("oculto");
      
    $.post("./php/optenerMateriasDocente.php",usuario,function(respuesta){
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
    $.post("./php/optenerSolicitantes.php",dato,function(respuesta){
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
    var dato = {solicitantes, materia};
    console.log(dato);

    $(".contenido-tabla-reserva-grupos").html("");
    document.querySelector(".popup-grupos .contenedor-tabla-loader .seccion-loader-reserva").classList.remove("oculto");
    $.post("./php/optenerGrupos.php",dato,function(respuesta){
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
                       agregarDatosGrupos(lista[index].codigoGrupo,lista[index].cantidad );
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
    var nombrePeriodos =["6:45 - 8:15","8:15 - 9:45","9:45 - 11:15","11:15 - 12:45","12:45 - 14:15","14:15 - 15:45","15:45 - 17:15","17:15 - 18:45","18:45 - 20:15","20:15 - 21:45"]; 
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
                    agregarDatosPeriodo(index,nombrePeriodos[index]);
    
                }
                
            }else{
                agregarDatosPeriodo(index,nombrePeriodos[index]);

            }
           
        });
       
    }

}

function controlarEstadoBotonesPeriodo(){
    var botones = document.querySelectorAll(".contenido-tabla-reserva-periodos .fila-tabla-reserva .casilla-columna-btn .btn-agregar-item-tabla");
    
    for (let index = 0; index < botones.length; index++) {
        const element = botones[index];
        if (periodos.length == 0) {
            element.classList.remove("btn-agregar-deshabilitado");
        }else{
            if (periodos.length == 2) {
                element.classList.add("btn-agregar-deshabilitado");
            }else if (index <= Number(periodos[0].codigoPeriodo)  || index > Number(periodos[0].codigoPeriodo) + 1 ) {
                element.classList.add("btn-agregar-deshabilitado");
            }else{
                element.classList.remove("btn-agregar-deshabilitado");
            }
        }
    }
}



/* ------------------------------------------------------------------------------------------ */


/*  --------------------------------  Agregar los datos a  un imput------------------------- */
function agregarDatosMateria(boton,codigoM,nombreM){
    if (materia.length == 0) {
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
            template += `<div class="item-seccion-input">
                            <p class="info-input">${element.nombre}</p>
                            <button class="btn-item-input">x</button>
                        </div>`;
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


function agregarDatosGrupos(codigoG,cantidadG){
    grupos.push({codigoGrupo:""+codigoG,cantidad:Number(cantidadG)});
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

     var infoCantidadEst = document.querySelector(".dato-cantidad-estudiantes");
     infoCantidadEst.textContent= Number(infoCantidadEst.textContent)+Number(cantidadG);


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
     nuevaLista.forEach(element => {
        agregarDatosGrupos(element.codigoGrupo,element.cantidad);
     });

}

function agregarDatosPeriodo(codigoP,nombreP){
    periodos.push({codigoPeriodo:""+codigoP,nombre:""+nombreP});
    var template ="";
    periodos.forEach(element => {
        template += `<div class="item-seccion-input">
                        <p class="info-input">${element.nombre}</p>
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


/*---------------------------------------------------------- */




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
