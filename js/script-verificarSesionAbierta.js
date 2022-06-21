document.querySelector("body").addEventListener("click",e =>{
    $.post("./php/datosUsuario.php","",function (respuesta){
        var res = JSON.parse(respuesta);
        if (res.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡La sesión se ha cerrado!',
                timer: 4000
            }).then((result) => {
                location.reload();
             });
            
        }

    });
});