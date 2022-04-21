<?php

$servidor = "mysql-giusseppe.alwaysdata.net";
$usuario="giusseppe";
$contrasena="tonio2203";
$BD="giusseppe_reservas_umss";

$conexionPDO = new PDO("mysql:host=$servidor;dbname=$BD",$usuario,$contrasena);
$conexionPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$consulta= "insert into `usuario` (`ci`, `nombre`, `telefono`, `correo`) values ('444444','andre','12435','andre@gmail.com')";
$consulta = "insert into `ADMINISTRADOR`(`CODIGOADMINISTRADOR`, `NOMBREADMIN`, `CONTRASENAADMIN`) values ('66221','pedro','54321')";

$respuesta = "";
try {
    $respuesta = $conexionPDO->exec($consulta);
    echo "se logro agregar con exito a la base de datos";
} catch (PDOException $e) {
    echo($e->getMessage());
}

/*
$conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);

$consulta="select * from usuarios";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);
 
echo   json_encode($res);
*/

?>