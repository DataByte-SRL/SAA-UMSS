<?php

include_once ("conectar.php");

if ($_POST) {   
    $con = conectar();
    $codMateria = $_POST["codMateria"];

    $respuesta  = mysqli_query($con ,"SELECT codHorario, codGrupo, codMateria, dia, horaInicio, horaFin FROM Horario WHERE codMateria = $codMateria");
    $res = mysqli_fetch_all($respuesta,$resulttype = MYSQLI_ASSOC);


    echo json_encode($res);
}


?>