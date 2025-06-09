$(document).ready(function () {
    var globalData = [];
    // Llamada a la función para listar los datos
    listarHistorial();

    // Función para listar el historial
    function listarHistorial() {
        var usuId = $('#usuId').val();
        $.ajax({
            url: `/politicas/listar-historial/${usuId}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                globalData = data;
                llenarTabla(data);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener los datos: ', error);
            }
        });
    }

    // Función para llenar la tabla con los datos
    function llenarTabla(data) {
        $("#tableBody").empty();

        if (!data || data.length === 0) {
            $("#tableBody").append(`
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">
                    <i class="fas fa-info-circle mr-2"></i> No se encontraron documentos analizados para mostrar.
                </td>
            </tr>
        `);
            return;
        }

        data.forEach(function (item) {
            var row = `
            <tr data-id="${item.id}" data-status="${item.status}" data-diffs='${JSON.stringify(item.comparacion.diferencias)}' data-reason="${item.rechazo_motivo || ''}">
                <td>${item.nombre}</td>
                <td>${item.comparacion.diferencias[0]?.documento || ''}</td>
                <td>${item.fecha_proceso}</td>
                <td><span class="historial-badge ${item.status === 'aprobado' ? 'badge-aprobado' : item.status === 'rechazado' ? 'badge-rechazado' : 'badge-pendiente'}">${item.status}</span></td>
                <td><i class="fas fa-check-circle ${item.status === 'aprobado' ? 'text-validado' : 'text-diferencias'}"></i><span class="${item.status === 'aprobado' ? 'text-validado' : 'text-diferencias'}">${item.status === 'aprobado' ? 'Validado' : item.comparacion.diferencias.length + ' diferencias'}</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-link text-secondary verDetalles" data-id="${item.id}">Ver detalles</button>
                </td>
            </tr>
        `;
            $("#tableBody").append(row);
        });

        // Asociar el evento 'click' a los botones de 'Ver detalles'
        $('.verDetalles').click(function (event) {
            event.preventDefault();
            var detalleId = $(this).data('id');
            verDetalles(detalleId);
        });
    }

    function verDetalles(detalleId) {
        var item = globalData.find(function (item) {
            return item.id === detalleId;
        });

        // Mostrar el modal adecuado basado en el estado del documento
        if (item.status === 'aprobado') {
            $('#md-doc').text(item.nombre);
            $('#md-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#md-date').text(item.fecha_proceso);
            $('#md-status').text(item.status);
            $('#md-download').attr('href', '/descargar?file=' + encodeURIComponent(item.nombre));
            $('#detalleModal').modal('show');
        } else if (item.status === 'pendiente') {
            $('#mdr-doc').text(item.nombre);
            $('#mdr-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#mdr-date').text(item.fecha_proceso);
            $('#mdr-status').text(item.status);
            var $listR = $('#mdr-list').empty();
            item.comparacion.diferencias.forEach(function (diferencia) {
                var evidenciaText = diferencia.evidencia ? diferencia.evidencia : 'No hay evidencia disponible.';
                $listR.append(`
                    <div class="revision-item">
                        <div class="details">
                            <strong>${diferencia.descripcion}</strong><br> <small>${evidenciaText}</small> </div>
                        <div class="page-badge">Pág. ${diferencia.page || 'N/A'}</div>
                    </div>
                `);
            });
            $('#detalleModalRevision').modal('show');
        } else if (item.status === 'rechazado') {
            var descripcionRechazo = " Múltiples cláusulas modificadas que alteran significativamente los términos legales. Se requiere revisión por el departamento legal.\n"
            $('#mdrej-doc').text(item.nombre);
            $('#mdrej-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#mdrej-date').text(item.fecha_proceso);
            $('#mdrej-status').text(item.status);
            $('#mdrej-reason').text(descripcionRechazo);
            var $listR = $('#mdrej-list').empty();
            item.comparacion.diferencias.forEach(function (diferencia) { // Renamed 'diff' to 'diferencia' for clarity
                var evidenciaText = diferencia.evidencia ? diferencia.evidencia : 'No hay evidencia disponible.';

                $listR.append(`
                    <div class="revision-item">
                        <div class="details">
                            <strong>${diferencia.descripcion}</strong><br> <small>${evidenciaText}</small> </div>
                        <div class="page-badge">Pág. ${diferencia.page || 'N/A'}</div>
                    </div>
                `);
            });
            $('#detalleModalRechazado').modal('show');
        }
    }

});
