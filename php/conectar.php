<?php
    conectar();
function conectar(){
    /*$servidor = "mysql-giusseppe.alwaysdata.net";
    $usuario="giusseppe";
    $contrasena="tonio2203";
    $BD="giusseppe_reservas";
    */
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_base_datos";

    $conexion = new mysqli($servidor,$usuario,$contrasena,$BD);
    if($conexion-> connect_error){
        die("conexion fallida". $conexion-> connect_error);
    }
    echo "conexion exitosa";
    
}
?>