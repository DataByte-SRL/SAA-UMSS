<?php 
  include_once ("conectar.php");

  if(isset ($_GET ['cerrar_session'])){
    session_unset();
    session_destroy();
  }
  if($_POST){
      if(isset($_SESSION['cuenta'])){
        $codFacultad = $_POST['codFacultad'];
            $codAula = $_POST['codAula'];
            $detalles = $_POST['detalles'];
            $capacidad= $_POST['capacidad'];
            $proyector= $_POST['proyector'];

            $con=conectar();
            $dbquery= mysqli_query($con,"insert into `Aula`(`codFacultad`, `codAula`, `detalles`, `capacidad`, `proyector`) VALUES ('$codFacultad','$codAula','$detalles','$capacidad','$proyector')");
            mysqli_close($con);
      }else{
        header('location:index.php');
      }
  }


/*if($_POST){
  
  $servidor = "mysql-andre.alwaysdata.net";
  $usuario="andre";
  $contrasena="cualquiera";
  $BD="andre_base_datos";*/
  
   

  /*try {
    $conexionPDO = new PDO("mysql:host=$servidor;dbname=$BD",$usuario,$contrasena);
    $conexionPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    
    
    $consulta = "insert into `Aula`(`codFacultad`, `codAula`, `detalles`, `capacidad`, `proyector`) VALUES ('$codFacultad','$codAula','$detalles','$capacidad','$proyector')";
    
    $respuesta = "";
      $respuesta = $conexionPDO->exec($consulta);
      mysqli_close($conexion);
      echo "1";
  } catch (PDOException $e) {
      echo($e->getMessage());
  }

}
function agregarAula($condFacultad, $codAula, $detalles, $capacidad, $proyector){
  conectar();
  $consulta = "insert into `Aula`(`codFacultad`, `codAula`, `detalles`, `capacidad`, `proyector`) VALUES ('$codFacultad','$codAula','$detalles','$capacidad','$proyector')";
  if($conexion->query($consulta)){
    echo"se creo aula correctamente";
  }else{
    echo "error al crear aula";
  }
  mysqli_close($conexion);
}*/


?>