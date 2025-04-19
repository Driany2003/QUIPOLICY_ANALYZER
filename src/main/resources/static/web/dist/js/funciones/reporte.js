$(document).ready(function () {
    window.ventasChart = null;

    $('#generarReporteBtn').click(function () {
        var empresaId = $('#empresaId').val();
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();

        // Si la validación es exitosa, llama a generarReporte
        if (validarFechas(fechaInicio, fechaFin)) {
            generarReporte(fechaInicio, fechaFin, empresaId);
        }
    });

    function validarFechas(fechaInicio, fechaFin) {
        if (!fechaInicio || !fechaFin) {
            toastr.error("Por favor, selecciona ambas fechas para generar el reporte.");
            return false;
        }

        if (new Date(fechaFin) < new Date(fechaInicio)) {
            $('#reporteModal').modal('hide');
            toastr.error("La fecha de fin no puede ser anterior a la fecha de inicio.");
            return false;

        }

        return true;
    }

    function generarReporte(fechaInicio, fechaFin, empresaId) {
        // Actualiza las fechas en el modal
        $('#fechaInicioText').text(fechaInicio);
        $('#fechaFinText').text(fechaFin);

        $.ajax({
            url: '/kenpis/venta/reporte/filtroXfecha',
            type: 'GET',
            data: {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                empresaId: empresaId
            },
            success: function (data) {
                if (!data || data.numeroVentas === 0) {
                    toastr.error("No se encontraron datos para las fechas seleccionadas.");
                    return;
                }

                // Mostrar el modal solo si hay datos válidos
                $('#reporteModal').modal('show');

                // Actualiza los datos del reporte en el modal
                $('#totalVenta').text(`S/ ${data.totalVenta.toFixed(2)}`);
                $('#totalCosto').text(`S/ ${data.totalCosto.toFixed(2)}`);
                $('#gananciaTotal').text(`S/ ${data.gananciaTotal.toFixed(2)}`);
                $('#numeroVentas').text(data.numeroVentas);
                $('#totalYape').text(`S/ ${data.totalYape.toFixed(2)}`);
                $('#totalPlin').text(`S/ ${data.totalPlin.toFixed(2)}`);
                $('#totalEfectivo').text(`S/ ${data.totalEfectivo.toFixed(2)}`);
                $('#totalTarjeta').text(`S/ ${data.totalTarjeta.toFixed(2)}`);

                const productosTableBody = $('#productosMasVendidos');
                productosTableBody.empty();

                const nombresProductos = [];
                const popularidades = [];
                const colores = ['#4EA8DE', '#4CD62B', '#FF6B6B', '#FFC107', '#A3D4FF', '#E6C8FF', '#FFD1C1'];

                data.productosMasVendidos.forEach(function (producto, index) {
                    nombresProductos.push(producto.productoNombre);
                    popularidades.push(producto.popularidad);

                    const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${producto.productoNombre}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${producto.popularidad}%; background-color: ${colores[index % colores.length]};"></div>
                            </div>
                        </td>
                        <td>${producto.popularidad}%</td>
                    </tr>
                `;
                    productosTableBody.append(row);
                });

                const ctx = document.getElementById('ventasChart').getContext('2d');

                if (window.ventasChart) {
                    window.ventasChart.destroy();
                }

                window.ventasChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: nombresProductos,
                        datasets: [{
                            data: popularidades,
                            backgroundColor: colores,
                            borderWidth: 2,
                            borderColor: '#ffffff',
                            hoverBorderColor: '#000000'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return `${context.label}: ${context.raw}%`;
                                    }
                                }
                            },
                            datalabels: {
                                display: true,
                                color: '#fff',
                                formatter: (value) => `${value}%`,
                                font: {
                                    weight: 'bold',
                                    size: 12
                                }
                            }
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        cutout: '70%' // Makes it a doughnut with a larger center hole for aesthetics
                    }
                });
            },
            error: function () {
                toastr.error("Ocurrió un error al generar el reporte. Intenta nuevamente.");
            }
        });
    }


    // Botón de imprimir
    $('.btn-group-custom button:contains("Imprimir")').click(function () {
        // Selecciona el contenido del modal que deseas imprimir
        var printContent = document.getElementById('reporteModal').innerHTML;

        // Crea una nueva ventana para la impresión
        var printWindow = window.open('', '', 'height=800,width=1000');

        // Inserta el contenido del modal en la nueva ventana
        printWindow.document.write('<html><head><title>Reporte de Ventas</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
        printWindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">');

        // Añadir estilos específicos para impresión
        printWindow.document.write(`
            <style>
                /* Asegura el diseño en cuadrícula */
                .summary-cards {
                    display: grid !important;
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 10px;
                }
                .summary-card {
                    display: flex !important;
                    align-items: center;
                    padding: 15px;
                    border-radius: 12px;
                    color: #ffffff;
                    font-size: 16px;
                }
                .summary-card i {
                    font-size: 24px;
                    margin-right: 10px;
                }
                .card-content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                /* Ocultar los botones de exportar e imprimir */
                .btn-group-custom {
                    display: none !important;
                }
                /* Ajuste para que el gráfico mantenga su tamaño */
                #ventasChart {
                    max-width: 100% !important;
                    max-height: 100% !important;
                }
            </style>
        `);

        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');

        // Espera a que el contenido se cargue en la ventana de impresión y luego imprime
        printWindow.document.close();
        printWindow.focus();

        setTimeout(function () {
            printWindow.print();
            printWindow.close();
        }, 500);
    });

    // Botón de exportar a PDF
    $('.btn-group-custom button:contains("Exportar")').click(function () {
        // Abre el modal si está cerrado

        $('.btn-group-custom').hide();
        $('#productosMasVendidosSection').css({
            'transform': 'scale(0.8)',  // Reduce el tamaño al 80%
            'transform-origin': 'top left'  // Establece el punto de origen para el escalado
        });
        // Espera unos milisegundos para asegurar que esté completamente abierto antes de exportar
        setTimeout(function () {
            var element = document.getElementById('reporteModal');

            var opt = {
                margin: 0.1,
                filename: 'Reporte_Ventas.pdf',
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {scale: 2.3, useCORS: true},
                //html2canvas: {scale: 1, useCORS: true, windowWidth: 80,windowHeight : 80, width: 10, height : 10  },
                jsPDF: {unit: 'in', format: 'a4', orientation: 'landscape'}
            };

            html2pdf().set(opt).from(element).save().then(function () {
                $('.btn-group-custom').show();
                $('#productosMasVendidosSection').css({
                    'transform': 'scale(1)',  // Restaura el tamaño original
                    'transform-origin': 'initial'  // Restaura el origen
                });
            });
        }, 500); // Espera medio segundo para que el modal se muestre completamente

    });


// Llamar a la función al cargar la página con el empresaId de la sesión

});

    $(document).ready(function () {
        window.ventasChart = null;

        // Función para cargar reportes por empresa y habilitar/deshabilitar botones
        function cargarReportesPorEmpresa(empresaId) {
            $.ajax({
                url: '/kenpis/reporte/listar',
                method: 'GET',
                data: {empId: empresaId},
                success: function (reportes) {
                    $('#reportesBody').empty();

                    if (reportes.length > 0) {
                        reportes.forEach(function (reporte, index) {
                            const fechaFormateada = new Date(reporte.repFechaCreacion).toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            });
                            console.log("date", fechaFormateada);
                            const cajaYSucursal = `Caja ${reporte.cajaId} - ${reporte.sucursalNombre}`;
                            const fechaCreacion = `Fecha: ${fechaFormateada}`;
                            const estado = reporte.repIsActive ? "En Proceso" : " Terminado ";
                            const botonDisabled = reporte.repIsActive ? "disabled" : "";

                            const fila = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${cajaYSucursal}
                             <span style="display: block; margin-top: 5px; color: gray;">${fechaCreacion}</span>
                            </td>
                            <td>${estado}</td>
                            <td>
                                <button class="btn btn-primary btn-sm btn-generar-reporte" 
                                        data-caja-id="${reporte.cajaId}" 
                                        ${botonDisabled}>
                                    Generar Reporte
                                </button>
                            </td>
                        </tr>`;
                            $('#reportesBody').append(fila);
                        });
                    } else {
                        $('#reportesBody').append('<tr><td colspan="4">No hay reportes disponibles para esta empresa.</td></tr>');
                    }
                },
                error: function () {
                    toastr.error('Error al cargar los reportes.');
                }
            });
        }

        const empresaId = $('#empresaId').val();
        cargarReportesPorEmpresa(empresaId);

        // Evento de clic para los botones "Generar Reporte" habilitados
        $(document).on('click', '.btn-generar-reporte', function () {
            const cajaId = $(this).data('caja-id'); // Obtener cajaId del botón
            generarReportePorCaja(empresaId, cajaId);
        });

        function generarReportePorCaja(empresaId, cajaId) {
            $.ajax({
                url: '/kenpis/venta/reporte/filtro',
                type: 'GET',
                data: {cajaId: cajaId},
                success: function (data) {
                    if (!data || data.numeroVentas === 0) {
                        toastr.error("No se encontraron datos para la caja seleccionada.");
                        return;
                    }

                    // Abre el modal con los datos
                    $('#reporteModal').modal('show');
                    $('#totalVenta').text(`S/ ${data.totalVenta.toFixed(2)}`);
                    $('#totalCosto').text(`S/ ${data.totalCosto.toFixed(2)}`);
                    $('#gananciaTotal').text(`S/ ${data.gananciaTotal.toFixed(2)}`);
                    $('#numeroVentas').text(data.numeroVentas);
                    $('#totalYape').text(`S/ ${data.totalYape.toFixed(2)}`);
                    $('#totalPlin').text(`S/ ${data.totalPlin.toFixed(2)}`);
                    $('#totalEfectivo').text(`S/ ${data.totalEfectivo.toFixed(2)}`);
                    $('#totalTarjeta').text(`S/ ${data.totalTarjeta.toFixed(2)}`);

                    const productosTableBody = $('#productosMasVendidos');
                    productosTableBody.empty();

                    const nombresProductos = [];
                    const popularidades = [];
                    const colores = ['#4EA8DE', '#4CD62B', '#FF6B6B', '#FFC107', '#A3D4FF', '#E6C8FF', '#FFD1C1'];

                    data.productosMasVendidos.forEach(function (producto, index) {
                        nombresProductos.push(producto.productoNombre);
                        popularidades.push(producto.popularidad);

                        const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${producto.productoNombre}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${producto.popularidad}%; background-color: ${colores[index % colores.length]};"></div>
                            </div>
                        </td>
                        <td>${producto.popularidad}%</td>
                    </tr>`;
                        productosTableBody.append(row);
                    });

                    const ctx = document.getElementById('ventasChart').getContext('2d');

                    if (window.ventasChart) {
                        window.ventasChart.destroy();
                    }

                    window.ventasChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: nombresProductos,
                            datasets: [{
                                data: popularidades,
                                backgroundColor: colores,
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                hoverBorderColor: '#000000'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            return `${context.label}: ${context.raw}%`;
                                        }
                                    }
                                },
                                datalabels: {
                                    display: true,
                                    color: '#fff',
                                    formatter: (value) => `${value}%`,
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    }
                                }
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            },
                            cutout: '70%'
                        }
                    });
                },
                error: function () {
                    toastr.error("Ocurrió un error al generar el reporte. Intenta nuevamente.");
                }
            });
        }
    });







