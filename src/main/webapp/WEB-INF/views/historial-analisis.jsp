<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>

<!-- Estilos para badges e iconos -->
<style>
    .historial-badge {
        display: inline-block;
        padding: 0.125rem 0.75rem;
        font-size: 0.75rem;
        line-height: 1;
        border-radius: 9999px;
        border: 1px solid;
    }
    .badge-aprobado {
        background-color: #ECFDF3;
        color: #027A48;
        border-color: #D1FAE5;
    }
    .badge-enrevision {
        background-color: #FFFAEB;
        color: #D27E00;
        border-color: #FDE68A;
    }
    .badge-rechazado {
        background-color: #FEF3F2;
        color: #B42318;
        border-color: #FECACA;
    }
    .text-validado {
        color: #047857;
        font-weight: 500;
        margin-left: .25rem;
    }
    .text-diferencias {
        color: #D97706;
        font-weight: 500;
        margin-left: .25rem;
    }
</style>

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
                        <div class="col-12">
                            <!-- Encabezado -->
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h2 class="h4 mb-1">Historial de Análisis de Documentos</h2>
                                    <p class="text-secondary small mb-3">
                                        Listado de todos los documentos que ha enviado para análisis
                                    </p>
                                </div>
                                <select id="filterEstado" class="form-control w-auto">
                                    <option>Todos los estados</option>
                                    <option>Aprobado</option>
                                    <option>En Revisión</option>
                                    <option>Rechazado</option>
                                </select>
                            </div>

                            <!-- Tabla -->
                            <div class="table-responsive">
                                <table id="documentHistory" class="table table-hover" style="width:100%">
                                    <thead>
                                    <tr class="text-secondary">
                                        <th>Documento</th>
                                        <th>Referencia</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Resultado</th>
                                        <th class="text-center">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <!-- Fila 1 -->
                                    <tr>
                                        <td>GiomarOrtegaCV.pdf</td>
                                        <td>Política de Privacidad</td>
                                        <td>02/04/2025</td>
                                        <td>
                                            <span class="historial-badge badge-aprobado">Aprobado</span>
                                        </td>
                                        <td>
                                            <i class="fas fa-check-circle" style="color:#047857;"></i>
                                            <span class="text-validado">Validado</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-link text-secondary p-0"
                                                        type="button" id="accion1" data-toggle="dropdown">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accion1">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-eye mr-2"></i>Ver detalles
                                                    </a>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-download mr-2"></i>Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Fila 2 -->
                                    <tr>
                                        <td>Contrato de Servicios v1.2.pdf</td>
                                        <td>Contrato Marco v2.3</td>
                                        <td>02/04/2024</td>
                                        <td>
                                            <span class="historial-badge badge-enrevision">En Revisión</span>
                                        </td>
                                        <td>
                                            <i class="fas fa-exclamation-triangle" style="color:#D97706;"></i>
                                            <span class="text-diferencias">3 diferencias</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-link text-secondary p-0"
                                                        type="button" id="accion2" data-toggle="dropdown">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accion2">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-eye mr-2"></i>Ver detalles
                                                    </a>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-download mr-2"></i>Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Fila 3 -->
                                    <tr>
                                        <td>Acuerdo de Confidencialidad.docx</td>
                                        <td>Acuerdo de Confidencialidad</td>
                                        <td>01/04/2024</td>
                                        <td>
                                            <span class="historial-badge badge-enrevision">En Revisión</span>
                                        </td>
                                        <td>
                                            <i class="fas fa-check-circle" style="color:#047857;"></i>
                                            <span class="text-validado">Validado</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-link text-secondary p-0"
                                                        type="button" id="accion3" data-toggle="dropdown">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accion3">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-eye mr-2"></i>Ver detalles
                                                    </a>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-download mr-2"></i>Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Fila 4 -->
                                    <tr>
                                        <td>Contrato de Empleo.pdf</td>
                                        <td>Contrato Marco v2.3</td>
                                        <td>29/03/2024</td>
                                        <td>
                                            <span class="historial-badge badge-rechazado">Rechazado</span>
                                        </td>
                                        <td>
                                            <i class="fas fa-exclamation-triangle" style="color:#D97706;"></i>
                                            <span class="text-diferencias">7 diferencias</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-link text-secondary p-0"
                                                        type="button" id="accion4" data-toggle="dropdown">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accion4">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-eye mr-2"></i>Ver detalles
                                                    </a>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-download mr-2"></i>Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Fila 5 -->
                                    <tr>
                                        <td>Acuerdo de Licencia.docx</td>
                                        <td>Acuerdo de Licencia</td>
                                        <td>28/03/2024</td>
                                        <td>
                                            <span class="historial-badge badge-aprobado">Aprobado</span>
                                        </td>
                                        <td>
                                            <i class="fas fa-exclamation-triangle" style="color:#D97706;"></i>
                                            <span class="text-diferencias">2 diferencias</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-link text-secondary p-0"
                                                        type="button" id="accion5" data-toggle="dropdown">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accion5">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-eye mr-2"></i>Ver detalles
                                                    </a>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-download mr-2"></i>Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /Tabla -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="mt-auto bg-light text-center py-3">
        <%@ include file="includes/footer.jspf" %>
    </footer>
</div>

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