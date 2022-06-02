<?php


include_once ("conectar.php");

date_default_timezone_set("America/Santiago");
$fechaActual = time();


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

$fechaMinimaReserva = date($fechaActual + ($minimo * 24 * 60 * 60));
$fechaMaximaReserva = date($fechaActual + ($maximo * 24 * 60 * 60));
/*
print_r (date("Y-m-d",$fechaActual));
echo "<br>";
print_r (date("Y-m-d",$fechaMinimaReserva));
echo "<br>";
print_r (date("Y-m-d",$fechaMaximaReserva));
echo "<br>";
*/

$respuesta = array('timeStamp' =>$fechaActual,
                    'fechaMinimaReserva' =>date("Y-m-d",$fechaMinimaReserva),
                    'fechaMaximaReserva' =>date("Y-m-d",$fechaMaximaReserva), 
                    'minimo'=> $minimo,
                    'maximo'=> $maximo ,
                    'habilitado' => $habilitado);

echo json_encode($respuesta);

?>