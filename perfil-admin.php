<?php

  session_start();

  include_once ("php/conectar.php");
 
  $usuario = $_SESSION['nombre'];
  if(!isset($_SESSION['cuenta'])){
    header('location:index.php');
  }
  $con=conectar();
  $consulta = "SELECT * FROM Administrador WHERE nombre = '$usuario'";
  $ejecuta = $con->query($consulta);
  $extraer = $ejecuta->fetch_assoc();
  
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
                </div>
            </nav>
        </div>
        
    </header>

    <main class="contenido-main">
    <div class="formulario-perfil">
      <h1 class="titulo-formulario-configuracion">Configuración de usuario</h1>
      <div class="seccion-datos">
        <h2 class="titulo-configuracion-perfil">Configuración del Perfil</h2>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Nombre(s):</label>
          <input type="text" class="input-casilla" name="nombre" value="<?php echo $extraer['nombre'];?>" >
        </div>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Apellido(s):</label>
          <input type="text" class="input-casilla" name="apellido" value="<?php echo $extraer['apellido'];?>" >
        </div>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Codigo SIS:</label>
          <p><?php echo $extraer['codigoSis']; ?></p>
        </div>   
        <h2 class="titulo-configuracion-perfil">Cambiar Contraseña</h2>             
          <div class="seccion-input">
            <input type="button" class="btn-cambiar" name="CambiarContraseña" value="cambiar Contraseña" onClick="location.href='../cambiarContrasena.php'"> 
          </div>   

        <h2 class="titulo-configuracion-perfil">Cambiar Datos de Contacto</h2>        
        <div class="seccion-input">
          <label class="label-input" for="asunto">Telefono:</label>
          <input type="text" class="input-casilla" name="telefono" value="<?php echo $extraer['telefono'];?>">
        </div>
        <div class="seccion-input">
          <label class="label-input" for="asunto">Correo:</label>
          <input type="email" class="input-casilla" name="correo" value="<?php echo $extraer['correo'];?>">
        </div>            

            </div>
                <div class="seccion-botones-form-a">
                    <tr>
                        <input type="button" class="btn-aceptar" name="Actualizar" value="Actualizar" onClick="location.href='../php/actualizar-admin.php'">
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
  </div>
</body>
</html>


