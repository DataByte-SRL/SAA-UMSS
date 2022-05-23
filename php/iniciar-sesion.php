<?php 
   include_once ("conectar.php");
   
   session_start();
   try {
        if (isset($_POST['codigosis']) && isset($_POST['contrasena'])) {
            $username = $_POST['codigosis'];
            $password =$_POST['contrasena'];
            $con=conectar();
            $dbquery= mysqli_query($con,"select nombre, apellido, codigoSis, contrasena from Docente where codigoSis='$username' and contrasena='$password';");
            $resultado= mysqli_fetch_array($dbquery);
            if($resultado != null){
                $_SESSION['cuenta']= "docente";
                $_SESSION['nombre']= $resultado['nombre'];
                $_SESSION['apellido']=$resultado['apellido'];
                $_SESSION['codigoSis']=$resultado['codigoSis'];
                mysqli_close($con);
                echo "docente";
            }else{
                $dbquery= mysqli_query($con,"select nombre, apellido, codigoSis, contrasena from Administrador where codigoSis='$username' and contrasena='$password';");
                $resultado= mysqli_fetch_array($dbquery);
                mysqli_close($con);
                if($resultado != null ){
                        $_SESSION['cuenta']= "administrador";
                        $_SESSION['nombre']= $resultado['nombre'];
                        $_SESSION['apellido']=$resultado['apellido'];
                        $_SESSION['codigoSis']=$resultado['codigoSis'];
                        echo "administrador";
                }
            }
        }
        echo "0";
       
   } catch (Throwable $th) {
       echo "0";
   }

?>
