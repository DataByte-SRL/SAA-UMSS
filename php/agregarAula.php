<?php 
include_once ("conectar.php");

if($_POST){
  
$con=conectar();
  try {
    $codFacultad = $_POST['codFacultad'];
    $codAula = $_POST['codAula'];
    $codNombre = $_POST['nombre'];
    $detalles = $_POST['detalles'];
    $capacidad = $_POST['capacidad'];
    $proyector = $_POST['proyector'];
    $dbquery= mysqli_query($con,"INSERT INTO `AULA`(`CODAULA`, `NOMBREAULA`, `CODFACULTAD`, `CAPACIDAD`, `DETALLE`, `PROYECTOR`) VALUES( $codAula ,$codNombre,$codFacultad,$capacidad,$detalles,$proyector)");
    
    $respuesta = "";
      $respuesta = $conexionPDO->exec($consulta);
      echo "1";
  } catch (PDOException $e) {
      echo($e->getMessage());
  }

}


?>