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

                        <div class="col-md-6 mb-4">
                            <h5>Cargar Documento</h5>
                            <div class="card p-4 text-center">
                                <p>Suba el documento que desea validar contra los documentos de referencia</p>
                                <div class="border p-4 mb-3">
                                    <span class="d-block">Arrastre su documento aquí</span>
                                    <small class="text-muted">Formatos soportados: PDF, DOCX, DOC, TXT (máx. 10MB)</small>
                                    <br>
                                    <button class="btn btn-primary mt-3">Elegir archivo</button>
                                </div>
                                <small class="d-block text-muted">No se ha ...un archivo</small>
                            </div>
                        </div>


                        <div class="col-md-6 mb-4">
                            <h5>Documento de Referencia</h5>
                            <div class="card p-4">
                                <p>Seleccione el documento de referencia para la comparación</p>
                                <select class="form-control mb-3">
                                    <option>Seleccionar documento</option>
                                    <option>Contrato Marco v2.3</option>
                                    <option>Formulario de Registro v1.5</option>
                                    <option>Acuerdo de Confidencialidad v3.0</option>
                                    <option>Política de Privacidad v2.1</option>
                                    <option>Contrato de Servicios v1.8</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="row mt-4">
                        <div class="col-md-12 text-center">
                            <div class="card p-4">
                                <h5>Validación de Documento</h5>
                                <p class="text-muted">Inicie el proceso de validación para comparar los documentos</p>
                                <p>Seleccione un documento de referencia y cargue el archivo para iniciar la pre-validación.</p>
                                <button class="btn btn-success">Iniciar Pre-Validación</button>
                            </div>
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

<!-- import -->
<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>