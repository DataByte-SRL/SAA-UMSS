<?php
include("conectar.php");
/*
$servidor = "mysql-andre.alwaysdata.net";
$usuario="andre";
$contrasena="cualquiera";
$BD ="andre_base_datos";

$conexion = new mysqli($servidor,$usuario,$contrasena,$BD);
    if($conexion-> connect_errno){
        die("conexion fallida". $conexion-> connect_error);
    }else{
        echo "conexion exitosa";
    }
*/
$con=conectar();

$con-> query("insert into Docente (codigoSis, nombre, apellido, ci, codFacultad, contrasena, celular, telefono, correo) values ('201304123','analuisa','lopez','10293874','9','contrasenia','12345678', '87654321','correito@correo.com')");

mysqli_close($con);
/*
$conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);

$consulta="select * from usuarios";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);
 
echo   json_encode($res);
*/

?>