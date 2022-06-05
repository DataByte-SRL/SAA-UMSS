<?php



function conectar(){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_prueba";

    $conexion = new mysqli($servidor,$usuario,$contrasena,$BD);
    if($conexion-> connect_error){
        die("conexion fallida". $conexion-> connect_error);
        return $conexion;
    }else{
        //echo "conexion exitosa";
        return $conexion;
    }
}

function conectarPDO(){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
    $BD="andre_prueba";
    try {
      $conexionPDO = new PDO("mysql:host=$servidor;dbname=$BD",$usuario,$contrasena);
      $conexionPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conexionPDO;
    } catch (PDOException $e) {
        echo($e->getMessage());
        return $conexionPDO;
    }
}

?>