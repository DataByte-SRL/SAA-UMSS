<?php 
  session_start();

  if($_POST){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_base_datos";
    
  
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $facultad = $_POST['facultad'];
      $codigoSis = $_POST['codigoSis'];
      $ci = $_POST['ci'];
      $telefono = $_POST['telefono'];
      $celular = $_POST['celular'];
      $correo = $_POST['correo'];
      
      $sql = "SELECT nombre, apellido, facultad, telefono, celular, correo FROM Docente WHERE codigosis='$codigoSis'";
          $result = mysqli_query($conn, $sql);
          if(mysqli_num_rows($result) === 1){
            
            $sql_2 = "UPDATE Docente SET nombre='$nombre', apellido='$apellido', facultad='$facutad', telefono='$telefono', celular='$celular', correo='$correo' WHERE codigoSis=$codigoSis ";
            mysqli_query($conn, $sql_2);
            header("Location: change-password.php?success=Datos Actualizados");
            exit();
  
          } else{
            header("Location: perfil-docente.php?error=Error en la actualización");
            exit();
          }

      
    

    if (isset($_POST['ca']) && isset($_POST['nc']) && isset($_POST['rc'])){
      $ca = $_POST['ca'];
      $nc = $_POST['nc'];
      $rc = $_POST['rc'];
  
      if(!empty($ca)){
        if(empty($nc)){
          header("Location: change-password.php?error=New Password is required");
          exit();
        }else if($nc !== $rc){
          header("Location: change-password.php?error=The confirmation password  does not match");
          exit();
        }else {
          $sql = "SELECT password
                  FROM Docente WHERE 
                  codigosis='$codigoSis' AND password='$op'";
          $result = mysqli_query($conn, $sql);
          if(mysqli_num_rows($result) === 1){
            
            $sql_2 = "UPDATE Docente
                      SET password='$np'
                      WHERE codigosis='$codigoSis'";
            mysqli_query($conn, $sql_2);
            header("Location: change-password.php?success=Contraseña Actualizada correctamente");
            exit();
  
          }else {
            header("Location: change-password.php?error=Incorrect password");
            exit();
          }
        }
        
        exit();
      }
    }
  }
      
  header('location: ../reservas-docente.php');


?>