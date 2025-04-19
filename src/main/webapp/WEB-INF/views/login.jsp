<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<body>
<div class="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <%@ include file="includes/preloader.jspf" %>
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- Login box.scss -->
    <!-- ============================================================== -->
    <!--style="background:url(/static/web/assets/images/big/auth-bg.jpg) no-repeat center center;"-->
    <div class="auth-wrapper d-flex no-block justify-content-center align-items-center">
        <div class="auth-box">
            <div class="logo">
                <span class="db"><img src="/static/web/assets/images/0_logo/positiva_logo.png" height="80%" width="80%" alt="Kenpis"/></span>
                <br><br><br>
               <h1 class="font-medium m-b-10">Quipolicy Analyzer</h1>
                <h3 class="font-10 m-b-5">SISTEMA AUTOMATIZADO DE COMPARACION DE POLIZAS</h3>
            </div>
            <!-- Form -->
            <div class="row">
                <div class="col-12">
                    <form class="form-horizontal m-t-20" action="login" method="post">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="ti-user"></i></span>
                            </div>
                            <input type="text" class="form-control form-control-lg" placeholder="USUARIO" aria-label="Username" aria-describedby="basic-addon1" id="username" name="username" value="quipolicy" >
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon2"><i class="ti-pencil"></i></span>
                            </div>
                            <!--<input type="password" class="form-control form-control-lg" placeholder="CONTRASEÑA" aria-label="Password" aria-describedby="basic-addon1" id="password" name="password">-->
                            <input type="password" class="form-control form-control-lg" placeholder="CONTRASEÑA" aria-label="Password" aria-describedby="basic-addon1" id="password" name="password" value="Lima1234..">
                        </div>
                        <!--
                        <div class="form-group row">
                            <div class="col-md-12">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                                    <label class="custom-control-label" for="customCheck1">Remember me</label>
                                    <a href="javascript:void(0)" id="to-recover" class="text-dark float-right"><i class="fa fa-lock m-r-5"></i> Forgot pwd?</a>
                                </div>
                            </div>
                        </div>-->
                        <div class="form-group text-center">
                            <div class="col-xs-12 p-b-20">
                                <!--<a class="btn btn-block btn-lg btn-info" href="index" >Ingresar</a>-->
                                <button class="btn btn-block btn-lg btn-info" type="submit">Ingresar</button>
                            </div>
                        </div>
                        <!--
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                                <div class="social">
                                    <a href="javascript:void(0)" class="btn  btn-facebook" data-toggle="tooltip" title="" data-original-title="Login with Facebook"> <i aria-hidden="true" class="fab  fa-facebook"></i> </a>
                                    <a href="javascript:void(0)" class="btn btn-googleplus" data-toggle="tooltip" title="" data-original-title="Login with Google"> <i aria-hidden="true" class="fab  fa-google-plus"></i> </a>
                                </div>
                            </div>
                        </div>
                        <div class="form-group m-b-0 m-t-10">
                            <div class="col-sm-12 text-center">
                                Don't have an account? <a href="authentication-register1.html" class="text-info m-l-5"><b>Sign Up</b></a>
                            </div>
                        </div>
                        -->
                    </form>
                </div>
            </div>

            <!-- MODAL EMERGENTE PARA USUARIO QUE PERTENECEN A EMPRESA INACTIVA-->

            <div class="modal fade" id="empresaInactivaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${mensajeError}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--
            <div id="recoverform">
                <div class="logo">
                    <span class="db"><img src="../../assets/images/logo-icon.png" alt="logo" /></span>
                    <h5 class="font-medium m-b-20">Recover Password</h5>
                    <span>Enter your Email and instructions will be sent to you!</span>
                </div>
                <div class="row m-t-20">
                    <form class="col-12" action="index.html">
                        <div class="form-group row">
                            <div class="col-12">
                                <input class="form-control form-control-lg" type="email" required="" placeholder="Username">
                            </div>
                        </div>
                        <div class="row m-t-20">
                            <div class="col-12">
                                <button class="btn btn-block btn-lg btn-danger" type="submit" name="action">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            -->
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
</div>
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