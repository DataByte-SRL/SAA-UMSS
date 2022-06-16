<?php

include_once ("conectar.php");
// la varible post tendra esta estructura {solicitantes, materia}

// estructura de los arreglos dentro de  "solicitantes" {codigoSis:"",nombre:""}
// estructura de los arreglos dentro de  "materia" {codigo:"",nombre:""}


if ($_POST) {   
    $con = conectar();
    $codMateria = $_POST["materia"];
    $solicitantes = $_POST["solicitantes"];
    $res =  array();

    foreach ($solicitantes as $key => $value) {
        $codSis =$value["codigoSis"];
        $respuesta  = mysqli_query($con ,"SELECT  G.codGrupo as codigoGrupo , D.nombre as docente, G.estudiantes as cantidad ,G.codDocente  FROM Grupo G, Docente D WHERE G.codDocente = D.codigoSis AND G.codDocente = $codSis AND G.codMateria = $codMateria");
        $aux = mysqli_fetch_all($respuesta,$resulttype = MYSQLI_ASSOC);
        foreach ($aux as $keyaux => $valueAux) {
            array_push($res,$valueAux);
        }
    }

    echo json_encode($res);
}


?>