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

        data.forEach(function (item) {
            var row = `
            <tr data-id="${item.id}" data-status="${item.status}" data-diffs='${JSON.stringify(item.comparacion.diferencias)}' data-reason="${item.rechazo_motivo || ''}">
                <td>${item.nombre}</td>
                <td>${item.comparacion.diferencias[0]?.documento || ''}</td>
                <td>${item.fecha_proceso}</td>
                <td><span class="historial-badge ${item.status === 'aprobado' ? 'badge-aprobado' : item.status === 'rechazado' ? 'badge-rechazado' : 'badge-enrevision'}">${item.status}</span></td>
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

        // Crear el HTML con los detalles
        var detalles = `
        <h3>Detalles del Documento</h3>
        <p><strong>Nombre:</strong> ${item.nombre}</p>
        <p><strong>Fecha de Proceso:</strong> ${item.fecha_proceso}</p>
        <p><strong>Estado:</strong> ${item.status}</p>
        <p><strong>Total Fragmentos:</strong> ${item.resumen.total_fragmentos}</p>
        <p><strong>Diferencias Detectadas:</strong> ${item.resumen.diferencias_detectadas}</p>
        <p><strong>Criticas:</strong> ${item.resumen.criticas}</p>
        <h4>Diferencias</h4>
        <ul>
            ${item.comparacion.diferencias.map(function (diferencia) {
            // Aplicamos el cambio solo si el estado es 'rechazado'
            if (item.status === 'rechazado') {
                // Verificamos si 'evidencia' está definida, de lo contrario mostramos 'N/A'
                var evidencia = diferencia.evidencia || 'N/A';
                return `
                        <li>
                            <strong>${diferencia.resultado}</strong>: ${diferencia.descripcion} (Gravedad: ${diferencia.gravedad})
                            <br><strong>Evidencia:</strong> ${evidencia}
                        </li>
                    `;
            } else {
                // Si no es rechazado, simplemente mostramos las diferencias sin 'evidencia'
                return `<li><strong>${diferencia.resultado}</strong>: ${diferencia.descripcion} (Gravedad: ${diferencia.gravedad})</li>`;
            }
        }).join('')}
        </ul>
    `;

        // Mostrar el modal adecuado basado en el estado del documento
        if (item.status === 'aprobado') {
            $('#md-doc').text(item.nombre);
            $('#md-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#md-date').text(item.fecha_proceso);
            $('#md-status').text(item.status);
            $('#md-download').attr('href', '/descargar?file=' + encodeURIComponent(item.nombre));
            $('#detalleModal').modal('show');
        } else if (item.status === 'en_revision') {
            $('#mdr-doc').text(item.nombre);
            $('#mdr-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#mdr-date').text(item.fecha_proceso);
            $('#mdr-status').text(item.status);
            var $list = $('#mdr-list').empty();
            item.comparacion.diferencias.forEach(function (diff) {
                $list.append(`
                <div class="revision-item">
                    <div class="details">
                        <strong>${diff.clause}</strong>
                        <small>${diff.diff}</small>
                    </div>
                    <div class="page-badge">Pág. ${diff.page}</div>
                </div>
            `);
            });
            $('#detalleModalRevision').modal('show');
        } else if (item.status === 'rechazado') {
            $('#mdrej-doc').text(item.nombre);
            $('#mdrej-ref').text(item.comparacion.diferencias[0]?.documento || 'N/A');
            $('#mdrej-date').text(item.fecha_proceso);
            $('#mdrej-status').text(item.status);
            $('#mdrej-reason').text(item.rechazo_motivo);  // Mostrar el motivo de rechazo
            var $listR = $('#mdrej-list').empty();
            item.comparacion.diferencias.forEach(function (diff) {
                $listR.append(`
                <div class="revision-item">
                    <div class="details">
                        <strong>${diff.clause}</strong>
                        <small>${diff.diff}</small> 
                    </div>
                    <div class="page-badge">Pág. ${diff.page}</div>
                </div>
            `);
            });
            $('#detalleModalRechazado').modal('show');
        }
    }

});
