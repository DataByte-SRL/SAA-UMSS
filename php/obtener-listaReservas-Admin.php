<?php
    include("conectar.php");
    $con=conectar();
    /*$dbquery=mysqli_query($con,"SELECT DISTINCT Reserva.fechaRerserva AS fechaReserva , Ambiente.codAmbiente AS ambiente, Docente.nombre AS nombreDoc, Docente.apellido AS apellidoDoc, Reserva.horaInicio AS horaInicio, Reserva.horaFin AS horaFin, Reserva.emergencia AS emergencia, Materia.nombre AS materia, Grupo.codGrupo AS grupo, TipoAmbiente.nombre AS tipoAmbiente FROM Reserva,ReservaDocentes,Materia,Ambiente,RerservaAmbientes,Grupo,Docente, ReservaGrupo, TipoAmbiente WHERE Reserva.codReserva=RerservaAmbientes.codReserva and Docente.codigoSis = ReservaDocentes.codDocente and Grupo.codGrupo=ReservaGrupo.codGrupo and Reserva.codMateria=Materia.codMateria and Ambiente.codAmbiente=RerservaAmbientes.codAmbiente and Reserva.codReserva=ReservaDocentes.codReserva and Docente.codigoSis=Grupo.codDocente and TipoAmbiente.codTipoAmbiente=Ambiente.codTipoAmbiente;");
    $respuesta= array();
    while($res=mysqli_fetch_array($dbquery)){
        $respuesta[] = array("fechaReserva"=>$res['fechaReserva'], "ambiente"=>$res['ambiente'],"nombreDoc"=>$res['nombreDoc'],"apellidoDoc"=>$res['apellidoDoc'],"horaInicio"=>$res['horaInicio'],"horaFin"=>$res['horaFin'],"emergencia"=>$res['emergencia'],"materia"=>$res['materia'],"grupo"=>$res['grupo'],"tipoAmbiente"=>$res['tipoAmbiente'],);
    };
    echo json_encode($respuesta);
    */
  
if($_POST){
    
    $dbquery=mysqli_query($con,"SELECT DISTINCT Reserva.fechaRerserva AS fechaReserva , Ambiente.codAmbiente AS ambiente, Docente.nombre AS nombreDoc, Docente.apellido AS apellidoDoc, Reserva.horaInicio AS horaInicio, Reserva.horaFin AS horaFin, Reserva.emergencia AS emergencia, Materia.nombre AS materia, Grupo.codGrupo AS grupo, TipoAmbiente.nombre AS tipoAmbiente FROM Reserva,ReservaDocentes,Materia,Ambiente,RerservaAmbientes,Grupo,Docente, ReservaGrupo, TipoAmbiente WHERE Reserva.codReserva=RerservaAmbientes.codReserva and Docente.codigoSis = ReservaDocentes.codDocente and Grupo.codGrupo=ReservaGrupo.codGrupo and Reserva.codMateria=Materia.codMateria and Ambiente.codAmbiente=RerservaAmbientes.codAmbiente and Reserva.codReserva=ReservaDocentes.codReserva and Docente.codigoSis=Grupo.codDocente and TipoAmbiente.codTipoAmbiente=Ambiente.codTipoAmbiente;");
    $respuesta= array();
    while($res=mysqli_fetch_array($dbquery)){
        $respuesta[] = array("fechaReserva"=>$res['fechaReserva'], "ambiente"=>$res['ambiente'],"nombreDoc"=>$res['nombreDoc'],"apellidoDoc"=>$res['apellidoDoc'],"horaInicio"=>$res['horaInicio'],"horaFin"=>$res['horaFin'],"emergencia"=>$res['emergencia'],"materia"=>$res['materia'],"grupo"=>$res['grupo'],"tipoAmbiente"=>$res['tipoAmbiente'],);
    };
    
    echo json_encode($respuesta);
}


?>