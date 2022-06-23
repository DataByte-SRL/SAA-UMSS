<?php 
  session_start();
  include_once('conectar.php');
  
  $con=conectarPDO();

  if($_POST){  
    print_r($_POST);
      $codigoSis = $_SESSION['codigoSis'];
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $telefono = $_POST['telefono'];
      $correo = $_POST['correo'];
      
      
      $sql = "UPDATE Administrador SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo' WHERE codigoSis=$codigoSis ";
      $resultado = $con->exec($sql);
      
/*
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
*/
  } 

?>