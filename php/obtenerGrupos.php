<?php

// la varible post tendra esta estructura {solicitantes, materia}

// estructura de los arreglos dentro de  "solicitantes" {codigoSis:"",nombre:""}
// estructura de los arreglos dentro de  "materia" {codigo:"",nombre:""}
if ($_POST) {    
    echo ('[{"codigoGrupo":"1","docente":"andre carpio","cantidad":"50"},{"codigoGrupo":"A1","docente":"jose miguel","cantidad":"20"},{"codigoGrupo":"2","docente":"pedro flos","cantidad":"30"}]');
}


?>