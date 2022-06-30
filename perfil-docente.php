<?php //esto se ocupa de ver si hay una sesion activa y si no redirecciona a que inicie sesion
    
    $nombre = " ";
    $apellido = " ";
    session_start();
    include_once ("php/conectar.php");

    if(!isset($_SESSION['cuenta'])){
        header('location:index.php');
    }else{
        if ($_SESSION['cuenta'] != "docente") {
            header('location:index.php');
        }
        $nombre = $_SESSION['nombre'];
        $apellido = $_SESSION['apellido'];
    }

    $con=conectar();
    $consulta = "SELECT * FROM Docente WHERE nombre = '$nombre'";
    $ejecuta = $con->query($consulta);
    $extraer = $ejecuta->fetch_assoc();
    
    $unir = "SELECT d.nombre, d.apellido, d.ci, d.codigoSis, d.telefono, d.celular, d.correo, d.codFacultad, f.codFacultad, f.nombre FROM Docente d INNER JOIN Facultad f ON d.codFacultad = f.codFacultad WHERE d.nombre = '$nombre'";
    $verificar = $con->query($unir);
    $separar = $verificar->fetch_array();
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
    <link rel='stylesheet' href='css/styles-perfil.css'>
    
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
                                <a class="nav-link " href="reservas-docente.php">Reservas</a>
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

    <main class="contenido-main">
    
    <div class="formulario-perfil">
    <form method="POST" action="php/actualizar-docente.php">
        <h1 class="titulo-formulario-configuracion">Configuración de usuario</h1>
      <div class="seccion-datos">
        <h2 class="titulo-configuracion-perfil">Configuración del Perfil</h2>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Codigo SIS:</label>
          <p><?php echo $extraer['codigoSis']; ?></p>
        </div>
        <div class="seccion-input">
          <label class="label-input" for="asunto">CI:</label>
          <p><?php echo $extraer['ci'];?></p>
        </div> 
        <div class="seccion-input">
          <label class="label-input" for="asunto">Nombre(s):</label>
          <input type="text" class="input-casilla" name="nombre" value="<?php echo $extraer['nombre'];?>" >
        </div>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Apellido(s):</label>
          <input type="text" class="input-casilla" name="apellido" value="<?php echo $extraer['apellido'];?>" >
        </div>
        <div class="seccion-input">
            <label class="label-input" for="asunto">Facultad:</label>
                <select name="facultad" id="facultad" >
                    <option value="0" disabled selected>Seleccionar una Facultad</option>
                    <option value="1">Ciencias agricolas y Pecuarias</option>
                    <option value="2">CS.Bioquimicas</option>
                    <option value="3">Ciencias Económicas</option>
                    <option value="4">Desarrollo Rural</option>
                    <option value="5">Odontologia</option>
                    <option value="6">Medicina</option>
                    <option value="7">Arquitectura</option>
                    <option value="8">Humanidades</option>
                    <option value="9">Ciencias Juridicas</option>
                    <option value="10">Ciencias y Tecnologia</option>
                    <option value="11">Ciencias Sociales</option>
                    <option value="12">Ciencias Veterinarias</option>
                    <option value="13">Enfermeria</option>
                </select>
        </div>  
        <h2 class="titulo-configuracion-perfil">Cambiar Contraseña</h2>             
        <div>
          <label class='label-input' for="asunto">Contraseña Actual:  </label>
           <input type="text" class="input-casilla" name="ca">
        </div>
        <div>
          <label class='label-input' for="asunto">Nueva Contraseña: </label>
          <input type="text" class="input-casilla" name="nc">
        </div>
        <div>
          <label class='label-input' for="asunto">Repetir Contraseña:</label>
          <input type="text" class="input-casilla" name="rc">
        </div>  
        <h2 class="titulo-configuracion-perfil">Cambiar Datos de Contacto</h2>        
        <div class="seccion-input">
          <label class="label-input" for="asunto">Telefono:</label>
          <input type="text" class="input-casilla" name="telefono" value="<?php echo $extraer['telefono'];?>">
        </div> 
        <div class="seccion-input">
          <label class="label-input" for="asunto">Celular:</label>
          <input type="text" class="input-casilla" name="celular" value="<?php echo $extraer['celular'];?>">
        </div> 
        <div class="seccion-input">
          <label class="label-input" for="asunto">Correo:</label>
          <input type="email" class="input-casilla" name="correo" value="<?php echo $extraer['correo'];?>">
        </div>            

            </div>
                <div class="seccion-botones-form-a">
                    <tr>
                        <button type="submit" class="btn-actualizar">Actualizar</button> 
                    </tr>
					<br></br>
                    <tr>
                        <input type="button" class="btn-cancelar" name="Cancelar" value="Cancelar" onClick="location.href='../reservas-docente.php'"> 
                    </tr>
                </div>
            </div>
        </div>
		</form>
    </div>

    </main>

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


    <script   src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-index.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
 
    
</body>
</html>
