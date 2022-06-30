<?php 
  session_start();
  include_once('conectar.php');
  
  $con=conectarPDO();

  if($_POST){
      $codigoSis = $_SESSION['codigoSis'];
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $telefono = $_POST['telefono'];
      $correo = $_POST['correo'];
      $ca = $_POST['ca'];
      $nc = $_POST['nc'];
      $rc = $_POST['rc'];
      
      if(!empty($ca)){
        if(empty($nc)){
          $sql = "UPDATE Administrador SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo' WHERE codigoSis=$codigoSis ";
          $resultado = $con->exec($sql);
        }
        else{
          if($nc!==$rc){
            $sql = "UPDATE Administrador SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo' WHERE codigoSis=$codigoSis ";
            $resultado = $con->exec($sql);
          }
          else{
            $sql = "UPDATE Administrador SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo', contrasenia='$nc' WHERE codigoSis=$codigoSis and contrasenia=$ca ";
            $resultado = $con->exec($sql);
          }
        }
      }
      else{
        $sql = "UPDATE Administrador SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo' WHERE codigoSis=$codigoSis ";
        $resultado = $con->exec($sql);
      }
    }
?>   
<html lang="es">
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
    <link rel='stylesheet' href='../css/styles-index.css'>
    <link rel='stylesheet' href='../css/styles-repetitivos.css'>
    <link rel='stylesheet' href='../css/styles-perfil.css'>
  <style>
  .modal-contenido{
    background-color:aqua;
    width:300px;
    padding: 10px 20px;
    margin: 20% auto;
    position: relative;
  }
  .modal{
    background-color: rgba(0,0,0,.8);
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    opacity:0;
    pointer-events:none;
    transition: all 1s;
  }
  #miModal:target{
    opacity:1;
    pointer-events:auto;
  }
  .btn-regresar{
    color: white;
    background-color: #E01515;
    font-size: 19px;
    border: none;
    border-radius: 7px;
    width: 100px;
    height: 35px;
    margin: 10px auto 10px auto;
  }
  .btn-cancelar{
    background-color: #f53b3b;
  }
      </style>
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
                            <li class="nav-item ">
                                <a class="nav-link  text-center" aria-current="page" href="../aulas-admin.php">Aulas</a>
                            </li>
                            <li class="nav-item text-center ">
                                <a class="nav-link text-center" href="../docentes-admin.php">Docentes</a>
                            </li>
                            <li class="nav-item   text-center">
                                <a class="nav-link  " href="../reservas-admin.php">Reservas</a>
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
                                                <a href='../perfil-admin.php'>Configuracion de Cuenta</a>
                                            </div>
                                            <div class='item-opciones-usuario'>
                                                <a href='../php/cerrarSesion.php'>Cerrar Sesion</a>
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
    <div class="container">
      <div class="row">
        <div class="row" style="text-align:center"
        <?php if (!$resultado){ ?>
          
          <div id="miModal" class="modal">
              <div class="modal-contenido">
                <a href="../perfil-admin.php">X</a>
                <h2>ERROR AL MODIFICAR</h2>
              </div>  
          </div>
        <?php }else{ ?>
          
          <div id="miModal" class="modal">
              <div class="modal-contenido">
                <a href="../reservas-admin.php">X</a>
                <h2>REGISTRO MODIFICADO</h2>
              </div>  
          </div>
        <?php } ?>
        
      </div>
    </div>
    <footer>
        <p class="fila-1">DERECHOS RESERVADOS © 2022 · UNIVERSIDAD MAYOR DE SAN SIMÓN</p>
        <p class="fila-2">Siguenos en:</p>
        <div class="fila-3 enlaces">
            <a href="https://www.instagram.com/umssboloficial/" class="instagram" target = “_blank ” >
                <img src="img/logo-instagram.svg" height="22">
            </a>
            <a href="https://twitter.com/UmssBolOficial" class="twitter" target = “_blank ” >
                <img src="img/logo-twiter.svg" height="22">
            </a>
            <a href="https://www.facebook.com/UmssBolOficial/" class="facebook" target = “_blank ” >
                <img src="img/logo-facebook.svg" height="22">
            </a>
            <a href="https://t.me/GrupoUmssBolOficial" class="telegram" target = “_blank ” > 
                <img src="img/logo-telegram.svg" height="22">
            </a>
            
        </div>
        <p class="fila-4">Diseñado por<span class="empresa-disenadora"> DataByte S.R.L</span></p>

    </footer>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-index.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  </body>
  