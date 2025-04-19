$(document).ready(function () {
    // combo box
    cargarTiposPadre();
    //listar solicitudes
    cargarSolicitudesPorEstado("Abierto");

    // Función que se dispara cuando el usuario selecciona una imagen
    function handleFileSelect(event) {
        var input = $(this);  // El input de imagen específico
        var id = input.attr('id');  // Obtén el ID de este input
        var boxId = id.replace("imageInput", "imageBox");  // Obtener el ID del contenedor de la caja
        var previewId = id.replace("imageInput", "imagePreview");  // ID para la imagen de vista previa

        // Obtener la imagen seleccionada
        var file = event.target.files[0];
        var reader = new FileReader();

        // Cuando la imagen se lea, mostrarla como previsualización
        reader.onload = function (e) {
            $("#" + previewId).attr("src", e.target.result).show();  // Mostrar la imagen de vista previa
            $("#" + boxId).find(".fa-plus-circle").hide();  // Ocultar el ícono de añadir
        };

        reader.readAsDataURL(file);
    }

    // Asocia la función al evento de seleccionar imágenes para cada input
    $('#imageInput1').on('change', handleFileSelect);
    $('#imageInput2').on('change', handleFileSelect);
    $('#imageInput3').on('change', handleFileSelect);

    // Función para mostrar el input de archivo cuando el usuario haga clic en el ícono
    $(".image-box i").on("click", function () {
        var id = $(this).attr('id');  // Obtener el ID del ícono clickeado
        var inputId = id.replace("addImage", "imageInput");  // Encontrar el ID del input correspondiente
        $("#" + inputId).click();  // Hacer clic en el input de archivo
    });

    // Función para obtener las imágenes en base64 y enviarlas
    $('#registrarSolicitud').on('click', function (e) {
        e.preventDefault();

        // Array para almacenar las imágenes en base64
        var imagenesArray = [];

        // Revisamos cada input de imagen
        $(".image-input").each(function () {
            var input = $(this);
            if (input[0].files && input[0].files[0]) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    imagenesArray.push(e.target.result);  // Guardamos la imagen en el array
                    if (imagenesArray.length === $(".image-input").length) {  // Si ya se leyeron todas las imágenes
                        enviarSolicitud(imagenesArray);  // Enviar las imágenes al servidor
                    }
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });
    });

    // Función para enviar la solicitud al servidor
    function enviarSolicitud(imagenesArray) {
        var solicitudData = {
            soliTipoPadre: $('#tipoSolicitudPadre option:selected').text(),
            soliTipoHijo: $('#tipoSolicitudHijo option:selected').text(),
            edifNombre: $('#edificioNombre').val(),
            soliSolicitante: $('#solicitanteNombre').val(),
            depaNombre: $('#departamentoNombre').val(),
            soliComentario: $('#comentario').val(),
            soliImagen: imagenesArray
        };

        // Validación de campos
        if (solicitudData.edifNombre && solicitudData.soliSolicitante && solicitudData.depaNombre && solicitudData.soliComentario && solicitudData.soliImagen) {
            console.log("solicitudData:", solicitudData);

            $.ajax({
                url: '/holistic/solicitud/create',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(solicitudData),
                success: function (response) {
                    toastr.success("Solicitud creada exitosamente.");
                    $('#ingresarSolicitudForm')[0].reset();
                },
                error: function (error) {
                    console.error("Error al crear la solicitud:", error);
                    toastr.error('Ocurrió un error al crear la solicitud.');
                }
            });
        } else {
            toastr.error("Por favor, complete todos los campos requeridos.");
        }
    }


    // Evento de clic para cambiar de estado
    $(".estado-column").on('click', function () {
        var estado = $(this).attr('id');
        console.log("estado", estado)
        cargarSolicitudesPorEstado(estado);
    });

});

