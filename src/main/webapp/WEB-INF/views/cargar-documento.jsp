<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<body>
<%@ include file="includes/preloader.jspf" %>
<div id="main-wrapper">
    <%@ include file="includes/topbar.jspf" %>
    <%@ include file="includes/left-sidebar.jspf" %>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="card mt-3">
                <div class="container py-5">
                    <div class="row">
                        <input type="hidden" id="usuId" value="${usuId}">
                        <!-- Cargar Documento -->
                        <div class="col-md-6 mb-4">
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
                        <div class="col-md-6 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <i class="icon-doc"></i> Documento de Referencia
                                    </h5>
                                    <p class="text-muted small">
                                        Seleccione el documento de referencia para la comparación
                                    </p>

                                    <select id="referenceDoc" class="form-control">
                                    </select>

                                    <form id="formAgregarPolitica" enctype="multipart/form-data" class="mt-4">
                                        <div class="form-group">
                                            <label for="nuevoArchivo" class="custom-label">Agregar nuevo documento PDF</label>
                                            <input type="file" id="nuevoArchivo" name="nuevoArchivo" class="form-control" accept="application/pdf">
                                        </div>
                                        <button id="agregarPoliticaBtn" type="submit" class="custom-btn">Agregar Política</button>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div><!-- /.row -->

                    <!-- Validación de Documento -->
                    <div class="card mt-4 shadow-sm" style="border-radius:10px;">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <i class="icon-check" style="font-size:1.25rem;"></i>
                                <h6 class="mb-0 ml-2">Validación de Documento</h6>
                            </div>
                            <p class="small text-muted mb-3">
                                Inicie el proceso de validación para comparar los documentos.
                            </p>
                            <div class="text-center">
                                <small class="text-muted d-block mb-3">
                                    Cargue un documento y seleccione un documento de referencia para iniciar la pre-validación.
                                </small>
                                <button id="validateBtn" class="btn btn-secondary btn-sm">
                                    Iniciar Pre-validación
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<style>
    /* Personalización de la etiqueta del campo de entrada */
    .custom-label {
        font-size: 1.1em;
        font-weight: bold;
        color: #333;
        margin-bottom: 8px;
        display: block;
    }

    /* Estilo para el input tipo archivo */
    .custom-input {
        font-size: 1em;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 8px;
        width: 100%;
        background-color: #f9f9f9;
        transition: border-color 0.3s ease;
    }

    .custom-input:focus {
        border-color: #007bff;
        background-color: #fff;
        outline: none;
    }

    /* Estilo para el botón gris y pequeño */
    .custom-btn {
        background-color: #6c757d;  /* Gris */
        color: #fff;
        border: none;
        padding: 8px 16px;  /* Botón más pequeño */
        font-size: 0.9em;  /* Texto más pequeño */
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: auto;  /* Se ajusta al contenido */
        margin-top: 10px;
    }

    .custom-btn:hover {
        background-color: #5a6268;  /* Gris más oscuro */
    }

    .custom-btn:active {
        background-color: #343a40;  /* Gris aún más oscuro */
    }


</style>

<footer class="mt-auto bg-light text-center py-3">
    <%@ include file="includes/footer.jspf" %>
</footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>

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
<script src="/static/web/dist/js/funciones/cargar-documentos.js"></script>
<script src="/static/web/dist/css/cargar-documentos.css"></script>

<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>
