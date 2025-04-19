$(document).ready(function () {
    const containerIds = ['REGISTRADO', 'EN_PROCESO', 'PAGADO', 'ATENDIDO'];

    containerIds.forEach(id => {
        new Sortable(document.getElementById(id), {
            group: 'shared',
            animation: 150,
            onEnd: function (evt) {
                const itemEl = evt.item;
                const newParent = evt.to.id;
                const venEstadoId = itemEl.getAttribute('data-venEstadoId');

                console.log(`Moved ${venEstadoId} to ${newParent}`);

                $.ajax({
                    url: '/kenpis/venta/estado/update',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        venEstadoId: venEstadoId,
                        venEstado: newParent
                    }),
                    success: function (data) {
                        console.log('Movimiento registrado:', data);
                        updateDashboardCounts();
                    },
                    error: function (xhr, status, error) {
                        console.error('Error al registrar el movimiento:', error);
                    }
                });
            }
        });
    });

    function updateDashboardCounts() {
        $.ajax({
            url: '/kenpis/venta/estado/count',
            method: 'GET',
            success: function (data) {
                $('#registradoCount').text(data.REGISTRADO);
                $('#enProcesoCount').text(data.EN_PROCESO);
                $('#pagadoCount').text(data.PAGADO);
                $('#atendidoCount').text(data.ATENDIDO);
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar los contadores:', error);
            }
        });
    }
});
