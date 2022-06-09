<?php

include_once ("conectar.php");

session_start();

if ($_SESSION['cuenta'] == 'administrador') {
    $con = conectar();

    $respuesta = mysqli_query($con,"SELECT A.nombre as nombreAdmin, A.apellido as apellidoAdmin, C.codAministrador, C.fechaConfiguracion,  C.habilitado,  C.minimo,  C.maximo,  C.motivo FROM  configuracion C , Administrador A WHERE C.codAministrador = A.codigoSis  ORDER BY C.codConfiguracion DESC");
    $res = mysqli_fetch_all($respuesta , $resulttype = MYSQLI_ASSOC);
    echo json_encode($res);
}    


?>