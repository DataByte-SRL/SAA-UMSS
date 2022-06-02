


<?php
include_once ('conectar.php');
$con=conectar();

// la varible post tendra esta estructura {solicitantes, materia}

// estructura de los arreglos dentro de  "solicitantes" {codigo:"",nombre:""}
// estructura de los arreglos dentro de  "materia" {codigoSis:"",nombre:""}

if ($_POST) {    
   // $dbquery=mysqli_query($con,"select DICTA.NOMBREGRUPO, DOCENTE.NOMBREDOC FROM DICTA, DOCENTE, MATERIA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DICTA.CODMATERIA=MATERIA.CODMATERIA AND MATERIA.CODMATERIA=123 AND DOCENTE.CODSISDOC="201304123" || DOCENTE.CODSISDOC="201117471";");
    echo ('[{"codigoGrupo":"1","docente":"andre carpio","cantidad":"50"},{"codigoGrupo":"A1","docente":"jose miguel","cantidad":"20"},{"codigoGrupo":"2","docente":"pedro flos","cantidad":"30"}]');
}


?>