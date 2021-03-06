<?php //esto se ocupa de ver si hay una sesion activa y si no redirecciona a que inicie sesion
    
    $nombre = " ";
    $apellido = " ";
    session_start();

    if(!isset($_SESSION['cuenta'])){
        header('location:index.php');
    }else{
        if ($_SESSION['cuenta'] != "administrador") {
            header('location:index.php');
        }
        $nombre = $_SESSION['nombre'];
        $apellido = $_SESSION['apellido'];
    }

?>


<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>SAA-UMSS</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=New+Rocker&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="icon" href="https://www.umss.edu.bo/wp-content/uploads/2021/07/cropped-Logo7-32x32.png">
  
    <!-- <link rel='stylesheet' href='css/styles-index.css'> -->
    <link rel='stylesheet' href='css/styles-index.css'>
    <link rel='stylesheet' href='css/styles-repetitivos.css'>
    <link rel='stylesheet' href='css/styles-reservas-admin.css'>
    
</head>
<body>
    <header>
        <div class="contenedor-navegacion">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand me-auto" href="index.php">SAA-UMSS</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li class="nav-item   text-center">
                                <a class="nav-link  " href="materia-admin.php">Materias</a>
                            </li>
                            <li class="nav-item   text-center">
                                <a class="nav-link " href="grupo-admin.php">Grupos</a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link  text-center" aria-current="page" href="aulas-admin.php">Ambientes</a>
                            </li>
                            <li class="nav-item text-center ">
                                <a class="nav-link text-center" href="docentes-admin.php">Docentes</a>
                            </li>
                            <li class="nav-item   text-center">
                                <a class="nav-link active " href="reservas-admin.php">Reservas</a>
                            </li>
                            <?php 
                            
                                echo ("<li class='nav-item  text-center nav-item-usuario'>
                                          <div class= 'info-usuario-menu '>
                                              <p class='nav-link  nombre-usuario-menu ' >$nombre $apellido</p>
                                              <div class='imagen-usuario'>
                                                  <p class= 'texto-imagen-usuario'>$nombre[0]$apellido[0]</p>
                                              </div>
                                          </div>
                                          <div class='opciones-usuario oculto'>
                                            <div class='item-opciones-usuario item-opciones-usuario1'>
                                                <a href='perfil-admin.php'>Configuracion de Cuenta</a>
                                            </div>
                                            <div class='item-opciones-usuario'>
                                                <a href='php/cerrarSesion.php'>Cerrar Sesion</a>
                                            </div>
                                          </div>
                                      </li>");
                            ?>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        
    </header>

    <main class="contenido-seccion contenido-main">
        
        <div class="encabezado-pagina-reservas">
            <p class="opcion-encabezado-pagina-reserva opcion-encabezdo-selecionado opcion-lista-reservas">Lista de Reservas</p>
            <p class="opcion-encabezado-pagina-reserva ultimo  opcion-configuracion-reservas">Configuracion de Reservas</p>
            <p class="opcion-encabezado-pagina-reserva ultimo  opcion-historial-configuracions">Historial de configuraciones</p>
        </div>


        <div class="contenedor-lista-reservas">
           <div class="opcion-filtro  filtro-facultada">
                <label >Mostrar:</label>
                <select  class="select-filtro-mostrar">
                <option class="opcion-filtro" value="5">5</option>
                   <option class="opcion-filtro" value="25">25</option>
                   <option class="opcion-filtro" value="50" selected>50</option>
                   <option class="opcion-filtro" value="70">70</option>
                   <option class="opcion-filtro" value="100">100</option>
               </select>
           </div>

            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th>N??</th>
                        <th  value="asunto" >Asunto</th>
                        <th  value="codMateria" >Materia</th>
                        <th  value="fechaReserca" >Fecha Reservada</th>
                        <th  value="horario" >Horario</th>
                        <th  >Detalles</th>
                    </tr>
                </thead>
                <tbody id="tbody-lista-reservas">
                   
                </tbody>
               
            </table>

            <div class="seccion-loader-lista-reservas  ">
                <div class="contenedor-loader">
                    <div class="loader ">
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
            </div>
            
            
            <div class="seccion-paginacion oculto">
                <div class="contenedor-paginacion">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination" id="paginacion">
                            <li class="page-item page-item-atras">
                                <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <div  class="numeros-paginacion" id="numeros-paginacion">
                            </div>
                            <li class="page-item page-item-adelante">
                                <a class="page-link" href="#" aria-label="Next" >
                                <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

        <div class="formulario-configuracion oculto">
                <div class="contenedor-formulario oculto">
                    <div class="seccion-input-configuracion">
                        <label class="label-input"  for="">Habilitar Reservas:</label>

                        <div class="opcion-radio-button">
                            <input class="input-radio" type="radio" name="radio-btn-habilitar-reserva" id="radio-btn-si" value="si">
                            <label class="label-radio-btn" for="radio-btn-si">Si</label>
                        </div>

                        <div class="opcion-radio-button">
                            <input class="input-radio" type="radio" name="radio-btn-habilitar-reserva" id="radio-btn-no" value="no">
                            <label class="label-radio-btn" for="radio-btn-no">No</label>
                        </div>

                    </div>
                    
                    <div class="seccion-input-configuracion">
                        <label class="label-input" for="input-minimo-dias">Minimo Dias:</label>
                        <div class="contenedor-input-mensaje-error">
                            <input class="input-configuracion" type="text" name="" id="input-minimo-dias">
                            <p class="mensaje-error mensaje-error-minimo-dias oculto">Menasaje de error</p>
                        </div>
                        

                    </div>
                    <div class="seccion-input-configuracion">
                        <label class="label-input" for="input-maximo-dias">Maximo Dias:</label>
                        <div class="contenedor-input-mensaje-error">
                            <input class="input-configuracion"type="text" name="" id="input-maximo-dias">
                            <p class="mensaje-error mensaje-error-maximo-dias oculto">Menasaje de error</p>
                        </div>
                        
                    </div>
                    <div class="seccion-input-configuracion">
                        <label class="label-input" for="input-motico">Motivo:</label>
                        <div class="contenedor-input-mensaje-error">
                            <textarea class="input-configuracion"name="" id="input-motivo" placeholder="En caso de modificar indique el motivo" ></textarea>
                            <p class="mensaje-error mensaje-error-motivo oculto">Menasaje de error</p>
                        </div>
                    </div>

                    <button class="btn-guardar-cambios">Guardar Cambios</button>
                </div>

                <div class="seccion-loader-configuracion ">
                    <div class="contenedor-loader">
                        <div class="loader ">
                            <span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            

        </div> 

         <div class="seccion-historial-configuraciones oculto">
                <div class="contenedor-tabla-historial">
                    <table class="table table-striped ">
                        <thead>
                            <tr>
                                <th class="celda-tabla-historial">N</th>
                                <th class="celda-tabla-historial">CodigoSis Admin</th>
                                <th class="celda-tabla-historial">Nombre Admin</th>
                                <th class="celda-tabla-historial">Fecha Configuracion</th>
                                <th class="celda-tabla-historial">Habilitado</th>
                                <th class="celda-tabla-historial">Minimo</th>
                                <th class="celda-tabla-historial">Maximo</th>
                                <th class="celda-tabla-historial">Motivo</th>
                            </tr>
                        </thead>
                        <tbody class ="tbody-tabla-historial">
                        </tbody>
                    </table>

                </div>

                <div class="seccion-loader-historial ">
                        <div class="contenedor-loader">
                            <div class="loader ">
                                <span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                </div>

         </div>

    </main>


    
    <footer>
        <p class="fila-1">DERECHOS RESERVADOS ?? 2022 ?? UNIVERSIDAD MAYOR DE SAN SIM??N</p>
        <p class="fila-2">Siguenos en:</p>
        <div class="fila-3 enlaces">
            <a href="https://www.instagram.com/umssboloficial/" class="instagram" target = ???_blank ??? >
                <img src="img/logo-instagram.svg" height="22">
            </a>
            <a href="https://twitter.com/UmssBolOficial" class="twitter" target = ???_blank ??? >
                <img src="img/logo-twiter.svg" height="22">
            </a>
            <a href="https://www.facebook.com/UmssBolOficial/" class="facebook" target = ???_blank ??? >
                <img src="img/logo-facebook.svg" height="22">
            </a>
            <a href="https://t.me/GrupoUmssBolOficial" class="telegram" target = ???_blank ??? > 
                <img src="img/logo-telegram.svg" height="22">
            </a>
            
        </div>
        <p class="fila-4">Dise??ado por<span class="empresa-disenadora"> DataByte S.R.L</span></p>

    </footer>

    <div class="overlay-detalles-reservas">
        <div class="detalles-reservas">
            <h1 class="titulo-detalles-reservas">DETALLES </h1>
        
            <div class="seccion-detalles-reserva">
                <label>Asunto:</label>
                <p class="contenido-seccion-detalles contenido-asunto"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Materia:</label>
                <p class="contenido-seccion-detalles contenido-materia"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Solicitantes:</label>
                <p class="contenido-seccion-detalles contenido-solicitantes"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Grupos:</label>
                <p class="contenido-seccion-detalles contenido-grupos"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Total Estudiantes:</label>
                <p class="contenido-seccion-detalles contenido-estudiantes"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Emergencia:</label>
                <p class="contenido-seccion-detalles contenido-emeregencia"></p>
            </div>
            <div class="seccion-detalles-reserva">
                <label>Motivo Emergencia:</label>
                <p class="contenido-seccion-detalles contenido-motivo-emergencia"></p>
            </div>

            <div class="seccion-detalles-reserva">
                <label>Fecha Reservada:</label>
                <p class="contenido-seccion-detalles contenido-fecha-reservada"></p>
            </div>

            <div class="seccion-detalles-reserva">
                <label>Horario:</label>
                <p class="contenido-seccion-detalles contenido-horario"></p>
            </div>

            <div class="seccion-detalles-reserva">
                <label>Ambientes:</label>
                <p class="contenido-seccion-detalles contenido-ambientes"></p>
            </div>

            <div class="seccion-detalles-reserva">
                <label>Capacidad Total:</label>
                <p class="contenido-seccion-detalles contenido-capacidad"></p>
            </div>

            <div class="seccion-detalles-reserva">
                <label>Comentario:</label>
                <p class="contenido-seccion-detalles contenido-comentario"></p>
            </div>

            <div class="seccion-botones-detalles-reservas ">
                <button class="btn-formulario btn-cerrar">Cerrar</button>
            </div>
        </div>

    </div>

    <script   src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-reservas-admin.js"></script>
    <script src="js/script-index.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
 
    
</body>
</html>