<?php
date_default_timezone_set("America/Santiago");
$fechaActual = time();


$minimo = 2; // consegir este dato de la base de datos
$maximo = 30;  // consegir este dato de la base de datos
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
                    'habilitado' => 'si');

echo json_encode($respuesta);

?>