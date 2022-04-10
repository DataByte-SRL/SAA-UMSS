<?php 

$servidor = "mysql-andre.alwaysdata.net";
$usuario="andre_root";
$contrasena="adivinala";
$BD="andre_base_datos";

$conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);


$consulta="select * from usuarios";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_NUM);

mysqli_close($conexion);

echo   json_encode($res);




?>