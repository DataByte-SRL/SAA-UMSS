<?php 
include_once("conectar.php");

$conexion =conectar();


$consulta="select `codigoSis`,Docente.nombre,`apellido`, `ci`,Facultad.nombre as `nombreFacultad`,`contrasenia`,`celular`,`telefono`,`correo` , Facultad.codFacultad FROM Docente,Facultad WHERE Docente.codFacultad = Facultad.codFacultad";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>