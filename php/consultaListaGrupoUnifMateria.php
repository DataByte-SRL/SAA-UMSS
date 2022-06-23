<?php 
include_once("conectar.php");

$conexion =conectar();


$consulta="SELECT 
g.`codGrupo`,
m.`codMateria`,
m.`nombre`,
g.`estudiantes` 
FROM 
`Grupo` AS g, 
`Materia` AS m 
WHERE 
g.`codMateria` = m.`codMateria`;";
$respuesta= mysqli_query($conexion,$consulta);
$res = mysqli_fetch_all( $respuesta, $resulttype = MYSQLI_ASSOC);

mysqli_close($conexion);

echo   json_encode($res);




?>