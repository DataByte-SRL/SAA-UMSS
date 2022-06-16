<?php 

include_once("conectar.php");

if($_POST){

  try {
    $conexionPDO = conectarPDO();

    $codFacultad = $_POST['codFacultad'];
    $codTipoAmbiente = $_POST['codTipoAmbiente'];
    $codAmbiente = $_POST['codAmbiente'];
    $detalles = $_POST['detalles'];
    $capacidad= $_POST['capacidad'];
    $proyector= $_POST['proyector'];
    
    $consulta = "INSERT INTO `Ambiente`(`codAmbiente`, `codFacultad`, `detalles`, `proyector`, `capacidad`, `codTipoAmbiente`) VALUES ('$codAmbiente','$codFacultad','$detalles','$proyector','$capacidad','$codTipoAmbiente')";
    
    $respuesta = "";
      $respuesta = $conexionPDO->exec($consulta);
      echo "1";
  } catch (PDOException $e) {
      echo($e->getMessage());
  }

}


?>