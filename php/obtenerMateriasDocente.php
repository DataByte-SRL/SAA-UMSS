<?php

include_once("conectar.php");
    $con=conectar2();
    session_start();
// la varible post tendra esta estructura  {codigoSis:"" , nombre:""} 

if ($_POST) {    
    $codigo=$_SESSION['codigoSis'];
    $dbquery=mysqli_query ($con,"SELECT MATERIA.NOMBREMATERIA,DICTA.CODMATERIA FROM DICTA, MATERIA, DOCENTE WHERE DICTA.CODMATERIA=MATERIA.CODMATERIA AND DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DOCENTE.CODSISDOC='$codigo'");
    
    $miArray= array( );
    while($resultado= mysqli_fetch_array($dbquery)){
    $miArray[] = array("codigo"=>$resultado['CODMATERIA'], "nombre"=>$resultado['NOMBREMATERIA']);
   
   };
   echo(json_encode($miArray));    
}

/*
// la varible post tendra esta estructura  {codigoSis:"" , nombre:""} 
if ($_POST) {    
    echo ('[{"codigo":"228555","nombre":"Elementos de programacion"},{"codigo":"1231231","nombre":"Caliddad de software"}]');
}

*/
?>