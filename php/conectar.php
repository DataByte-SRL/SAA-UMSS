<?php
function conectar(){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_base_datos";

    $conexion = new mysqli($servidor,$usuario,$contrasena,$BD);
    if($conexion-> connect_error){
        die("conexion fallida". $conexion-> connect_error);
        return $conexion;
    }else{
        echo "conexion exitosa";
        return $conexion;
    }
}
?>