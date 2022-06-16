<?php 

include_once("conectar.php");

  if($_POST){
  
    try {
      $conexionPDO = conectarPDO();
  
      $codigoSis = $_POST['codigoSis'];
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $ci= $_POST['ci'];
      $codFacultad= $_POST['codFacultad'];
      $contrasena= $_POST['ci'];
      $celular= $_POST['celular'];
      $telefono= $_POST['telefono'];
      $correo= $_POST['correo'];
      
      $consulta = "insert into `Docente`(`codigoSis`, `nombre`, `apellido`, `ci`, `codFacultad`, `contrasenia`, `celular`, `telefono`, `correo`) VALUES ('$codigoSis','$nombre','$apellido','$ci','$codFacultad','$contrasena','$celular','$telefono','$correo')";
                                       
      $respuesta = "";
        $respuesta = $conexionPDO->exec($consulta);
        echo "1";
    } catch (PDOException $e) {
        echo($e->getMessage());
    }

  }



?>