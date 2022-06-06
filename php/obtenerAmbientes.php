<?php

// la varible post tendra esta estructura {periodos, fecha}
include_once('conectar.php');
session_start();
// la estructura de  lo arreglos en periodos sera de esta forma  {codigoPeriodo:'',nombre:''}
// la estructura de  fecha sera 

if ($_POST) {   

    $con = conectar();
    
    $fecha = date('Y-m-d',$_POST['fechaReserva']);
    $horaInicio = $_POST['horaInicio'];
    $horaFin = $_POST['horaFin'];
    $codFacultad =$_POST['codFacultad'];
    $codDocente =$_SESSION['codigoSis'];

    $respuesta = mysqli_query($con,"SELECT A.codAmbiente as codigoAmbiente, A.codFacultad, A.detalles, A.proyector, A.capacidad, A.codTipoAmbiente FROM Ambiente A WHERE A.codFacultad = $codFacultad AND A.codAmbiente NOT IN (
        SELECT RA.codAmbiente FROM RerservaAmbientes RA WHERE RA.codReserva IN (
            SELECT R.codReserva FROM Reserva R WHERE R.fechaRerserva = '$fecha'  AND
             (('$horaInicio' BETWEEN horaInicio AND timediff(horaFin, '00:00:01')) OR 
             (timediff('$horaFin','00:00:01') BETWEEN horaInicio AND timediff(horaFin, '00:00:01')) OR
              (horaInicio BETWEEN '$horaInicio' AND timediff('$horaFin','00:00:01')) OR 
              (timediff(horaFin,'00:00:01') BETWEEN '$horaInicio' AND  timediff('$horaFin','00:00:01')))))");

    $res =mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

    echo json_encode($res);

  //  echo ('[{'codigoAmbiente':'618F','capacidad':'100'},{'codigoAmbiente':'618A','capacidad':'50'},{'codigoAmbiente':'617B','capacidad':'150'},{'codigoAmbiente':'618D','capacidad':'250'}]');
}


?>