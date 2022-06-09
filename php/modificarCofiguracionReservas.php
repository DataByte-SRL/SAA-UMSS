<?php 
    include_once("conectar.php");
    session_start();

    $con=conectarPDO();
    
    date_default_timezone_set("America/Santiago");
    $fechaActual = time();

    if ($_POST) {    

        try {
            $codAdmin= $_SESSION["codigoSis"];
            $fechaConfiguracion = date("Y-m-d G:i:s",$fechaActual);
            $habilitado = $_POST["habilitado"];
            $minimo= $_POST["minimo"];
            $maximo= $_POST["maximo"];
            $motivo= $_POST["motivo"];
           
            $dbquery= $con->exec("INSERT INTO `configuracion`( `codAministrador`, `fechaConfiguracion`, `habilitado`, `minimo`, `maximo`, `motivo`) VALUES  ( '$codAdmin','$fechaConfiguracion','$habilitado','$minimo','$maximo','$motivo')");
    
            if ($dbquery == 1) {
                 echo "1";
            }else{
                echo 0;
            }
        } catch (Throwable $th) {
            echo $th;
        }
    }

?>