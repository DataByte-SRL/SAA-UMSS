<?php 
   include_once ("conectar.php");
   
   session_start();
   try {
        if (isset($_POST['codigosis']) && isset($_POST['contrasena'])) {
            $username = $_POST['codigosis'];
            $password =$_POST['contrasena'];
            $con=conectar();
            $dbquery= mysqli_query($con,"select NOMBREDOC, APELLIDODOC, CODSISDOC, CONTRASENIADOC from DOCENTE where CODSISDOC='$username' and CONTRASENIADOC='$password';");
            $resultado= mysqli_fetch_array($dbquery);
            if($resultado != null){
                $_SESSION['cuenta']= "docente";
                $_SESSION['nombre']= $resultado['NOMBREDOC'];
                $_SESSION['apellido']=$resultado['APELLIDODOC'];
                $_SESSION['codigoSis']=$resultado['CODSISDOC'];
                mysqli_close($con);
                echo "docente";
            }else{
                $dbquery= mysqli_query($con,"select NOMBREADMIN, APELLIDOADMIN, CODSISADMIN, CONTRASENIAADMIN from ADMINISTRADOR where CODSISADMIN='$username' and CONTRASENIAADMIN='$password';");
                $resultado= mysqli_fetch_array($dbquery);
                mysqli_close($con);
                if($resultado != null ){
                        $_SESSION['cuenta']= "administrador";
                        $_SESSION['nombre']= $resultado['NOMBREADMIN'];
                        $_SESSION['apellido']=$resultado['APELLIDOADMIN'];
                        $_SESSION['codigoSis']=$resultado['CODSISADMIN'];
                        echo "administrador";
                }
            }
        }
        echo "0";
       
   } catch (Throwable $th) {
       echo "0";
   }

?>
