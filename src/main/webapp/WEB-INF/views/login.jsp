<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>

<style>

    /* Título principal */
    h4 {
        font-size: 2.0rem; /* Aumentado desde 1.25rem aprox. */
        font-weight: bold;
    }

    /* Mensaje de bienvenida */
    .welcome-text {
        font-size: 1.4rem;
    }

    /* Párrafo de instrucciones */
    .form-container p {
        font-size: 1.2rem;
    }

    /* Etiquetas de los inputs */
    .form-label {
        font-size: 1.2rem;
        font-weight: 500;
    }

    /* Texto del enlace "Olvidé mi contraseña" */
    a.text-danger {
        font-size: 0.95rem;
    }


    html, body {
        height: 100%;
        margin: 0;
    }

    .full-height {
        height: 100vh;
    }

    .image-side {
        background-image: url('/static/web/assets/images/logo_sidebar.png');
        background-size: cover;
        background-position: center;
    }

    .form-side {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .form-container {
        width: 100%;
        max-width: 400px;
    }

    .welcome-text {
        color: #dc3545;
        font-weight: bold;
    }

    .btn-login {
        background-color: #dc3545;
        color: white;
        border-radius: 10px;
    }

    .btn-login:hover {
        background-color: #c82333;
    }

    .form-control {
        border-radius: 10px;
    }

    a.text-danger {
        font-size: 0.9rem;
    }
</style>
<body>



<div class="container-fluid">
    <div class="row full-height">
        <!-- Columna de la imagen -->
        <div class="col-md-6 d-none d-md-block image-side"></div>

        <!-- Columna del formulario -->
        <div class="col-md-6 col-12 form-side">
            <div class="form-container">
                <h4>Inicia sesión</h4>
                <p class="welcome-text">¡Te damos la bienvenida!</p>
                <p>Ingresa tus datos para continuar</p>
                <form>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    </div>
                    <div class="mb-3">
                        <a href="#" class="text-danger">Olvidé mi contraseña</a>
                    </div>
                    <button type="submit" class="btn btn-login w-100">Ingresar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- ============================================================== -->
<!-- Login box.scss -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Page wrapper scss in scafholding.scss -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Page wrapper scss in scafholding.scss -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Right Sidebar -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Right Sidebar -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="/static/web/assets/libs/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap tether Core JavaScript -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<script src="/static/web/assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="/static/web/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- ============================================================== -->
<!-- This page plugin js -->
<!-- ============================================================== -->
<script>
    $('[data-toggle="tooltip"]').tooltip();
    $(".preloader").fadeOut();
    // ==============================================================
    // Login and Recover Password
    // ==============================================================
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
    $(document).ready(function () {
        var mensajeError = "${mensajeError}";
        console.log("Mensaje de error:", mensajeError);
        if (mensajeError) {
            $('#empresaInactivaModal').modal('show');
            setTimeout(function () {
                $('#empresaInactivaModal').modal('hide');
            }, 10000);  // 10 segundos
        }
    });
</script>
</body>

</html>