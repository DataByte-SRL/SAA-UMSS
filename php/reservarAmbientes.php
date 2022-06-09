<?php

include_once('conectar.php');
session_start();



if ($_POST) {   
    date_default_timezone_set("America/Santiago");
    $fechaActual = time();
    $fechaActual= date('Y-m-d H:i:s',$fechaActual);
    $con = conectarPDO();
    $asunto = $_POST['asunto'];
    $codMateria =$_POST['codMateria'];
    $codFacultad = $_POST['codFacultad'];
    $fechaReserva =  date( 'Y-m-d',$_POST['fechaReserva']); ;
    $horaInicio = $_POST['horaInicio'];
    $horaFin =  $_POST['horaFin'];
    $comentario = $_POST['comentario'];
    $motivoEmergencia =$_POST['motivoEmergencia'];
    $emergencia = $_POST['emergencia'];

    
    $respuesta = $con -> exec("INSERT INTO Reserva(asunto, codMateria, fechaRerserva, fechaCreacion, horaInicio,horaFin,comentario,emergencia,motivoEmergencia) VALUES ('$asunto','$codMateria','$fechaReserva','$fechaActual','$horaInicio','$horaFin','$comentario','$emergencia','$motivoEmergencia');");
    $idRerserva = $con->lastInsertId();

    $consultaSolicitantes="";
    $consultaAmbientes="";
    $consultaGrupos = "";

    if ($idRerserva > 0 &&  $respuesta ) {
        $n = 0;
        $solicitantes = $_POST['solicitantes'];
        foreach ($solicitantes as $key => $value) {
            if ($n == 0) {
                $codDocente = $value["codigoSis"];
                $consultaSolicitantes =  $consultaSolicitantes . ("INSERT INTO ReservaDocentes(codDocente, codReserva, creador) VALUES ('$codDocente','$idRerserva','si');");
                $n++; 
            }else{
                $codDocente = $value["codigoSis"];
                $consultaSolicitantes =  $consultaSolicitantes . ("INSERT INTO ReservaDocentes(codDocente, codReserva, creador) VALUES ('$codDocente','$idRerserva','no');");
                $n++;
            }
        }
        $ambientes = $_POST['ambientes'];
        foreach ($ambientes as $key => $value) {
            $codAmbiente = $value["codigoAmbiente"];
            $consultaAmbientes =$consultaAmbientes . ("INSERT INTO RerservaAmbientes(codReserva, codAmbiente) VALUES ('$idRerserva','$codAmbiente');");
        }
        $grupos = $_POST['grupos'];
        foreach ($grupos as $key => $value) {
            $codGrupo = $value["codigoGrupo"];
            $consultaGrupos = $consultaGrupos . ("INSERT INTO ReservaGrupo(codGrupo, codMateria, codReserva) VALUES ('$codGrupo','$codMateria','$idRerserva');");
        }
        $con -> exec($consultaSolicitantes . $consultaAmbientes . $consultaGrupos );
    }
      
    
    if ($respuesta > 0) {
        echo '1';
    }else{
        echo '0';
    }

}
   

?>