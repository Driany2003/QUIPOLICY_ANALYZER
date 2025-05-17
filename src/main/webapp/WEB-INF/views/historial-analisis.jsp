<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="es">
<%@ include file="includes/header.jspf" %>

<!-- Estilos personalizados -->
<style>
    /* Badges */
    .historial-badge {
        display: inline-block;
        padding: .125rem .75rem;
        font-size: .75rem;
        line-height: 1;
        border-radius: 9999px;
        border: 1px solid;
    }
    .badge-aprobado   { background-color: #ECFDF3; color: #027A48; border-color: #D1FAE5; }
    .badge-enrevision { background-color: #FFFAEB; color: #D27E00; border-color: #FDE68A; }
    .badge-rechazado  { background-color: #FEF3F2; color: #B42318; border-color: #FECACA; }

    /* Iconos de resultado */
    .text-validado    { color: #047857; font-weight: 500; margin-left: .25rem; }
    .text-diferencias { color: #D97706; font-weight: 500; margin-left: .25rem; }

    /* Subtítulos de modal */
    .subtitulo {
        margin: -1.5rem 0 1rem;
        font-size: .95rem;
        color: #6B7280;
    }

    /* Estilos comunes a los modales de detalle */
    .revision-list {
        margin-top: .5rem;
    }
    .revision-item {
        background: #fff;
        border: 1px solid #E5E7EB;
        border-radius: .375rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: .75rem 1rem;
        margin-bottom: .5rem;
    }
    .revision-item:last-child { margin-bottom: 0; }
    .revision-item .details small {
        display: block;
        margin-top: .25rem;
        color: #6B7280;
        font-size: .875rem;
    }
    .page-badge {
        background: #111827;
        color: #fff;
        padding: .25rem .75rem;
        border-radius: .375rem;
        font-size: .75rem;
        white-space: nowrap;
    }

    /* Rechazo: caja de motivo */
    .rechazo-box {
        background-color: #FEF3F2;
        border: 1px solid #FECACA;
        border-radius: .375rem;
        padding: .75rem 1rem;
        color: #B42318;
        margin-top: .5rem;
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
                            <!-- Aprobado -->
                            <tr
                                    data-name="GiomarOrtegaCV.pdf"
                                    data-ref="Política de Privacidad"
                                    data-date="02/04/2025"
                                    data-status="Aprobado"
                                    data-diffs="[]"
                                    data-reason=""
                            >
                                <td>GiomarOrtegaCV.pdf</td>
                                <td>Política de Privacidad</td>
                                <td>02/04/2025</td>
                                <td><span class="historial-badge badge-aprobado">Aprobado</span></td>
                                <td>
                                    <i class="fas fa-check-circle text-validado"></i>
                                    <span class="text-validado">Validado</span>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-link text-secondary p-0" data-toggle="dropdown">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item ver-detalle" href="#"><i class="fas fa-eye mr-2"></i>Ver detalles</a>
                                            <a class="dropdown-item" href="#"><i class="fas fa-download mr-2"></i>Descargar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- En Revisión -->
                            <tr
                                    data-name="Contrato de Servicios v1.2.pdf"
                                    data-ref="Contrato Marco v2.3"
                                    data-date="02/04/2024"
                                    data-status="En Revisión"
                                    data-diffs='[
                    {"clause":"Cláusula 2.3","diff":"Duración: 12 vs 24 meses","page":1},
                    {"clause":"Cláusula 4.1","diff":"Pago: mensual vs trimestral","page":2},
                    {"clause":"Cláusula 8.2","diff":"Omitida vs Penalización","page":3}
                  ]'
                                    data-reason=""
                            >
                                <td>Contrato de Servicios v1.2.pdf</td>
                                <td>Contrato Marco v2.3</td>
                                <td>02/04/2024</td>
                                <td><span class="historial-badge badge-enrevision">En Revisión</span></td>
                                <td>
                                    <i class="fas fa-exclamation-triangle text-diferencias"></i>
                                    <span class="text-diferencias">3 diferencias</span>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-link text-secondary p-0" data-toggle="dropdown">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item ver-detalle" href="#"><i class="fas fa-eye mr-2"></i>Ver detalles</a>
                                            <a class="dropdown-item" href="#"><i class="fas fa-download mr-2"></i>Descargar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- Rechazado -->
                            <tr
                                    data-name="Contrato de Empleo.pdf"
                                    data-ref="Contrato Marco v2.3"
                                    data-date="29/03/2024"
                                    data-status="Rechazado"
                                    data-diffs='[
                    {"clause":"Cláusula 2.3","diff":"Duración: 12 vs 24 meses","page":1},
                    {"clause":"Cláusula 4.1","diff":"Pago: mensual vs trimestral","page":2},
                    {"clause":"Cláusula 8.2","diff":"Omitida vs Penalización","page":3}
                  ]'
                                    data-reason="Múltiples cláusulas modificadas que alteran términos legales. Requiere revisión legal."
                            >
                                <td>Contrato de Empleo.pdf</td>
                                <td>Contrato Marco v2.3</td>
                                <td>29/03/2024</td>
                                <td><span class="historial-badge badge-rechazado">Rechazado</span></td>
                                <td>
                                    <i class="fas fa-exclamation-triangle text-diferencias"></i>
                                    <span class="text-diferencias">7 diferencias</span>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-link text-secondary p-0" data-toggle="dropdown">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item ver-detalle" href="#"><i class="fas fa-eye mr-2"></i>Ver detalles</a>
                                            <a class="dropdown-item" href="#"><i class="fas fa-download mr-2"></i>Descargar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- Otro Aprobado con diferencias -->
                            <tr
                                    data-name="Acuerdo de Licencia.docx"
                                    data-ref="Acuerdo de Licencia"
                                    data-date="28/03/2024"
                                    data-status="Aprobado"
                                    data-diffs='[{"clause":"Cláusula X","diff":"… vs …","page":4}]'
                                    data-reason=""
                            >
                                <td>Acuerdo de Licencia.docx</td>
                                <td>Acuerdo de Licencia</td>
                                <td>28/03/2024</td>
                                <td><span class="historial-badge badge-aprobado">Aprobado</span></td>
                                <td>
                                    <i class="fas fa-exclamation-triangle text-diferencias"></i>
                                    <span class="text-diferencias">2 diferencias</span>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-link text-secondary p-0" data-toggle="dropdown">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item ver-detalle" href="#"><i class="fas fa-eye mr-2"></i>Ver detalles</a>
                                            <a class="dropdown-item" href="#"><i class="fas fa-download mr-2"></i>Descargar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Modal Aprobados (ahora sin modal-sm) -->
                    <div class="modal fade" id="detalleModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered"><!-- eliminamos modal-sm -->
                            <div class="modal-content">
                                <div class="modal-header border-0">
                                    <h5 class="modal-title">Detalles del Documento</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p class="subtitulo">Información detallada sobre el análisis del documento</p>
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-secondary">Documento</small>
                                            <p id="md-doc" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Referencia</small>
                                            <p id="md-ref" class="mb-0 font-weight-medium"></p>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-secondary">Fecha</small>
                                            <p id="md-date" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Estado</small>
                                            <p id="md-status" class="mb-0 font-weight-medium"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer border-0 py-2">
                                    <a href="#" id="md-download" class="btn btn-dark">
                                        <i class="fas fa-download mr-2"></i>Descargar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal En Revisión -->
                    <div class="modal fade" id="detalleModalRevision" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header border-0 pb-1">
                                    <h5 class="modal-title">Detalles del Documento</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p class="subtitulo">Información detallada sobre el análisis del documento</p>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <small class="text-secondary">Documento</small>
                                            <p id="mdr-doc" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Referencia</small>
                                            <p id="mdr-ref" class="mb-0 font-weight-medium"></p>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-secondary">Fecha</small>
                                            <p id="mdr-date" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Estado</small>
                                            <p id="mdr-status" class="mb-0 font-weight-medium"></p>
                                        </div>
                                    </div>
                                    <div class="font-weight-medium">Diferencias encontradas</div>
                                    <div id="mdr-list" class="revision-list"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Rechazado -->
                    <div class="modal fade" id="detalleModalRechazado" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header border-0 pb-1">
                                    <h5 class="modal-title">Detalles del Documento</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p class="subtitulo">Información detallada sobre el análisis del documento</p>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <small class="text-secondary">Documento</small>
                                            <p id="mdrej-doc" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Referencia</small>
                                            <p id="mdrej-ref" class="mb-0 font-weight-medium"></p>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-secondary">Fecha</small>
                                            <p id="mdrej-date" class="mb-2 font-weight-medium"></p>
                                            <small class="text-secondary">Estado</small>
                                            <p id="mdrej-status" class="mb-0 font-weight-medium"></p>
                                        </div>
                                    </div>
                                    <small class="text-secondary">Motivo del rechazo</small>
                                    <div id="mdrej-reason" class="rechazo-box"></div>
                                    <small class="text-secondary mt-3 d-block">Diferencias encontradas</small>
                                    <div id="mdrej-list" class="revision-list"></div>
                                </div>
                                <div class="modal-footer border-0 pt-2">
                                    <button type="button" class="btn btn-dark" id="btn-corregir-rechazo">
                                        <i class="fas fa-upload mr-2"></i>Subir corrección
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /Modales -->
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

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
    $(function(){
        $('.ver-detalle').on('click', function(e){
            e.preventDefault();

            var $tr     = $(this).closest('tr'),
                status  = $tr.data('status'),
                diffs   = $tr.data('diffs')   || [],
                reason  = $tr.data('reason')  || '';

            if (status === 'Aprobado') {
                // Modal Aprobados
                $('#md-doc').text( $tr.data('name') );
                $('#md-ref').text( $tr.data('ref') );
                $('#md-date').text( $tr.data('date') );
                $('#md-status').text( status );
                $('#md-download').attr('href', '/descargar?file=' + encodeURIComponent($tr.data('name')));
                $('#detalleModal').modal('show');

            } else if (status === 'En Revisión') {
                // Modal En Revisión
                $('#mdr-doc').text( $tr.data('name') );
                $('#mdr-ref').text( $tr.data('ref') );
                $('#mdr-date').text( $tr.data('date') );
                $('#mdr-status').text( status );

                var $list = $('#mdr-list').empty();
                diffs.forEach(function(d){
                    var parts = d.diff.split(' vs ');
                    $list.append(
                        '<div class="revision-item">'+
                        '<div class="details">'+
                        '<strong>'+ d.clause +'</strong><br>'+
                        '<small>'+
                        '<span class="text-danger">'+ parts[0] +'</span> vs '+
                        '<span class="text-success">'+ parts[1] +'</span>'+
                        '</small>'+
                        '</div>'+
                        '<div class="page-badge">Pág. '+ d.page +'</div>'+
                        '</div>'
                    );
                });

                $('#detalleModalRevision').modal('show');

            } else if (status === 'Rechazado') {
                // Modal Rechazado
                $('#mdrej-doc').text( $tr.data('name') );
                $('#mdrej-ref').text( $tr.data('ref') );
                $('#mdrej-date').text( $tr.data('date') );
                $('#mdrej-status').text( status );
                $('#mdrej-reason').text( reason );

                var $listR = $('#mdrej-list').empty();
                diffs.forEach(function(d){
                    var parts = d.diff.split(' vs ');
                    $listR.append(
                        '<div class="revision-item">'+
                        '<div class="details">'+
                        '<strong>'+ d.clause +'</strong><br>'+
                        '<small>'+
                        '<span class="text-danger">'+ parts[0] +'</span> vs '+
                        '<span class="text-success">'+ parts[1] +'</span>'+
                        '</small>'+
                        '</div>'+
                        '<div class="page-badge">Pág. '+ d.page +'</div>'+
                        '</div>'
                    );
                });

                $('#detalleModalRechazado').modal('show');
            }
        });
    });
</script>

<!-- import -->
<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>