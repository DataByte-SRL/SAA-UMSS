<?php 
  session_start();
  include_once('conectar.php');
  
  $con=conectarPDO();
  if($_POST){
    
    print_r($_POST);
      $codigoSis = $_SESSION['codigoSis'];
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $facultad = $_POST['facultad'];
     // $ci = $_POST['ci'];
      $telefono = $_POST['telefono'];
      $celular = $_POST['celular'];
      $correo = $_POST['correo'];
      
      $sql = "UPDATE Docente SET nombre='$nombre', apellido='$apellido', codFacultad='$facultad', telefono='$telefono', celular='$celular', correo='$correo' WHERE codigoSis=$codigoSis ";
      $resultado = $con->exec($sql);
  
  }


?>
<html lang="es">
  <head>

  </head>

  <body>
    <div class="container">
      <div class="row">
        <div class="row" style="text-align:center"
        <?php if (!$resultado){ ?>
          <h3>ERROR AL MODIFICAR</h3>
        <?php }else{ ?>
          <h3>REGISTRO MODIFICADO</h3>
        <?php } ?>
        <a href="../reservas-docente.php" class="btn btn-primary">Regresar</a>
      </div>
    </div>
  </body>