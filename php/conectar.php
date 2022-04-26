<?php
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
    try{
        $conexion = mysqli_connect($servidor,$usuario,$contrasena,$BD);
        return $conexion;
    }catch(Exception $error){
        echo"no se pudo conectar a la base de datos";
    }
    
    
}
?>