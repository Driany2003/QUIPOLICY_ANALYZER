$(document).ready(function () {
    cargarValidaciones();

    function cargarValidaciones() {
        $.ajax({
            url: "/politicas/listar-validaciones",
            method: "GET",
            success: function (data) {
                const $list = $(".list-group.list-group-flush");
                $list.empty();

                if (data && data.length > 0) {
                    data.forEach(function (item) {
                        const fecha = new Date(item.fecha_proceso).toLocaleDateString("es-PE");
                        const diferencias = item.resumen?.diferencias_detectadas || 0;
                        const status = item.status || "pendiente";
                        const badgeClass = status.toLowerCase() === "aprobado" || status.toLowerCase() === "validado"
                            ? "bg-success text-white"
                            : status.toLowerCase() === "rechazado"
                                ? "bg-danger text-white"
                                : "bg-warning text-dark";
                        const liClass = "list-group-item d-flex justify-content-between align-items-center";

                        const listItem = $(`
                              <li class="${liClass}" style="cursor:pointer">
                                <div>
                                  <strong>${item.nombre}</strong><br>
                                  <small class="text-muted">${fecha}</small>
                                </div>
                                <div class="text-end">
                                  <span class="badge ${badgeClass}">${capitalizeFirstLetter(status)}</span><br>
                                  <small class="${diferencias > 0 ? 'text-danger' : 'text-success'}">${diferencias} diferencia${diferencias !== 1 ? 's' : ''}</small>
                                </div>
                              </li>
                            `);

                        listItem.click(function () {
                            mostrarDetalles(item);
                        });

                        $list.append(listItem);
                    });
                } else {
                    $list.append('<li class="list-group-item">No hay validaciones disponibles.</li>');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar las validaciones:", error);
            }
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function mostrarDetalles(item) {
        const fechaFormateada = new Date(item.fecha_proceso).toLocaleDateString("es-PE");
        const documentoAnalizado = item.nombre;
        let documentoReferencia = "No disponible";
        if (item.comparacion && item.comparacion.diferencias && item.comparacion.diferencias.length > 0) {
            documentoReferencia = item.comparacion.diferencias[0].documento || documentoReferencia;
        }

        // Resultado basado en status
        const status = item.status || "Pendiente";
        let resultadoHTML = `<span class="text-warning"><i class="icon-clock"></i> ${capitalizeFirstLetter(status)}</span>`;
        if (status.toLowerCase() === "validado" || status.toLowerCase() === "aprobado") {
            resultadoHTML = `<span class="text-success"><i class="icon-check-circle"></i> Documento Validado</span>`;
        } else if (status.toLowerCase() === "rechazado") {
            resultadoHTML = `<span class="text-danger"><i class="icon-times-circle"></i> Documento Rechazado</span>`;
        }

        // Construir la lista de diferencias
        let diferenciasHTML = "";
        if (item.comparacion && item.comparacion.diferencias && item.comparacion.diferencias.length > 0) {
            diferenciasHTML = '<ul class="list-group mt-3">';
            item.comparacion.diferencias.forEach(function(diff, i) {
                diferenciasHTML += `
          <li class="list-group-item">
            <strong>${capitalizeFirstLetter(diff.resultado)} (${diff.gravedad})</strong><br>
            <em>${diff.descripcion}</em><br>
            <small><strong>Evidencia:</strong> ${diff.evidencia}</small><br>
            <small><strong>Documento Referencia:</strong> ${diff.documento}</small><br>
            <small><strong>Similaridad:</strong> ${(diff.similaridad * 100).toFixed(2)}%</small>
          </li>
        `;
            });
            diferenciasHTML += "</ul>";
        } else {
            diferenciasHTML = '<p class="text-muted">No se encontraron diferencias.</p>';
        }

        // Actualizar el HTML en la parte derecha
        const $detalle = $(".col-md-8.mb-4 .card-body");
        $detalle.html(`
           <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 class="card-title mb-1"><i class="icon-file-check"></i> Reporte de Validación</h5>
                  <p class="text-muted small mb-0">Detalles del reporte y opciones de aprobación</p>
                </div>
                <div class="d-flex align-items-start" id="botones-accion">
                  <button id="btnRechazar" class="btn btn-outline-danger btn-sm me-2" style="padding: 5px 10px;">
                    <i class="fas fa-times"></i> Rechazar
                  </button>
                  <button id="btnAprobar" class="btn btn-dark btn-sm" style="padding: 5px 10px;">
                    <i class="fas fa-check"></i> Aprobar
                  </button>
                </div>
           </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <strong>Documento Analizado:</strong><br>${documentoAnalizado}
            </div>
            <div class="col-sm-6">
              <strong>Documento de Referencia:</strong><br>${documentoReferencia}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <strong>Fecha de Validación:</strong><br>${fechaFormateada}
            </div>
            <div class="col-sm-6">
              <strong>Resultado:</strong><br>${resultadoHTML}
            </div>
          </div>
          <hr>
          <h6>Diferencias detectadas:</h6>
          ${diferenciasHTML}
        `);

        $("#btnAprobar").off("click").on("click", function () {
            const idDocumento = item.id;
            const usuId = item.usu_id;
            const nuevoEstado = "aprobado";

            $.ajax({
                url: "/politicas/actualizar-estado",
                method: "PUT",
                data: { id: idDocumento, usuId: usuId, status: nuevoEstado },
                success: function(response) {
                    item.status = nuevoEstado;
                    const nuevoResultadoHTML = `<span class="text-success"><i class="icon-check-circle"></i> Documento Validado</span>`;
                    $(".row div.col-sm-6:nth-child(2)").last().html(`<strong>Resultado:</strong><br>${nuevoResultadoHTML}`);
                    $("#botones-accion").hide();
                    toastr.success("Estado actualizado a aprobado correctamente.");
                    cargarValidaciones();
                },
                error: function() {
                    toastr.error("No se pudo actualizar el estado, intenta nuevamente.");
                }
            });
        });

        $("#btnRechazar").off("click").on("click", function () {
            const idDocumento = item.id;
            const usuId = item.usu_id;
            const nuevoEstado = "rechazado";

            $.ajax({
                url: "/politicas/actualizar-estado",
                method: "PUT",
                data: { id: idDocumento, usuId: usuId, status: nuevoEstado },
                success: function(response) {
                    item.status = nuevoEstado;
                    const nuevoResultadoHTML = `<span class="text-danger"><i class="icon-times-circle"></i> Documento Rechazado</span>`;
                    $(".row div.col-sm-6:nth-child(2)").last().html(`<strong>Resultado:</strong><br>${nuevoResultadoHTML}`);
                    $("#botones-accion").hide();
                    toastr.success("Estado actualizado a rechazado correctamente.");
                    cargarValidaciones();
                },
                error: function() {
                    toastr.error("No se pudo actualizar el estado, intenta nuevamente.");
                }
            });
        });

    }



});
