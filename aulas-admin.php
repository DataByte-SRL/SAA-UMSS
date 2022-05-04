
<?php //esto se ocupa de ver si hay una sesion activa y si no redirecciona a que inicie sesion
    session_start();
    if(!isset($_SESSION['cuenta'])){
        header('location:index.php');
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>SAA-UMSS</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=New+Rocker&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="icon" href="https://www.umss.edu.bo/wp-content/uploads/2021/07/cropped-Logo7-32x32.png">
  
    <!-- <link rel='stylesheet' href='css/styles-index.css'> -->
    <link rel='stylesheet' href='css/styles-index.css'>
    <link rel='stylesheet' href='css/styles-aulas-admin.css'>
    <link rel='stylesheet' href='css/styles-repetitivos.css'>
    
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand me-auto" href="index.php">SAA-UMSS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item ">
                            <a class="nav-link  text-center active" aria-current="page" href="aulas-admin.php">Aulas</a>
                        </li>
                        <li class="nav-item text-center ">
                            <a class="nav-link text-center" href="docentes-admin.php">Docentes</a>
                        </li>
                        <li class="nav-item   text-center">
                            <a class="nav-link" href="reservas-admin.php">Reservas</a>
                        </li>
                        <li class="nav-item  text-center">
                            <a class="nav-link " href="index.php">Iniciar Sesion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main class="contenido-main">
        <h1 class="titulo-encabezado-a">Administracion de Aulas</h1>

        <div class="herramientas-encabezado-a">
            <div class="buscador-encabezado-a">
                <input type="text" class="encabezado-input-buscar" placeholder="Buscar coincidencias">
                <button class="btn-input-bucar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                    Buscar
                </button>
            </div>

            <div class="filtro-encabezado-a">
            </div>

            <button class="btn-encabezado-a">Nueva Aula</button>     
        </div>

        <div class="seccion-tabla">
            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Facultad</th>
                        <th>Codigo Aula</th>
                        <th>Destalles</th>
                        <th>Capacidad</th>
                        <th>Proyector</th>
                    </tr>
                </thead>
                <tbody id="tbody-lista-docentes">
                   
                </tbody>
               
            </table>

            <div class="seccion-loader  ">
                <div class="contenedor-loader">
                    <div class="loader ">
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
            </div>

            

        </div>

    </main>


    
    <footer>
        <p class="fila-1">DERECHOS RESERVADOS © 2022 · UNIVERSIDAD MAYOR DE SAN SIMÓN</p>
        <p class="fila-2">Siguenos en:</p>
        <div class="fila-3 enlaces">
            <a href="https://www.instagram.com/umssboloficial/" class="instagram" target = “_blank ” >
                <img src="img/logo-instagram.svg" height="22">
            </a>
            <a href="https://twitter.com/UmssBolOficial" class="twitter" target = “_blank ” >
                <img src="img/logo-twiter.svg" height="22">
            </a>
            <a href="https://www.facebook.com/UmssBolOficial/" class="facebook" target = “_blank ” >
                <img src="img/logo-facebook.svg" height="22">
            </a>
            <a href="https://t.me/GrupoUmssBolOficial" class="telegram" target = “_blank ” > 
                <img src="img/logo-telegram.svg" height="22">
            </a>
            
        </div>
        <p class="fila-4">Diseñado por<span class="empresa-disenadora"> DataByte S.R.L</span></p>
        

    </footer>



    <div class="overlay-form-a">
        <div class="form-a ">
            <h1 class="titulo-form-a ">FORMULARIO NUEVA AULA</h1>
            <form action="" id="formulario-nueva-aula">
                <div class="seccion-input-form-a   input-facultad">
                    <label  >Facultad:</label>
                    <select name="facultad" id="facultad" >
                        <option value="0" disabled selected>Seleccionar una Facultad</option>
                        <option value="1">Ciencias agricolas y Pecuarias</option>
                        <option value="2">CS.Bioquimicas</option>
                        <option value="3">Ciencias Económicas</option>
                        <option value="4">Desarrollo Rural</option>
                        <option value="5">Odontologia</option>
                        <option value="6">Medicina</option>
                        <option value="7">Arquitectura</option>
                        <option value="8">Humanidades</option>
                        <option value="9">Ciencias Juridicas</option>
                        <option value="10">Ciencias y Tecnologia</option>
                        <option value="11">Ciencias Sociales</option>
                        <option value="12">Ciencias Veterinarias</option>
                        <option value="13">Enfermeria</option>
                    </select>
                    <div class="mensaje-error-form-a seccion-advertencia-facultad ">
                        <div class="img-advertencia  oculto"></div>
                        <p class="mensaje-error oculto"> </p>
                    </div>
                </div>
                <div class="seccion-input-form-a  input-nombre">
                    <label>Codigo Aula:</label>
                    <input name="nombre" id="nombre"  spellcheck="false" type="text" placeholder="(Campo Obligatorio))" maxlength="20">
                    <div class="mensaje-error-form-a seccion-advertencia-nombre ">
                        <div class="img-advertencia  oculto"></div>
                        <p class="mensaje-error oculto"> </p>
                    </div>
                </div>

                <div class="seccion-input-form-a  input-detalles">
                    <label>Detalles:</label>
                    <input name="detalles" id="detalles" spellcheck="false" type="text" placeholder="(Campo Opcional)" maxlength="100">
                    <div class="mensaje-error-form-a seccion-advertencia-detalles ">
                        <div class="img-advertencia  oculto"></div>
                        <p class="mensaje-error oculto"> </p>
                    </div>
                </div>
                
                <div class="seccion-input-form-a  input-capacidad">
                    <label>Capacidad:</label>
                    <input name="capacidad"  id="capacidad"  spellcheck="false" type="number" placeholder="(Campo Obligatorio))">
                    <div class="mensaje-error-form-a seccion-advertencia-capacidad ">
                        <div class="img-advertencia  oculto"></div>
                        <p class="mensaje-error oculto"> </p>
                    </div>
                </div>

            

                <div class="seccion-input-form-a  input-proyector">
                    <label>Proyector:</label>
                    <div class="lista-radiobtns">
                        <div class="radiobtn">
                            <input type="radio" id="si"  value="si"  name="proyector"  >
                            <label for="si">si</label>
                        </div>
                        <div class="radiobtn">
                            <input type="radio" id="no"  value="no" name="proyector"  checked>
                            <label for="no">no</label>

                        </div>
                    </div>
                    <div class="mensaje-error-form-a seccion-advertencia-proyector ">
                        <div class="img-advertencia  oculto"></div>
                        <p class="mensaje-error oculto"> </p>
                    </div>
                </div>    
            </form>

            <div class="seccion-botones-form-a">
                <button class="btn-formulario btn-cancelar">cancelar</button>
                <button class="btn-formulario btn-aceptar">aceptar</button>
            </div>                                                                                             
        </div>
    </div>
    

    <script   src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/script-aulas-admin.js"></script>

    
</body>
</html>

