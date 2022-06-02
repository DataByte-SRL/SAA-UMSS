


<?php
include_once ('conectar.php');
$con=conectar();

// la varible post tendra esta estructura {solicitantes, materia}

// estructura de los arreglos dentro de  "solicitantes" {codigo:"",nombre:""}
// estructura de los arreglos dentro de  "materia" {codigoSis:"",nombre:""}

if ($_POST) {  
    $solicitante = ($_POST['solicitantes']);
    $materia = ($_POST['codMat']);
    $cantsolicitante=sizeof($solicitante);
    //echo json_encode( $materia);
    switch($cantsolicitante){
        case 1:
            $soli1=$solicitante[0];
            $codsol1=$soli1['codigoSis'];
            $dbquery=mysqli_query($con,"select DICTA.NOMBREGRUPO, DOCENTE.NOMBREDOC, DICTA.ALUMNOSINSCRITOS FROM DICTA, DOCENTE, MATERIA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DICTA.CODMATERIA=MATERIA.CODMATERIA AND MATERIA.CODMATERIA='$materia' AND (DOCENTE.CODSISDOC= '$codsol1');");
            $respuesta= array( );
            while($resultado= mysqli_fetch_array($dbquery)){
                $respuesta[] = array("codigoGrupo"=>$resultado['NOMBREGRUPO'], "docente"=>$resultado['NOMBREDOC'], "cantidad"=>$resultado['ALUMNOSINSCRITOS']);
                
            };
            echo(json_encode($respuesta));
            break;
        case "2":
            $soli1=$solicitante[0];
            $soli2=$solicitante[1];
            $codsol1=$soli1['codigoSis'];
            $codsol2=$soli2['codigoSis'];
            $dbquery=mysqli_query($con,"select DICTA.NOMBREGRUPO, DOCENTE.NOMBREDOC, DICTA.ALUMNOSINSCRITOS FROM DICTA, DOCENTE, MATERIA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DICTA.CODMATERIA=MATERIA.CODMATERIA AND MATERIA.CODMATERIA='$materia' AND (DOCENTE.CODSISDOC= '$codsol1' or DOCENTE.CODSISDOC= '$codsol2' );");
            $respuesta= array( );
            while($resultado= mysqli_fetch_array($dbquery)){
                $respuesta[] = array("codigoGrupo"=>$resultado['NOMBREGRUPO'], "docente"=>$resultado['NOMBREDOC'], "cantidad"=>$resultado['ALUMNOSINSCRITOS']);
                
            };
            echo(json_encode($respuesta));
            break;
        case "3":
            $soli1=$solicitante[0];
            $soli2=$solicitante[1];
            $soli3=$solicitante[2];
            $codsol1=$soli1['codigoSis'];
            $codsol2=$soli2['codigoSis'];
            $codsol3=$soli3['codigoSis'];
            $dbquery=mysqli_query($con,"select DICTA.NOMBREGRUPO, DOCENTE.NOMBREDOC, DICTA.ALUMNOSINSCRITOS FROM DICTA, DOCENTE, MATERIA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DICTA.CODMATERIA=MATERIA.CODMATERIA AND MATERIA.CODMATERIA='$materia' AND (DOCENTE.CODSISDOC= '$codsol1' or DOCENTE.CODSISDOC= '$codsol2' or DOCENTE.CODSISDOC= '$codsol3');");
            $respuesta= array( );
            while($resultado= mysqli_fetch_array($dbquery)){
                $respuesta[] = array("codigoGrupo"=>$resultado['NOMBREGRUPO'], "docente"=>$resultado['NOMBREDOC'], "cantidad"=>$resultado['ALUMNOSINSCRITOS']);
                
            };
            echo(json_encode($respuesta));
            break;
    }
    
   
    /*
    $dbquery=mysqli_query($con,"select DICTA.NOMBREGRUPO, DOCENTE.NOMBREDOC, DICTA.ALUMNOSINSCRITOS FROM DICTA, DOCENTE, MATERIA WHERE DOCENTE.CODSISDOC=DICTA.CODSISDOC AND DICTA.CODMATERIA=MATERIA.CODMATERIA AND MATERIA.CODMATERIA='123' AND (DOCENTE.CODSISDOC= '201304123' or DOCENTE.CODSISDOC= '201117471' or DOCENTE.CODSISDOC = '201038874');");
    $respuesta= array( );
    while($resultado= mysqli_fetch_array($dbquery)){
        $respuesta[] = array("codigoGrupo"=>$resultado['NOMBREGRUPO'], "nombre"=>$resultado['NOMBREDOC']);
   
   };
   echo(json_encode($respuesta));
    //echo ('[{"codigoGrupo":"1","docente":"andre carpio","cantidad":"50"},{"codigoGrupo":"A1","docente":"jose miguel","cantidad":"20"},{"codigoGrupo":"2","docente":"pedro flos","cantidad":"30"}]');
    */
};

?>