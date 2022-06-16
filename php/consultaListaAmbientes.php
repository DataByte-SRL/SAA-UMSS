<?php 

include_once("conectar.php");


$conexion = conectar();


$consulta="SELECT A.codAmbiente, A.detalles, A.proyector, A.capacidad, TA.nombre as tipoAmbiente , A.codFacultad ,F.nombre as nombreFacultad , A.codTipoAmbiente FROM Ambiente A ,Facultad F ,TipoAmbiente TA WHERE A.codFacultad = F.codFacultad AND TA.codTipoAmbiente = A.codTipoAmbiente;";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);


?>

