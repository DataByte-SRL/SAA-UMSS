<?php


session_start();
include_once('conectar.php');
$con=conectar2();
$usuario=$_SESSION['codigoSis'];


if ($_POST) {   
  $materia=$_POST['codMateria'];
    $dbquery=mysqli_query($con,"SELECT DOCENTE.CODSISDOC, DOCENTE.NOMBREDOC from DOCENTE, MATERIA, DICTA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC and DICTA.CODMATERIA=MATERIA.CODMATERIA and DICTA.CODMATERIA=$materia and DOCENTE.CODSISDOC NOT IN(SELECT DOCENTE.CODSISDOC from DOCENTE WHERE CODSISDOC='$usuario');");
    $miArray= array( );
    while($resultado= mysqli_fetch_array($dbquery)){
    $miArray[] = array("codigoSis"=>$resultado['CODSISDOC'], "nombre"=>$resultado['NOMBREDOC']);
   
   };
   echo(json_encode($miArray));    
    
   
}
// la variable port tendra esta estructura {codigoSolicitante:"", codMateria : ""};

/*

if ($_POST) {    
    echo ('[{"codigoSis":"11111111","nombre":"Jose  alfredo tapia quientetos"},{"codigoSis":"1231231","nombre":"Pedro Alvares Cadima Tapia"}]');
}
*/

?>