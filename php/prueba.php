<?php
$host = "localhost";
$usario= "root";
$contrasña = "";

try {
    $conexion = new PDO("mysql:host=$host;dbname=baseprueba",$usario,$contrasña);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
    echo "conexion exitosa </br>";

    $consulta = "SELECT * FROM `usuario`";
    $res = $conexion->prepare($consulta);
    $res->execute();

    $datos = $res->fetchAll();
    
    //print_r($datos);

    foreach ($datos as $key => $value) {

        echo($value["ci"]);
        echo ("    -       ");
        echo($value["nombre"]);
        echo ("    -       ");
        echo($value["telefono"]);
        echo ("    -       ");
        echo($value["correo"]);
        echo( "<br>");
    }

} catch (PDOE_exeption $error) {
     echo "sin conexion";
}



?>