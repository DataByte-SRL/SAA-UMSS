<?php 

include_once ("conectar.php");




$con = conectar();


if ($_POST) { 

    $codDocente = $_POST['codigoSis'];
    $consultaReservas = mysqli_query($con,"SELECT R.codReserva, R.asunto, R.codMateria, M.nombre as nombreMateria, R.fechaRerserva, R.fechaCreacion, R.horaInicio, R.horaFin, R.comentario, R.emergencia, R.motivoEmergencia 
                                        FROM  Reserva R, Materia M 
                                        WHERE R.codMateria = M.codMateria   AND (R.codReserva IN (SELECT RD.codReserva FROM ReservaDocentes RD WHERE RD.codDocente = $codDocente))
                                        ORDER BY R.codReserva
                                        DESC
    
                                        ");
    
    $consultaAmbientes = mysqli_query($con,"SELECT RA.codReserva , A.codAmbiente , A.codFacultad , A.detalles , A.proyector ,A.capacidad ,TA.codTipoAmbiente ,TA.nombre as nombreTipoAmbiente
                                            FROM RerservaAmbientes RA , Ambiente A , TipoAmbiente TA
                                            WHERE RA.codAmbiente = A.codAmbiente AND TA.codTipoAmbiente = A.codTipoAmbiente");
    
    $consultaGrupos = mysqli_query($con ,"SELECT RG.codReserva , RG.codGrupo , RG.codMateria , G.estudiantes
                                        FROM ReservaGrupo RG , Grupo G
                                        WHERE  RG.codGrupo = G.codGrupo AND RG.codMateria = G.codMateria");
    
    $consultaDocentes = mysqli_query($con,"SELECT RD.codDocente, RD.codReserva, RD.creador , D.nombre as nombreDocente
                                        FROM ReservaDocentes RD , Docente D
                                        WHERE RD.codDocente = D.codigoSis");
    
    mysqli_close($con);
    
    $reservas = mysqli_fetch_all($consultaReservas, $resulttype = MYSQLI_ASSOC);
    $ambientes = mysqli_fetch_all($consultaAmbientes , $resulttype = MYSQLI_ASSOC);
    $grupos = mysqli_fetch_all($consultaGrupos,$resulttype = MYSQLI_ASSOC);
    $docentes = mysqli_fetch_all($consultaDocentes,$resulttype = MYSQLI_ASSOC);
    
    $res = array("reservas" => $reservas, "ambientes" =>$ambientes,"grupos"=>$grupos,"docentes"=>$docentes);
    
    echo json_encode($res);
}


?>

