<?php
    include_once("conectar.php");
    $con=conectar();
       
    if($_POST){
       $index = $_POST['index'];
       $dbquery=mysqli_query($con,"SELECT DISTINCT Docente.codigoSis ,Reserva.fechaRerserva AS fechaReserva , Ambiente.codAmbiente AS ambiente, Docente.nombre AS nombreDoc, Docente.apellido AS apellidoDoc, Reserva.horaInicio AS horaInicio, Reserva.horaFin AS horaFin, Reserva.emergencia AS emergencia, Materia.nombre AS materia, Grupo.codGrupo AS grupo, TipoAmbiente.nombre AS tipoAmbiente FROM Reserva,ReservaDocentes,Materia,Ambiente,RerservaAmbientes,Grupo,Docente, ReservaGrupo, TipoAmbiente WHERE Reserva.codReserva=RerservaAmbientes.codReserva and Docente.codigoSis = ReservaDocentes.codDocente and Grupo.codGrupo=ReservaGrupo.codGrupo and Reserva.codMateria=Materia.codMateria and Ambiente.codAmbiente=RerservaAmbientes.codAmbiente and Reserva.codReserva=ReservaDocentes.codReserva and Docente.codigoSis=Grupo.codDocente and TipoAmbiente.codTipoAmbiente=Ambiente.codTipoAmbiente;");
        $respuesta= array();
        while($res=mysqli_fetch_array($dbquery)){
            $respuesta[] = array("fechaReserva"=>$res['fechaReserva'], "ambiente"=>$res['ambiente'],"nombreDoc"=>$res['nombreDoc'],"apellidoDoc"=>$res['apellidoDoc'],"horaInicio"=>$res['horaInicio'],"horaFin"=>$res['horaFin'],"emergencia"=>$res['emergencia'],"materia"=>$res['materia'],"grupo"=>$res['grupo'],"tipoAmbiente"=>$res['tipoAmbiente'], "codigoSis"=>$res['codigoSis']);
        };
        $datos=$respuesta[$index];
            
        $fechaReserva=$datos['fechaReserva'];
        $ambiente=$datos['ambiente'];
        $codigoSis=$datos['codigoSis'];
        $horaInicio=$datos['horaInicio'];
        $horaFin=$datos['horaFin'];
        $materia=$datos['materia'];
        $grupo=$datos['grupo'];
    
        
        echo json_encode($datos);
       
    }
?>