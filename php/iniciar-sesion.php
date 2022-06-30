<?php 
   include_once ("conectar.php");
   
   session_start();
   try {
        if (isset($_POST['codigosis']) && isset($_POST['contrasena'])) {
            
            $con=conectar();

            $con -> set_charset('utf8');
            $username = $con->real_escape_string($_POST['codigosis']);
            $password = $con->real_escape_string($_POST['contrasena']);
            
            $dbquery= mysqli_query($con,"select nombre, apellido, codigoSis, codFacultad,contrasenia from Docente where codigoSis='$username' and contrasenia='$password';");
            $resultado= mysqli_fetch_array($dbquery);
            if($resultado != null){
                $_SESSION['cuenta']= "docente";
                $_SESSION['nombre']= $resultado['nombre'];
                $_SESSION['apellido']=$resultado['apellido'];
                $_SESSION['codigoSis']=$resultado['codigoSis'];
                $_SESSION['codFacultad']=$resultado['codFacultad'];
                mysqli_close($con);
                echo "iniciado";
            }else{
                $dbquery= mysqli_query($con,"select nombre, apellido, codigoSis, contrasenia from Administrador where codigoSis='$username' and contrasenia='$password';");
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
