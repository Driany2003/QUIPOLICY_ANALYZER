<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<body>
<%@ include file="includes/preloader.jspf" %>
<div id="main-wrapper">
    <%@ include file="includes/topbar.jspf" %>
    <%@ include file="includes/left-sidebar.jspf" %>
    <div class="page-wrapper">
        <!--  <div class="page-breadcrumb">
              <div class="row">
                  <div class="col-12 align-self-center">
                      <h4 class="page-title">EMPRESA <span class="label label-rounded label-info">Lista</span></h4>
                  </div>
              </div>
          </div>
          -->
          <div class="container-fluid">
            <div class="card mt-3">
                <div class="container py-5">
                    <div class="row">
                        <!-- Reportes Pendientes (izquierda) -->
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm" style="height: 335px;"> <!-- Altura fija -->
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title mb-2">
                                        <i class="icon-clock"></i> Reportes Pendientes
                                    </h5>
                                    <p class="text-muted small">
                                        Reportes que requieren revisión y aprobación
                                    </p>
                                    <!-- Contenedor Scrollable -->
                                    <div style="overflow-y: auto; flex-grow: 1; padding-right: 5px;">
                                        <ul class="list-group list-group-flush">
                                            <!-- Ya esta listado-->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Reporte de Validación (derecha) -->
                        <div class="col-md-8 mb-4">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h5 class="card-title mb-1">
                                                <i class="icon-file-check"></i> Reporte de Validación
                                            </h5>
                                            <p class="text-muted small mb-0">
                                                Detalles del reporte y opciones de aprobación
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-start">

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Notificación / Resumen del Reporte (afuera del card) -->
                            <div class="alert alert-success mt-3" role="alert">
                                <h5 class="alert-heading mb-2"><i class="icon-check"></i> Resumen del Reporte</h5>
                                <p class="mb-0">
                                    El documento "Acuerdo de Confidencialidad.docx" fue validado exitosamente el 01/04/2024, cumpliendo todos los criterios establecidos. No se encontraron diferencias significativas.
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>


</div>

<footer class="mt-auto bg-light text-center py-3">
    <%@ include file="includes/footer.jspf" %>
</footer>

<!-- customs -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.3/dragula.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<link href="/static/web/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.css" rel="stylesheet">
<link href="/static/web/assets/extra-libs/taskboard/css/lobilist.css" rel="stylesheet">
<link href="/static/web/assets/extra-libs/taskboard/css/jquery-ui.min.css" rel="stylesheet">
<link href="/static/web/assets/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css" rel="stylesheet">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<link href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
<script src="/static/web/dist/js/funciones/consolidar-firma.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- ESTILOS INTERACTIVOS -->
    <style>
    .hover-report {
        background-color: #f8f9fa;
        cursor: pointer;
    }
    .active-report {
        background-color: #e2e6ea;
        border: 1px solid #007bff;
    }
    </style>
    
<!-- import -->
<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>