<?php
    include_once("conectar.php");
    $con=conectar();
    session_start();
// la varible post tendra esta estructura  {codigoSis:"" , nombre:""} 
if ($_POST) {    
    $codigo=$_SESSION['codigoSis'];
    $dbquery=mysqli_querry ($con,"SELECT NOMBREMATERIA,CODMATERIA FROM MATERIA, DOCENTE WHERE DOCENTE.CODSISDOC='$codigo'");
    $resultado= mysqli_fetch_array($dbquery);
    if($resultado!= null){
       //aca falta armar lo que vamos a mostrar
    }
   //echo ('[{"codigo":"228555","nombre":"Elementos de programacion"},{"codigo":"1231231","nombre":"Caliddad de software"}]');
}


?>