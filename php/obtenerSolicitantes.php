<?php


session_start();
include_once('conectar.php');

if ($_POST) {   
  $con = conectar();
  $codSolicitante = $_POST["codigoSolicitante"];
  $codMateria = $_POST["codMateria"];
  $respuesta = mysqli_query($con,"SELECT D.codigoSis as codigoSis,  CONCAT(D.nombre,' ',D.apellido) as nombre  FROM Grupo G ,Docente D WHERE G.codDocente = D.codigoSis  AND D.codigoSis != $codSolicitante AND G.codMateria = $codMateria GROUP BY D.codigoSis");
  $res = mysqli_fetch_all($respuesta , $resulttype = MYSQLI_ASSOC);
  echo json_encode($res);
  
}

?>