<?php 


$servidor = "mysql-andre.alwaysdata.net";
$usuario="andre";
$contrasena="cualquiera";
$BD="andre_base_datos";

$conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);


$consulta="select  `nombre` as `codFacultad`,`codAula`,`detalles`, `proyector`,`capacidad` FROM `Aula` INNER JOIN `Facultad` WHERE Aula.codFacultad = Facultad.codFacultad";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);



?>