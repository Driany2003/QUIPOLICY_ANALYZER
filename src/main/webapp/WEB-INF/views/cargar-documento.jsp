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

<footer class="mt-auto bg-light text-center py-3">
    <%@ include file="includes/footer.jspf" %>
</footer>

<!-- PDF.js core + worker -->
<!-- PDF.js core + worker -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
<script>
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
</script>

<!-- Lógica completa de carga, extracción y muestra de nombre/tamaño -->
<script>
    // Referencias al DOM
    const uploadBtn   = document.getElementById('uploadBtn'),
        fileInput   = document.getElementById('fileInput'),
        dropzone    = document.getElementById('dropzone'),
        fileNameLbl = document.getElementById('fileName'),
        fileSizeLbl = document.getElementById('fileSize');

    // Función para formatear bytes
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024,
            dm = decimals < 0 ? 0 : decimals,
            sizes = ['Bytes','KB','MB','GB','TB'],
            i = Math.floor(Math.log(bytes)/Math.log(k));
        return parseFloat((bytes/Math.pow(k,i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Solo el botón abre el selector y detiene la propagación
    uploadBtn.addEventListener('click', e => {
        e.stopPropagation();
        fileInput.click();
    });

    // Clic en la zona (excepto el botón) abre también el selector
    dropzone.addEventListener('click', () => fileInput.click());

    // Efectos visuales de drag & drop
    ['dragenter','dragover'].forEach(evt =>
        dropzone.addEventListener(evt, e => {
            e.preventDefault();
            dropzone.classList.add('bg-light');
        })
    );
    ['dragleave','drop'].forEach(evt =>
        dropzone.addEventListener(evt, e => {
            e.preventDefault();
            dropzone.classList.remove('bg-light');
        })
    );

    // Procesa el PDF: muestra nombre, tamaño y extrae texto
    function processPDF(file) {
        if (file.type !== 'application/pdf') {
            return alert('❌ Solo se permiten archivos PDF.');
        }

        // Mostrar nombre y tamaño
        fileNameLbl.textContent = file.name;
        fileSizeLbl.textContent = formatBytes(file.size);

        // Leer el archivo y extraer texto
        const reader = new FileReader();
        reader.onload = () => {
            const data = new Uint8Array(reader.result);
            pdfjsLib.getDocument(data).promise
                .then(pdf => {
                    const pages = [];
                    for (let i = 1; i <= pdf.numPages; i++) {
                        pages.push(
                            pdf.getPage(i)
                                .then(page => page.getTextContent())
                                .then(ct => ct.items.map(it => it.str).join(' '))
                        );
                    }
                    return Promise.all(pages);
                })
                .then(texts => {
                    console.log('✅ Texto extraído:\n\n' + texts.join('\n\n'));
                })
                .catch(err => console.error('❌ Error extrayendo PDF:', err));
        };
        reader.readAsArrayBuffer(file);
    }

    // Evento drop
    dropzone.addEventListener('drop', ev => {

        ev.preventDefault();
        dropzone.classList.remove('bg-light');
        processPDF(ev.dataTransfer.files[0]);
    });

    // Evento selección de archivo
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            processPDF(fileInput.files[0]);
        }
    });
</script>


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

<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>
