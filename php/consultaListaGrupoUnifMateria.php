<?php 
include_once("conectar.php");

$conexion =conectar();


$consulta=
"
SELECT G.codGrupo , M.codMateria , M.nombre,G.codDocente AS CodigoDocente ,concat (D.nombre,' ', D.apellido)as NombreDocente ,G.estudiantes , 
CASE WHEN (concat(H.dia,' ',H.horaInicio, ' - ', H.horaFin ) ) IS NULL THEN 'Sin Horarios'
ELSE (concat(H.dia,' ',H.horaInicio, ' - ', H.horaFin ) ) 
END AS Horario 
FROM (Grupo G LEFT JOIN Horario H ON G.codGrupo = H.codGrupo AND G.codMateria = H.codMateria) ,Materia M ,Docente D WHERE M.codMateria = G.codMateria AND G.codDocente = D.codigoSis ORDER BY M.codMateria , G.codGrupo;"
;
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>