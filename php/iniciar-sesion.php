<?php 
   include_once ("conectar.php");
   
   session_start();
   try {
        if (isset($_POST['codigosis']) && isset($_POST['contrasena'])) {
            $username = $_POST['codigosis'];
            $password =$_POST['contrasena'];
            $con=conectar2();
           // $dbquery= mysqli_query($con,"select nombre, apellido, codigoSis, contrasena from Docente where codigoSis='$username' and contrasena='$password';");
            $dbquery= mysqli_query($con,"select NOMBREDOC as nombre, APELLIDODOC as apellido, CODSISDOC as codigoSis  from DOCENTE where CODSISDOC='$username' and CONTRASENIADOC='$password';");
            $resultado= mysqli_fetch_array($dbquery);
            if($resultado != null){
                $_SESSION['cuenta']= "docente";
                $_SESSION['nombre']= $resultado['nombre'];
                $_SESSION['apellido']=$resultado['apellido'];
                $_SESSION['codigoSis']=$resultado['codigoSis'];
                mysqli_close($con);
                echo "iniciado";
            }else{
                $dbquery= mysqli_query($con,"select NOMBREADMIN as nombre, APELLIDOADMIN as apellido, CODSISADMIN as codigoSis from ADMINISTRADOR where CODSISADMIN='$username' and CONTRASENIAADMIN='$password';");
                $resultado= mysqli_fetch_array($dbquery);
                mysqli_close($con);
                if($resultado != null ){
                        $_SESSION['cuenta']= "administrador";
                        $_SESSION['nombre']= $resultado['nombre'];
                        $_SESSION['apellido']=$resultado['apellido'];
                        $_SESSION['codigoSis']=$resultado['codigoSis'];
                        echo "iniciado";
                }
            }
        }else{
            echo "0";
        }
        
       
   } catch (Throwable $th) {
       echo "0";
   }

?>
