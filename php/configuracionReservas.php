<?php

include_once ("conectar.php");

$minimo = 1; 
$maximo = 1; 
$habilitado = "no"; 

$con=conectar2();
 $dbquery= mysqli_query($con,"select * FROM `CONFIGURACIONRESERVAS` WHERE CODIGOCONF = (SELECT MAX(CODIGOCONF) FROM `CONFIGURACIONRESERVAS`) ");
 $resultado= mysqli_fetch_array($dbquery);

 if ($resultado != null) {
    $minimo = $resultado['MINIMO'];
    $maximo = $resultado['MAXIMO']; 
    $habilitado = $resultado['HABILITAR'];
 }

$respuesta = array(
                    'minimo'=> $minimo,
                    'maximo'=> $maximo ,
                    'habilitado' => $habilitado);

echo json_encode($respuesta);

?>