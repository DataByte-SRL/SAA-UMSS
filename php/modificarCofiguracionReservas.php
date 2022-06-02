<?php 
    include_once("conectar.php");
    $con=conectar2();
    session_start();
    // la varible post tendra esta estructura  {codigoSis:"" , nombre:""} 
    

    if ($_POST) {    

        try {
            $habilitado = $_POST["habilitado"];
            $minimo= $_POST["minimo"];
            $maximo= $_POST["maximo"];
    
            $dbquery=mysqli_query ($con,"INSERT INTO `CONFIGURACIONRESERVAS`( `HABILITAR`, `MINIMO`, `MAXIMO`) VALUES ('$habilitado',' $minimo','$maximo')");
    
            echo "1";
        } catch (Throwable $th) {
            echo "0";
        }
        
     
    }

?>