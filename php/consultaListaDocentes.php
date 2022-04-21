<?php 

$servidor = "mysql-andre.alwaysdata.net";
$usuario="andre";
$contrasena="cualquiera";
$BD="andre_base_datos";

$conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);


$consulta="select `codigoSis`,Docente.nombre,`apellido`, `ci`,Facultad.nombre as `codFacultad`,`contrasena`,`celular`,`telefono`,`correo` FROM `Docente` INNER JOIN `Facultad` WHERE Docente.codFacultad = Facultad.codFacultad";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>