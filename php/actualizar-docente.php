<?php 


  if($_POST){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_base_datos";
    
  
    try {
      $conexionPDO = new PDO("mysql:host=$servidor;dbname=$BD",$usuario,$contrasena);
      $conexionPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $facultad = $_POST['facultad'];
      $codigoSis = $_POST['codigoSis'];
      $ci = $_POST['ci'];
      $telefono = $_POST['telefono'];
      $celular = $_POST['celular'];
      $correo = $_POST['correo'];
      
      $consulta = "UPDATE Docente SET nombre='$nombre', apellido='$apellido', facultad='$facutad', telefono='$telefono', celular='$celular', correo='$correo' WHERE codigoSis=$codigoSis ";
      
      $respuesta = "";
        $respuesta = $conexionPDO->exec($consulta);
        echo "<script>alert('Se han actualizado correctamente los cambios'); window.location='../reservas-admin.php';</script>";
    } catch (PDOException $e) {
      echo "<script>alert('No se pudo actualizar los datos'); window.location='../perfil-admin.php';</script>";
    }

  }
  header('location: ../reservas-docente.php');


?>