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
`Grupo` AS g 
LEFT JOIN 
`Materia` AS m 
ON m.`codMateria` = g.`codMateria`
LEFT JOIN `Docente` AS d ON d.`codigoSis` = g.`codDocente`
LEFT JOIN `Horario` AS h ON h.`codGrupo` = g.`codGrupo` ORDER BY g.`codGrupo`,g.`codMateria`;";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>