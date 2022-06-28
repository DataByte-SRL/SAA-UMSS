<?php 
include_once("conectar.php");

$conexion =conectar();


$consulta="SELECT 
g.`codGrupo`,
m.`codMateria`,
m.`nombre`,
d.`codigoSis` AS CodigoDocente,
CONCAT(d.`nombre`,' ',d.`apellido`) AS NombreDocente,
g.`estudiantes`,
CONCAT(h.`dia`,' ',h.`horaInicio`,' - ',h.`horaFin`) AS Horario 
FROM 
`Grupo` AS g, 
`Materia` AS m,
`Docente` AS d,
`Horario` AS h 
WHERE 
g.`codMateria` = m.`codMateria` AND g.`codDocente` = d.`codigoSis` AND h.`codGrupo` = g.`codGrupo` AND h.`codMateria` = g.`codMateria`;";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>