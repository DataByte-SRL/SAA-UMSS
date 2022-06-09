<?php

include_once("conectar.php");
    $con=conectar();
    session_start();

if ($_POST) { 
    $con = conectar();

    $codSis = $_POST['codigoSis'];
    
    $respuesta =  mysqli_query($con ,"SELECT M.codMateria as codigo , M.nombre  FROM Grupo G ,Materia M WHERE  G.codMateria=M.codMateria AND  G.codDocente = $codSis GROUP BY M.codMateria ");
    $res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);


   echo(json_encode($res));    
}

?>