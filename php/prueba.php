<?php 


include_once ("conectar.php");




$con = conectar();

$consultaReservas = mysqli_query($con,"SELECT R.codReserva, R.asunto, R.codMateria, M.nombre as nombreMateria, R.fechaRerserva, R.fechaCreacion, R.horaInicio, R.horaFin, R.comentario, R.emergencia, R.motivoEmergencia 
                                       FROM  Reserva R, Materia M
                                       WHERE R.codMateria = M.codMateria 
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



function obtenerAmbientes($codReserva){
    global $ambientes;
    $res = "";
    foreach ($ambientes as $key => $value) {
         if ($value['codReserva'] == $codReserva ) {
             $res = $res ." [ ". $value['codAmbiente'] . " ]"  ;
         }
    }
    return $res;
}

function obtenerDocentes($codReserva){
    global $docentes;
    $res = "";
    foreach ($docentes as $key => $value) {
         if ($value['codReserva'] == $codReserva ) {
             $res = $res ." [ ". $value['nombreDocente'] . " ]" ;
         }
    }
    return $res;
}

function obtenerGrupos($codReserva){
    global $grupos;
    $res = "";
    foreach ($grupos as $key => $value) {
         if ($value['codReserva'] == $codReserva ) {
             $res = $res ." [ ". $value['codGrupo'] . " ]"  ;
         }
    }
    return $res;
}


?>



<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>SAA-UMSS</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  

</head>
<body>
    <table class="table">
        <thead>
            <tr>
                <th>CodigoReserva</th>
                <th>Solicitantes</th>
                <th>Grupos</th>
                <th>Ambientes</th>
                <th>Asunto</th>
                <th>Materia</th>
                <th>Fecha Creacion</th>
                <th>Fecha Reserva</th>
                <th>Periodo</th>
                <th>Comentario</th>
                <th>Emergencia</th>
                <th>MotivoEmergencia</th>
            </tr>
        </thead>
        <tbody>
            <?php 
               
               foreach ($reservas as $key => $value) {
                    $auxSolicitantes = obtenerDocentes($value['codReserva']);
                    $auxAmbientes= obtenerAmbientes($value['codReserva']);
                    $auxGrupos = obtenerGrupos($value['codReserva']);

                    $CodigoReserva = $value['codReserva'];
                    $Asunto = $value['asunto'];
                    $Materia = $value['nombreMateria'];
                    $FechaCreacion = $value['fechaCreacion'];
                    $FechaReserva = $value['fechaRerserva'];
                    $Periodo = $value['horaInicio'] . " - " . $value['horaFin'];
                    $Comentario = $value['comentario'];
                    $Emergencia = $value['emergencia'];
                    $MotivoEmergencia = $value['motivoEmergencia'];
                    echo ( "
                        <tr>
                            <td scope='row'>$CodigoReserva</td>
                            <td> $auxSolicitantes</td>
                            <td>$auxGrupos</td>
                            <td>$auxAmbientes</td>
                            <td>$Asunto</td>
                            <td>$Materia</td>
                            <td>$FechaCreacion</td>
                            <td>$FechaReserva</td>
                            <td>$Periodo</td>
                            <td>$Comentario</td>
                            <td>$Emergencia</td>
                            <td>$MotivoEmergencia</td>
                        </tr>
                    
                    ");
                }
            ?>
        </tbody>
    </table>


    <script   src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    
    

</body>
</html>