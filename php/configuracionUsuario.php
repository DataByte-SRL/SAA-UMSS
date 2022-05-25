<?php

  session_start();

  include ('conectar.php');

  $usuario = $_SESSION['nombre'];
  if(!isset($_SESSION['cuenta'])){
    header('location:index.php');
  }
  $con=conectar();
  $consulta = "SELECT * FROM Docente WHERE nombre = '$usuario'";
  $ejecuta = $con->query($consulta);
  $extraer = $ejecuta->fetch_assoc();
  
  $unir = "SELECT d.nombre, d.apellido, d.ci, d.codigoSis, d.telefono, d.celular, d.correo, d.codFacultad, f.codFacultad, f.nombre FROM Docente d INNER JOIN Facultad f ON d.codFacultad = f.codFacultad WHERE d.nombre = '$usuario'";
  $verificar = $con->query($unir);
  $separar = $verificar->fetch_array();

?>
<!DOCTYPE html>
<html lang="en">
<container>
 	<br>
	<div class="overlay-form-a">
      <div class="row">
      <form method="post" id="perfil">
        <div class="form-a" >

          <div class="panel panel-success"><br>
              <h1 class="panel-title"><center><font size="6"><i class='glyphicon glyphicon-user'></i>Configuración de usuario</font></center></h2>

            <div class="panel-body">
              <div class="row">
                <div class=" col-md-9 col-lg-9 "> 
                <h2>Configuracion del perfil</h1>
                <table class="table table-condensed">
                    <tbody>
                      <tr>
                        <td class='col-md-3'>Nombre(s):</td>
                        <td><input type="text" class="form-control input-sm" name="nombre" value="<?php echo $extraer['nombre'];?>" ></td>
                      </tr>
                      <tr>
                        <td>Apellido(S):</td>
                        <td><input type="text" class="form-control input-sm" name="apellido" value="<?php echo $extraer['apellido'];?>" ></td>
                      </tr>
                      <tr>
                        <td>Facultad:</td>
                        <td><input type="text" class="form-control input-sm" name="facultad" value="<?php echo $separar['nombre'];?>" ></td>
                      </tr>
					            <tr>
                        <td>CI:</td>
                        <td><input type="text" class="form-control input-sm" required name="ci" value="<?php echo $extraer['ci'];?>"></td>
                      </tr>

                      <tr>
                        <p>CodigoSIS:<?php echo $extraer['codigoSis']; ?></p>
                      </tr>
                    </tbody>
                </table>
                <h2>Cambiar Contraseña</h1>
                <table class="table table-condensed">
                    <tbody>
                      <tr>
                        <td class='col-md-3'>Contraseña Actual:</td>
                        <td><input type="text" class="form-control input-sm" name=""></td>
                      </tr>
                      <tr>
                        <td>Nueva Contraseña:</td>
                        <td><input type="text" class="form-control input-sm" name=""></td>
                      </tr>
                      <tr>
                        <td>Repetir Contraseña:</td>
                        <td><input type="text" class="form-control input-sm" name=""></td>
                      </tr>
					  
                    </tbody>
                </table>
                    
                <h2>Cambiar Datos de Contacto</h1>
                <table class="table table-condensed">
                    <tbody>
					            <tr>
                        <td>Telefono:</td>
                        <td><input type="text" class="form-control input-sm" name="telefono" value="<?php echo $extraer['telefono'];?>"></td>
                      </tr>
					             <tr>
                        <td>Celular:</td>
                        <td><input type="text" class="form-control input-sm" name="celular" value="<?php echo $extraer['celular'];?>"></td>
                      </tr>
					            <tr>
                        <td>Correo:</td>
                        <td><input type="email" class="form-control input-sm" name="correo" value="<?php echo $extraer['correo'];?>"></td>
                      </tr>
					  
                   
                        
                     
                    </tbody>
                </table>
                  
                  
            </div>
			</div>
            </div>
                <div class="seccion-botones-form-a">
                    <button type="submit" class="btn btn-sm btn-success"><i class="glyphicon glyphicon-refresh"></i> Actualizar</button>
                    <input type="button" name="Cancelar" value="Cancelar" onClick="location.href='../reservas-docente.php'"> 
                </div>
            </div>
        </div>
		</form>
      </div>

  </body>
</container>
</html>