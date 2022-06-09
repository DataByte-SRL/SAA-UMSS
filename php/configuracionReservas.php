<?php

include_once ("conectar.php");

$minimo = 1; 
$maximo = 1; 
$habilitado = "no"; 

try {
   $con=conectar();
   $dbquery= mysqli_query($con,"SELECT `codConfiguracion`, `codAministrador`, `fechaConfiguracion`, `habilitado`, `minimo`, `maximo`, `motivo` FROM configuracion WHERE codConfiguracion = (SELECT MAX(codConfiguracion) FROM configuracion )");
   $resultado= mysqli_fetch_array($dbquery);
   
   if ($resultado != null) {
      $minimo = $resultado['minimo'];
      $maximo = $resultado['maximo']; 
      $habilitado = $resultado['habilitado'];
   }
   $respuesta = array(
                     'minimo'=> $minimo,
                     'maximo'=> $maximo ,
                     'habilitado' => $habilitado);
   echo json_encode($respuesta);

} catch (Throwable $th) {
   $respuesta = array(
      'minimo'=> $minimo,
      'maximo'=> $maximo ,
      'habilitado' => $habilitado);
   echo json_encode($respuesta);
}



?>