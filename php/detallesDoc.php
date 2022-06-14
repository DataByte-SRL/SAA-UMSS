<?php
include_once("conectar.php");
$con=conectar();
session_start();
$sis=$_SESSION['codigoSis'];

if($_POST){
   $index = $_POST['index'];
   $dbquery=mysqli_query($con,"SELECT DISTINCT Reserva.fechaRerserva AS fechaReserva, Ambiente.codAmbiente as ambiente, Reserva.horaInicio as horaInicio, Reserva.horaFin as horaFin, Reserva.emergencia as emergencia, Materia.nombre as materia, Grupo.codGrupo as grupo FROM Reserva,ReservaGrupo,Materia,Ambiente,RerservaAmbientes,Grupo,Docente WHERE Reserva.codReserva=ReservaGrupo.codReserva and Reserva.codReserva=RerservaAmbientes.codReserva and Docente.codigoSis=Grupo.codDocente and Grupo.codGrupo=ReservaGrupo.codGrupo and ReservaGrupo.codMateria=Materia.codMateria and Ambiente.codAmbiente=RerservaAmbientes.codAmbiente and Docente.codigoSis='$sis'");
    $respuesta= array();
    while($res=mysqli_fetch_array($dbquery)){
        $respuesta[] = array("fechaReserva"=>$res['fechaReserva'], "ambiente"=>$res['ambiente'],"horaInicio"=>$res['horaInicio'],"horaFin"=>$res['horaFin'],"emergencia"=>$res['emergencia'],"materia"=>$res['materia'],"grupo"=>$res['grupo'],);
    };
    $datos=$respuesta[$index];
    

    $fechaReserva=$datos['fechaReserva'];
    $ambiente=$datos['ambiente'];
    $horaInicio=$datos['horaInicio'];
    $horaFin=$datos['horaFin'];
    $materia=$datos['materia'];
    $grupo=$datos['grupo'];

    
    echo json_encode($fechaReserva);
   
}

?>