<?php


include_once ("conectar.php");

date_default_timezone_set("America/Santiago");
$fechaActual = time();


$minimo = 1; 
$maximo = 1; 
$habilitado = "no"; 

$con=conectar();
$dbquery= mysqli_query($con,"SELECT `habilitado`, `minimo`, `maximo` FROM configuracion WHERE codConfiguracion = (SELECT MAX(codConfiguracion) FROM configuracion )");
$resultado= mysqli_fetch_array($dbquery);

 if ($resultado != null) {
    $minimo = $resultado['minimo'];
    $maximo = $resultado['maximo']; 
    $habilitado = $resultado['habilitado'];
 }

$fechaMinimaReserva = date($fechaActual + ($minimo * 24 * 60 * 60));
$fechaMaximaReserva = date($fechaActual + ($maximo * 24 * 60 * 60));


$respuesta = array('timeStamp' =>$fechaActual,
                    'fechaMinimaReserva' =>date("Y-m-d",$fechaMinimaReserva),
                    'fechaMaximaReserva' =>date("Y-m-d",$fechaMaximaReserva), 
                    'minimo'=> $minimo,
                    'maximo'=> $maximo ,
                    'habilitado' => $habilitado);

echo json_encode($respuesta);

?>