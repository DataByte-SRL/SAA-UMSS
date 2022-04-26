<?php 
  require __DIR__ . 'conectar.php';

    function agregarDocente($codigoSis, $nombre, $apellido, $ci, $codFacultad, $contrasena, $celular, $telefono, $correo ){
        $conexion=conectar();
        $consulta = "insert into `Docente`(`codigoSis`, `nombre`, `apellido`, `ci`, `codFacultad`, `contrasena`, `celular`, `telefono`, `correo`) VALUES ('$codigoSis','$nombre','$apellido','$ci','$codFacultad','$contrasena','$celular','$telefono','$correo')";
        if($conexion->query($consulta)){
          echo"nuevo doncente creado";
        }else{
          echo "error al insertar";
        }
        
        mysqli_close($conexion);
    }

  



?>