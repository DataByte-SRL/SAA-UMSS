<?php 


if($_POST){
  $servidor = "mysql-andre.alwaysdata.net";
  $usuario="andre";
  $contrasena="cualquiera";
  $BD="andre_base_datos";
  

  try {
    $conexionPDO = new PDO("mysql:host=$servidor;dbname=$BD",$usuario,$contrasena);
    $conexionPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $codFacultad = $_POST['codFacultad'];
    $codAula = $_POST['codAula'];
    $detalles = $_POST['detalles'];
    $capacidad= $_POST['capacidad'];
    $proyector= $_POST['proyector'];
    
    $consulta = "insert into `Aula`(`codFacultad`, `codAula`, `detalles`, `capacidad`, `proyector`) VALUES ('$codFacultad','$codAula','$detalles','$capacidad','$proyector')";
    
    $respuesta = "";
      $respuesta = $conexionPDO->exec($consulta);
      echo "1";
  } catch (PDOException $e) {
      echo($e->getMessage());
  }

}


?>