// Función para cargar las solicitudes por estado
function cargarSolicitudesPorEstado(estado) {
    $('#' + estado).empty();

    $.ajax({
        url: '/holistic/historialSolicitud/historial-estados',
        method: 'GET',
        data: {estado: estado},
        success: function (data) {

            if (data.length > 0) {
                data.forEach(function (solicitud) {
                    console.log("Estado de la solicitud:", solicitud.soliImagen);

                    // Crear el HTML para la solicitud
                    var solicitudHtml = `
                        <div class="card mb-3 shadow-sm p-3 d-flex flex-column justify-content-between align-items-start" data-id="${solicitud.histId}">
                            <div class="d-flex justify-content-between w-100">
                                <div>
                                    <p><strong>Soli ID:</strong> ${solicitud.soliId}</p>
                                </div>                       
                                <div>
                                    <p><strong>Departamento:</strong> ${solicitud.depaNombre}</p>
                                </div>
                            </div>  

                            <div class="mt-3">
                                <!-- Botón para abrir el modal -->
                                <button class="btn btn-info btn-sm abrir-modal" data-id="${solicitud.soliId}" data-histId="${solicitud.histId}">
                                    <i class="fas fa-eye"></i> Ver Más
                                </button>
                            </div>
                        </div>
                    `;

                    $('#' + estado).append(solicitudHtml);

                    // Modal para detalles de la solicitud
                    var modalHtml = `
                        <div class="modal fade" id="verSolicitudModal${solicitud.histId}" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header bg-primary text-white">
                                        <h5 class="modal-title">Detalles de la Solicitud</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        <input type="hidden" id="histId${solicitud.histId}" name="histId" value="${solicitud.histId}">
                                        <input type="hidden" id="estadoActual${solicitud.histId}" name="estadoActual" value="${solicitud.histEstado}">
                                        <input type="hidden" id="soliId${solicitud.histId}" name="soliId" value="${solicitud.soliId}"> <!-- Añadir el soliId -->
                                    </div>

                                    <div class="modal-body">
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <p><strong>Solicitante:</strong> ${solicitud.soliSolicitante}</p>
                                            </div>
                                            <div class="col-md-6">
                                                <p><strong>Departamento:</strong> ${solicitud.depaNombre}</p>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <p><strong>Tipo de Solicitud:</strong> ${solicitud.soliTipoPadre} - ${solicitud.soliTipoHijo}</p>
                                            </div>
                                            <div class="col-md-6">
                                                <p><strong>Comentario:</strong> ${solicitud.soliComentario || "Sin comentario"}</p>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-12">
                                                <p><strong>Imagen Pre-cargada:</strong></p>
                                                ${(() => {
                                                                if (typeof solicitud.soliImagen === 'string' && solicitud.soliImagen.length > 0) {
                                                                    const imagenesArray = solicitud.soliImagen.split(',');  // Convertimos la cadena a un arreglo de imágenes
                                                                    return imagenesArray.map(img => `<img src="data:image/jpeg;base64,${img}" class="img-fluid mt-2" style="max-width: 150px; max-height: 150px; object-fit: cover;" />`).join('');
                                                                } else {
                                                                    return "No se ha cargado ninguna imagen.";
                                                                }
                                                            })()}
                                            </div>
                                        </div>


                                    </div>
                                    
                                    <!-- Slider/Accordion para mostrar el historial de la solicitud -->
                                    <div class="toggle-arrow" id="historialAccordion-${solicitud.histId}">
                                        <div class="accordion-item">
                                            <div id="collapse-${solicitud.histId}" class="accordion-collapse collapse show" aria-labelledby="heading-${solicitud.histId}" data-bs-parent="#historialAccordion-${solicitud.histId}">
                                                <div class="accordion-body">
                                                    Cargando historial...
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" class="btn btn-outline-info w-100" id="toggleButton${solicitud.histId}" data-id="${solicitud.histId}">
                                        <i class="fas fa-chevron-down"></i> Ver más detalles
                                    </button>

                                    <div class="panel-section" id="panelSection${solicitud.histId}" style="display:none;">
                                        <hr>
                                        <div class="mb-3">
                                            <label for="histComentario${solicitud.histId}" class="form-label">Agregar Comentario:</label>
                                            <textarea id="histComentario${solicitud.histId}" class="form-control" rows="3" placeholder="Escribe un comentario">${solicitud.histComentario || ''}</textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="histResponsable${solicitud.histId}" class="form-label">Responsable:</label>
                                            <input type="text" id="histResponsable${solicitud.histId}" class="form-control" placeholder="Nombre del responsable" value="${solicitud.histResponsable || ''}" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="histImagenUrl${solicitud.histId}" class="form-label">Imagen</label>
                                            <input type="file" id="histImagenUrl${solicitud.histId}" class="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary" onclick="ActualizarEstado(${solicitud.histId})">Grabar</button>
                                    
                                    </div> 
                                </div>
                            </div>
                        </div>
                    `;
                    $("body").append(modalHtml);
                });

                // Evento de apertura del modal
                $(".abrir-modal").on("click", function () {
                    var histId = $(this).data("histid");  // Usamos histId para abrir el modal
                    var soliId = $(this).data("id");

                    cargarHistorialPorSoliId(soliId, histId);

                    var modal = $(`#verSolicitudModal${histId}`);
                    if (modal.length) {
                        modal.modal("show");
                    }
                });

                // Mostrar/ocultar la sección "Ver más detalles"
                $(".btn-outline-info").on("click", function () {
                    var histId = $(this).data("id");
                    var panel = $("#panelSection" + histId);
                    panel.stop(true, true).slideToggle();

                    var icon = $(this).find("i");
                    if (panel.is(":visible")) {
                        icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                    } else {
                        icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                    }
                });

            } else {
                $('#' + estado).append('<p>No hay solicitudes en este estado.</p>');
            }
        },
        error: function (error) {
            console.error('❌ Error al cargar solicitudes:', error);
        }
    });
}

