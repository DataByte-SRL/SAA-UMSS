<?php 
   include_once ("php/conectar.php");
   
   $errorIniciarSesion = 0 ;          // cuando el usuaio haya puesto una contraseña o codigosis equivodo cambiara a 1
   session_start();

   if (isset($_SESSION['cuenta'] )) {
       if($_SESSION['cuenta'] == "admin"){
            header('location: reservas-admin.php');
       }elseif($_SESSION['cuenta'] == "docente"){
        header('location: reservas-docente.php');
                }
        
   }

   if (isset($_POST['codigosis']) && isset($_POST['contrasena'])) {
        $username=$_POST['codigosis'];
        $password=$_POST['contrasena']; 
        $usuariodb;
        $con=conectar();
        $dbquery= mysqli_query($con,"select codigoSis, contrasena from Docente where codigoSis='$username' and contrasena='$password';");
        $resultado= mysqli_fetch_array($dbquery);
        mysqli_close($con);
        if($resultado != null){
            $con=conectar();
            $dbqueryUser=mysqli_query($con, "select nombre, apellido from Docente where codigoSis='$username' and contrasena='$password';");
            $usuariodb= mysqli_fetch_array($dbqueryUser);
            mysqli_close($con);
            $_SESSION['cuenta']= "docente";
            $_SESSION['nombre']= $usuariodb['nombre'];
            $_SESSION['apellido']=$usuariodb['apellido'];
            // tambien agregar el codigoSIS y que tipo de usuario es  docente o administrdor
            header('location: reservas-docente.php');
        }else{
            $con=conectar();
            $dbquery= mysqli_query($con,"select codigoSis, contrasena from Administrador where codigoSis='$username' and contrasena='$password';");
            $resultado= mysqli_fetch_array($dbquery);
            mysqli_close($con);
            if($resultado != null ){
                    $con=conectar();
                    $dbqueryUser=mysqli_query($con, "select nombre, apellido from Administrador where codigoSis='$username' and contrasena='$password';");
                    $usuariodb= mysqli_fetch_array($dbqueryUser);
                    mysqli_close($con);
                    $_SESSION['cuenta']= "admin";
                    $_SESSION['nombre']= $usuariodb['nombre'];
                    $_SESSION['apellido']=$usuariodb['apellido'];
                    // tambien agregar el codigoSIS y que tipo de usuario es  docente o administrdor
                    header('location: reservas-admin.php');
            }
        }
        $errorIniciarSesion = 1 ; 
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
    <link rel='stylesheet' href='css/styles-index.css'>
    
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
                            
                            <li class="nav-item  text-center">
                                <a class="nav-link active" href="index.php">Iniciar Sesion</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        
    </header>

    <main class="contenido-main-inicio-sesion">
        <div class="inicio-sesion">
            <h1 class="titulo-inicio-sesion">¡BIENVENIDO!</h1>
            
            <form class="form-inicio-sesion" action="index.php" method="post">
                
                <div class="seccion-input-sesion">
                    <label>CodigoSIS</label>
                    <input type="text" name="codigosis" >
                </div>

                <div class="seccion-input-sesion">
                    <label>Constaseña</label>
                    <input type="password" name="contrasena">
                    
                </div>
                <?php
                    if($errorIniciarSesion == 1){
                        echo " <b class ='mensaje-error-sesion'> El codigoSIS o contraseña son incorrectos </b> ";
                    }
                ?>
 
                <button class="btn-iniciar-sesion" >INICIAR SESION</button>
               
            </form>
        </div>
        <div class="info">
            <img  src="img/imagen-sesion.svg" height="550">
        </div>

    </main>

    <footer>
        <p class="fila-1">DERECHOS RESERVADOS © 2022 · UNIVERSIDAD MAYOR DE SAN SIMÓN</p>
        <p class="fila-2">Siguenos en:</p>
        <div class="fila-3 enlaces">
            <a href="https://www.instagram.com/umssboloficial/" class="instagram" target = “_blank ” >
                <img  src="img/logo-instagram.svg" height="22">
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-index.js"></script>
</body>
</html>