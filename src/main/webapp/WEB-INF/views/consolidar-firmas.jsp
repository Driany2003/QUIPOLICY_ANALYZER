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

                        <!-- Cargar Documento -->
                        <div class="col-md-4 mb-6">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <i class="icon-arrow-up-circle"></i> Cargar Documento
                                    </h5>
                                    <p class="text-muted small">
                                        Suba el documento que desea validar contra los documentos de referencia
                                    </p>
                                    <div id="dropzone"
                                         class="border rounded p-4 text-center"
                                         style="border:2px dashed #ced4da; min-height:200px; cursor:pointer;">
                                        <i class="icon-cloud-upload" style="font-size:2rem; color:#6c757d;"></i>
                                        <p class="mt-2 mb-1 font-weight-bold">Arrastre tu PDF aquí</p>
                                        <small class="text-muted d-block mb-3">
                                            Formatos soportados: PDF (máx. 10MB)
                                        </small>
                                        <button id="uploadBtn" class="btn btn-outline-secondary btn-sm">
                                            Elegir archivo
                                        </button>
                                        <input type="file" id="fileInput" accept="application/pdf" hidden>
                                        <div id="fileName" class="text-truncate mt-2 small text-secondary">
                                            No se ha seleccionado ningún archivo
                                        </div>
                                        <div id="fileSize" class="text-truncate small text-secondary"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Documento de Referencia -->
                        <div class="col-md-8 mb-6">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <i class="icon-doc"></i> Documento de Referencia
                                    </h5>
                                    <p class="text-muted small">
                                        Seleccione el documento de referencia para la comparación
                                    </p>
                                    <select id="referenceDoc" class="form-control">
                                        <option>Seleccionar documento</option>
                                        <option>Contrato Marco v2.3 (v2.3)</option>
                                        <option>Formulario de Registro (v1.5)</option>
                                        <option>Acuerdo de Confidencialidad (v3.0)</option>
                                        <option>Política de Privacidad (v2.1)</option>
                                        <option>Contrato de Servicios (v1.8)</option>
                                    </select>
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