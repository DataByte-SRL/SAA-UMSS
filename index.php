<?php 
   session_start();

   if (isset($_SESSION['cuenta'])) {
        if ($_SESSION['cuenta'] == "docente") {
            header('location: reservas-docente.php');
        }
        if ($_SESSION['cuenta'] == "administrador") {
            header('location: reservas-admin.php');
        }
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
            <h1 class="titulo-inicio-sesion">??BIENVENIDO!</h1>

            <div class="mensaje-error-sesion mensaje-error-sesion-visible mensaje-error-sesion-oculto">
                <div class="contenedor-simbolo-error-sesion">
                    <div class="simbolo-error-sesion">

                    </div>
                </div>
                <div class="contenedor-mesaje-error-sesion">
                    <p class="mesaje-error-sesion">Los  datos que ha ingresado al formulario  son incorrectos, por favor reviselos</p>
                </div>

            </div>
            
            <form class="form-inicio-sesion" action="index.php" method="post">
                
                <div class="seccion-input-sesion">
                    <label>CodigoSIS</label>
                    <input class="input-codigoSis" type="text" name="codigosis" >
                </div>

                <div class="seccion-input-sesion">
                    <label>Constase??a</label>
                    <input class="input-contrasena" type="password" name="contrasena">
                    <div class="btn-contrasenia btn-ocultar-contrasenia">
                    </div>
                    
                </div>
 
                <button class="btn-iniciar-sesion" >INICIAR SESION</button>
               
            </form>
        </div>
        <div class="info">
            <img  src="img/imagen-sesion.svg" height="550">
        </div>

    </main>

    <footer>
        <p class="fila-1">DERECHOS RESERVADOS ?? 2022 ?? UNIVERSIDAD MAYOR DE SAN SIM??N</p>
        <p class="fila-2">Siguenos en:</p>
        <div class="fila-3 enlaces">
            <a href="https://www.instagram.com/umssboloficial/" class="instagram" target = ???_blank ??? >
                <img  src="img/logo-instagram.svg" height="22">
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

    <script   src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-index.js"></script>
</body>
</html>