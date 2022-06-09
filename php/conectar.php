<?php
<<<<<<< HEAD
=======



>>>>>>> main
function conectar(){
    $servidor = "mysql-andre.alwaysdata.net";
    $usuario="andre";
    $contrasena="cualquiera";
<<<<<<< HEAD
    $BD="andre_base_datos";
=======
    $BD="andre_prueba";
>>>>>>> main

    $conexion = new mysqli($servidor,$usuario,$contrasena,$BD);
    if($conexion-> connect_error){
        die("conexion fallida". $conexion-> connect_error);
        return $conexion;
    }else{
        //echo "conexion exitosa";
        return $conexion;
    }
}
<<<<<<< HEAD
=======

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

>>>>>>> main
?>