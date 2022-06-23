<?php 
include_once("conectar.php");

$conexion =conectar();


$consulta="SELECT 
m.codMateria,
m.`nombre`,
CASE 
WHEN (SELECT SUM(g.estudiantes) FROM `Grupo` AS g WHERE g.codMateria = m.`codMateria`) IS NULL THEN 0
ELSE (SELECT SUM(g.estudiantes) FROM `Grupo` AS g WHERE g.codMateria = m.`codMateria`)
END AS estudiantes,
CASE 
WHEN (SELECT COUNT(g.codGrupo) FROM `Grupo` AS g WHERE g.codMateria = m.`codMateria`) IS NULL THEN 0
ELSE (SELECT COUNT(g.codGrupo) FROM `Grupo` AS g WHERE g.codMateria = m.`codMateria`)
END AS cantGrupos
FROM 
`Materia` AS m;";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>