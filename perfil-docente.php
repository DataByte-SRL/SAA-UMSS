<?php
     $nombre = " ";
     $apellido = " ";
     session_start();
     if(!isset($_SESSION['cuenta'])){
        header('location:index.php');
    }else{
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
    <link rel='stylesheet' href='css/styles-reservas-docente.css'>
    
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
                                <a class="nav-link active " href="reservas-docente.php">Reservas</a>
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
                                                <a href='perfil-docente.php'>Configuracion de Cuenta</a>
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


    
</body>