// Función para cargar el historial por soliId
function cargarHistorialPorSoliId(soliId, histId) {
    $.ajax({
        url: '/holistic/historialSolicitud/obtener-historial-soliId',  // Endpoint para obtener el historial por soliId
        method: 'GET',
        data: {soliId: soliId},  // Pasamos soliId
        success: function (data) {
            console.log("Historial de la solicitud:", data);

            if (data.length > 0) {
                var historialHtml = '';

                data.forEach(function (estado) {
                    historialHtml += `
                        <div class="card mb-2">
                            <div class="card-body">
                                <p><strong>Estado:</strong> ${estado.histEstado}</p>
                                <p><strong>Comentario:</strong> ${estado.histComentario || "Sin comentario"}</p>
                                <p><strong>Responsable:</strong> ${estado.histResponsable}</p>
                                ${estado.histImagenUrl ? `<img src="${estado.histImagenUrl}" class="img-fluid mt-2 rounded" alt="Imagen" style="max-height: 150px;" />` : ''}
                            </div>
                        </div>
                    `;
                });

                var modal = $(`#verSolicitudModal${histId}`);
                modal.find('.accordion-body').html(historialHtml);
                modal.modal('show');
            } else {
                var modal = $(`#verSolicitudModal${histId}`);
                modal.find('.accordion-body').html('<p>No hay historial disponible.</p>');
            }
        },
        error: function (error) {
            console.error('❌ Error al cargar el historial de la solicitud:', error);
        }
    });
}


function obtenerSiguienteEstado(estadoActual) {
    const estados = ["Abierto", "Asignado", "PorConfirmar", "PorAtender", "EnProceso", "Atendido", "Cerrado"];
    const index = estados.indexOf(estadoActual);
    if (index < estados.length) {
        return estados[index + 1];
    }
    return estadoActual;  // Si ya está en el último estado, lo mantiene
}

function ActualizarEstado(histId) {

    // Obtener el estado actual y el siguiente estado
    var estadoActual = $("#estadoActual" + histId).val();
    var siguienteEstado = obtenerSiguienteEstado(estadoActual);

    // Obtener el soliId y los valores de los campos
    var soliId = $("#soliId" + histId).val();  // Aquí obtenemos el soliId
    var histComentario = $("#histComentario" + histId).val();
    var histResponsable = $("#histResponsable" + histId).val();
    var histImagenUrl = $("#histImagenUrl" + histId).val();

    // Enviar la solicitud con el siguiente estado
    $.ajax({
        url: '/holistic/historialSolicitud/update',  // URL de tu backend
        method: 'PUT', contentType: 'application/json', data: JSON.stringify({
            histId: histId,
            soliId: soliId,
            histEstado: siguienteEstado,
            histComentario: histComentario,
            histResponsable: histResponsable,
            histImagen: histImagenUrl
        }), success: function (response) {
            toastr.success('Solicitud actualizada al siguiente estado');

            const histId = +1;
            // Limpiar los campos de entrada para el nuevo estado
            $("#histComentario" + histId).val('');
            $("#histResponsable" + histId).val('');
            $("#histImagenUrl" + histId).val('');
            // Actualizamos el estado y el historial en la vista
            $("#estadoActual" + histId).val(siguienteEstado);


        },
        error: function (error) {
            toastr.error('Error al actualizar la solicitud');
            console.error(error);
        }
    });
}

function cargarTiposPadre() {
    $.ajax({
        url: '/holistic/tipo_solicitudes/tipos_padre', type: 'GET', success: function (data) {
            var padreSelect = $('#tipoSolicitudPadre');
            padreSelect.empty();
            padreSelect.append('<option value="">Seleccione un tipo de solicitud</option>'); // Primer elemento vacío

            data.tiposPadre.forEach(function (tipoPadre) {
                padreSelect.append('<option value="' + tipoPadre.tipSoliId + '">' + tipoPadre.tipSoliNombre + '</option>');
            });
        }, error: function (error) {
            console.log('Error al cargar los tipos de solicitud padres:', error);
        }
    });
}

function cargarTipoSolicitudHijo() {
    var padreId = $('#tipoSolicitudPadre').val();
    if (padreId) {
        $.ajax({
            url: '/holistic/tipo_solicitudes/tipos_hijo', type: 'GET', data: {padreId: padreId}, success: function (data) {
                var hijoSelect = $('#tipoSolicitudHijo');
                hijoSelect.empty();
                hijoSelect.append('<option value="">Seleccione un tipo de solicitud hijo</option>'); // Primer elemento vacío


                data.tiposHijos.forEach(function (tipoHijo) {
                    hijoSelect.append('<option value="' + tipoHijo.tipSoliId + '">' + tipoHijo.tipSoliSubNombre + '</option>');
                });
            }, error: function (error) {
                console.log('Error al cargar los tipos de solicitud hijos:', error);
            }
        });
    } else {
        // Si no se ha seleccionado un tipo de solicitud padre, limpiar el combo de hijos
        $('#tipoSolicitudHijo').empty();
        $('#tipoSolicitudHijo').append('<option value="">Seleccione un tipo de solicitud hijo</option>');
    }
}