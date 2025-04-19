$(document).ready(function () {
    var empresaId = $("#empresaId").val();
    var usuarioNivel = $("#usuarioNivel").val();
    let complementosSeleccionados = [];
    let editComplementosSeleccionados = [];

    if (usuarioNivel === "ADMINISTRADOR") {
        cargarEmpresas("empresaSelect"); //para registrar
        cargarEmpresas("empresaSelection"); //para poder elegir la empresa a listar sus productos
        $('#empresaSelection').on('change', function () {
            var empId = $(this).val();
            if (empId) {
                console.log("id de la empresa seleccionado", empId);
                cargarProductos(empId);
            } else {
                $('#detalle-container').empty();
            }
        });

    } else if (usuarioNivel !== "ADMINISTRADOR") {
        if (empresaId) { // Verifica que empresaId no sea nulo o vacío
            listarCategoria(empresaId);
            cargarProductos(empresaId);
        } else {
            toastr.error("Error: empresaId no está definido para el usuario no administrador.");
        }
    }

    function cargarEmpresas(selectorId, callback) {
        $.ajax({
            url: '/kenpis/empresas/find-all/empresas',
            method: 'GET',
            success: function (empresas) {
                const seleccionarEmpresa = $(`#${selectorId}`);
                seleccionarEmpresa.empty();
                seleccionarEmpresa.append('<option value="" disabled selected>Seleccione una Empresa</option>');

                empresas.forEach(function (empresa) {
                    seleccionarEmpresa.append('<option value="' + empresa.empId + '">' + empresa.empNombreComercial + '</option>');
                });

                seleccionarEmpresa.change(function () {
                    const empIdSeleccionado = $(this).val();
                    listarCategoria(empIdSeleccionado);
                });
                if (typeof callback === "function") {
                    callback();
                }
            },
            error: function (error) {
                console.error('Error al cargar las empresas:', error);
            }
        });
    }

    function listarCategoria(empresaId, callback) {
        $.ajax({
            url: '/kenpis/producto/categorias',
            method: 'GET',
            data: {empId: empresaId},
            success: function (data) {
                if (data.status === "success") {
                    var seleccionarCategoria = $('#categoria');
                    var editCategoria = $('#editCategoria');
                    var complementosContainer = $('#complementos-container');
                    var editComplementosContainer = $('#editComplementosContainer');

                    seleccionarCategoria.empty().append('<option value="" disabled selected>Seleccionar Categoria</option>');
                    editCategoria.empty().append('<option value="" disabled selected>Seleccionar Nueva Categoria</option>');
                    complementosContainer.empty();
                    editComplementosContainer.empty();

                    // Llenar categorías
                    if (Array.isArray(data.categorias)) {
                        data.categorias.forEach(function (categoria) {
                            var opcion = `<option value="${categoria.proId}">${categoria.proCategoria}</option>`;
                            seleccionarCategoria.append(opcion);
                            editCategoria.append(opcion);
                        });
                    } else {
                        console.warn("No hay categorías disponibles para mostrar.");
                    }

                    // Llenar complementos
                    if (Array.isArray(data.complementos)) {
                        construirComplementos(data.complementos, complementosContainer, complementosSeleccionados);
                        construirComplementos(data.complementos, editComplementosContainer, editComplementosSeleccionados);
                    } else {
                        console.warn("No hay complementos disponibles para mostrar.");
                        complementosContainer.append('<p>No hay complementos disponibles.</p>');
                    }

                    if (callback) callback();
                } else {
                    toastr.error("Error en la respuesta del servidor.");
                }
            },
            error: function (error) {
                console.error("Error al obtener las categorías y complementos:", error);
                toastr.error("Error al cargar las categorías y complementos.");
            }
        });
    }

    function construirComplementos(complementos, contenedor, complementosSeleccionados) {

        contenedor.empty();
        complementos.forEach(function (complemento) {
            var complementoContainer = $('<div class="complemento-section"></div>');
            var complementoNombre = $('<h6></h6>').text(complemento.proCompNombre);

            var switchLabel = $('<label>').addClass('switch-complemento');
            var inputSwitch = $('<input>')
                .attr({
                    type: 'checkbox',
                    class: 'complemento-checkbox',
                    'data-id': complemento.proCompId
                })
                .prop('checked', complementosSeleccionados.includes(complemento.proCompId))
                .on('change', function () {
                    const complementoId = $(this).data('id');
                    if ($(this).is(':checked')) {
                        if (!complementosSeleccionados.includes(complementoId)) {
                            complementosSeleccionados.push(complementoId);
                        }
                    } else {
                        complementosSeleccionados = complementosSeleccionados.filter(id => id !== complementoId);
                    }
                    console.log("Complementos seleccionados actualizados:", complementosSeleccionados);
                });

            var sliderSpan = $('<span>').addClass('slider-complemento');
            switchLabel.append(inputSwitch).append(sliderSpan);

            var subcomplementosList = $('<small></small>');
            if (complemento.subComplementos) {
                var subcomplementos = Array.isArray(complemento.subComplementos) ? complemento.subComplementos.join(', ') : complemento.subComplementos;
                subcomplementosList.text(subcomplementos);
            }

            var headerContainer = $('<div class="complemento-header d-flex justify-content-between align-items-center"></div>');
            headerContainer.append(complementoNombre).append(switchLabel);

            complementoContainer.append(headerContainer).append(subcomplementosList);
            contenedor.append(complementoContainer);
        });

        console.log("Finalizado construirComplementos. Complementos deberían estar en el DOM ahora.");
    }


    function cargarProductos(empresaId) {
        $.ajax({
            type: 'GET',
            url: `/kenpis/producto/find-all-is-active/${empresaId}`,
            contentType: 'application/json',
            success: function (response) {
                if (response.status === "success") {
                    const productos = response.productos;

                    if (productos.length === 0) {
                        $('#productoBody').html('<tr><td colspan="5" class="text-center">No hay productos asociados a esta empresa.</td></tr>');
                        return;
                    }

                    var html = '';
                    productos.forEach(function (producto) {
                        html += '<tr id="product-row-' + producto.proId + '">' +
                            '<td style="display: flex; align-items: center;">' +
                            '   <img src="' + producto.proImagen + '" alt="Logo" style="width: 50px; height: 50px; margin-right: 10px;">' +
                            '   <span>' + producto.proDescripcion + '</span>' +
                            '</td>' +
                            '<td>S/. ' + producto.proPrecioCosto + '</td>' +
                            '<td>S/. ' + producto.proPrecioVenta + '</td>' +
                            '<td>' +
                            '   <label class="switch">' +
                            '       <input type="checkbox" class="estado-checkbox" data-id="' + producto.proId + '" ' + (producto.proIsActive ? 'checked' : '') + '>' +
                            '       <span class="slider"></span>' +
                            '   </label>' +
                            '</td>' +
                            '<td>' +
                            '   <button type="button" data-id="' + producto.proId + '" class="btn btn-sm btn-warning editarProducto" data-toggle="tooltip" data-placement="top" title="Editar Producto">' +
                            '       <i class="fas fa-pencil-alt"></i>' +
                            '   </button>' +
                            '   <button type="button" data-id="' + producto.proId + '" class="btn btn-sm btn-danger eliminarProducto" data-toggle="tooltip" data-placement="top" title="Eliminar Producto">' +
                            '       <i class="fas fa-trash"></i>' +
                            '   </button>' +
                            '</td>' +
                            '</tr>';
                    });

                    $('#productoBody').html(html);

                    $('.eliminarProducto').click(function (event) {
                        event.preventDefault();
                        var proId = $(this).data('id');
                        eliminarProducto(proId);
                    });

                    $('.editarProducto').click(function (event) {
                        event.preventDefault();
                        var proId = $(this).data('id');
                        editarProducto(proId);
                    });
                } else {
                    toastr.error('No se pudieron cargar los productos. Inténtelo de nuevo.');
                }
            },
            error: function () {
                toastr.error('Error al cargar los productos.');
            }
        });
    }

    $('#imagenProducto').on('change', function () {
        var file = this.files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imagenPreview').attr('src', e.target.result).css({width: '100px', height: '100px'}).show();
                    $('#cargarImagenProducto').hide();
                    $('#editarProductoImageLogo').show();
                };
                reader.readAsDataURL(file);
            } else {
                toastr.error('Solo se permiten imágenes en formato PNG o JPG.');
                $('#imagenProducto').val('');
                $('#imagenPreview').hide();
                $('#editarProductoImageLogo').hide();
                $('#cargarImagenProducto').show();
            }
        } else {
            $('#imagenPreview').hide();
            $('#editarProductoImageLogo').hide();
            $('#cargarImagenProducto').show();
        }
    });

    $('#imagenCategoria').on('change', function () {
        var file = this.files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#categoriaImagenPrevia').attr('src', e.target.result).css({width: '100px', height: '100px'}).show();
                };
                reader.readAsDataURL(file);
            } else {
                toastr.error('Solo se permiten imágenes en formato PNG o JPG.');
                $('#imagenCategoria').val('');
                $('#categoriaImagenPrevia').hide();
            }
        } else {
            $('#categoriaImagenPrevia').hide();
        }
    });


    $('#agregarNuevaCategoria').click(function () {
        $('#nuevaCategoria').toggle();
    });

    $('#cerrarNuevaCategoria').click(function () {
        $('#nuevaCategoria').hide();
        $('#ingresarNombreCategoria').val('');
        $('#imagenCategoria').val('');
        $('#categoriaImagenPrevia').hide();
    });

    $('#guardarCategoriaBtn').click(function (event) {
        event.preventDefault();
        var selectedEmpresaId = usuarioNivel === "ADMINISTRADOR" ? $('#empresaSelect').val() : empresaId;
        var categoriaData = {
            proCategoria: $('#ingresarNombreCategoria').val(),
            proImagen: $('#categoriaImagenPrevia').attr('src'),
            empId: selectedEmpresaId
        };

        $.ajax({
            url: '/kenpis/producto/create/categoria',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(categoriaData),
            success: function (response) {
                toastr.success('Categoría creada correctamente.');
                $('#nuevaCategoria').hide();
                $('#ingresarNombreCategoria').val('');
                $('#imagenCategoria').val('');
                $('#categoriaImagenPrevia').hide();
                listarCategoria(selectedEmpresaId);
            },
            error: function () {
                toastr.error('Error al crear la categoría. Intente nuevamente.');
            }
        });
    });


    $('#registrarProducto').click(function (event) {
        event.preventDefault();
        let complementosSeleccionadosString = complementosSeleccionados.join(',');

        var selectedEmpresaId = $('#empresaSelect').val() || empresaId;

        var productoData = {
            proCategoria: $('#nombreProducto').val(),
            proPrecioCosto: $('#precioProductoCosto').val(),
            proPrecioVenta: $('#precioProductoVenta').val(),
            padreId: $('#categoria').val(),
            proComplementos: complementosSeleccionadosString,
            proDescripcion: $('#descripcionProducto').val(),
            proImagen: $('#imagenPreview').attr('src'),
            proImagenLongitud: 'no tiene logo',
            empId: selectedEmpresaId
        };

        $.ajax({
            url: '/kenpis/producto/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(productoData),
            success: function (response) {
                toastr.success('Producto registrado correctamente.');
                $('#createProductModal').modal('hide');
                cargarProductos(selectedEmpresaId);
            },
            error: function () {
                toastr.error('Error al registrar el producto. Intente nuevamente.');
            }
        });
    });

    $('#editImagenProducto').on('change', function () {
        var file = this.files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#editImagenPreview').attr('src', e.target.result)
                        .css({width: '100px', height: '100px'})
                        .show();
                };
                reader.readAsDataURL(file);
            } else {
                toastr.error('Solo se permiten imágenes en formato PNG o JPG.');
                $('#editImagenProducto').val('');
                $('#editImagenPreview').hide();
            }
        } else {
            $('#editImagenPreview').hide();
        }
    });

// Al hacer clic en el botón para abrir el selector de archivos
    $('#editImagenPreview').on('click', function () {
        $('#editImagenProducto').trigger('click');
    });

    function editarProducto(proId) {
        console.log("Iniciando editarProducto con ID:", proId);
        $.ajax({
            url: `/kenpis/producto/find-by-id/${proId}`,
            method: 'GET',
            success: function (response) {
                if (response.status === "success") {
                    var producto = response.findById;

                    $('#editProductId').val(producto.proId);
                    $('#editNombreProducto').val(producto.proCategoria);
                    $('#editPrecioProductoCosto').val(producto.proPrecioCosto);
                    $('#editPrecioProductoVenta').val(producto.proPrecioVenta);
                    $('#editCategoria').val(producto.padreId);
                    $('#editDescripcionProducto').val(producto.proDescripcion);

                    if (producto.proImagen) {
                        $('#editImagenPreview').attr('src', producto.proImagen).css({width: '100px', height: '100px'}).show();
                    } else {
                        $('#editImagenPreview').hide();
                    }

                    let selectedEmpresaId = producto.empId;
                    let selectedCategoriaId = producto.padreId;

                    cargarEmpresas("editEmpresaSelect", function () {
                        $('#editEmpresaSelect').val(selectedEmpresaId);

                        // Luego de cargar y seleccionar la empresa, cargar categorías
                        listarCategoria(selectedEmpresaId, function () {
                            $('#editCategoria').val(selectedCategoriaId);
                        });
                    });


                    editComplementosSeleccionados = producto.proComplementos ? producto.proComplementos.split(',').map(Number) : [];
                    // Llamar a construirComplementos con los complementos obtenidos y los seleccionados
                    construirComplementos(response.complementos, $('#editComplementosContainer'), editComplementosSeleccionados);

                    $('#editProductModal').modal('show');
                } else {
                    toastr.error('No se pudo obtener la información del producto.');
                }
            },
            error: function () {
                toastr.error('Error al obtener los detalles del producto.');
            }
        });
    }

    $('#editarProductoForm').submit(function (event) {
        event.preventDefault();

        editComplementosSeleccionados = $('#editComplementosContainer .complemento-checkbox:checked')
            .map(function () {
                return $(this).data('id');
            }).get();

        var empresa;
        if (usuarioNivel === "ADMINISTRADOR") {
            empresa = $('#editEmpresaSelect').val();
        } else if (usuarioNivel !== "ADMINISTRADOR") {
            empresa = empresaId;
        }
        var productoData = {
            empId: empresa,
            proId: $('#editProductId').val(),
            proCategoria: $('#editNombreProducto').val(),
            proPrecioCosto: $('#editPrecioProductoCosto').val(),
            proPrecioVenta: $('#editPrecioProductoVenta').val(),
            padreId: $('#editCategoria').val(),
            proDescripcion: $('#editDescripcionProducto').val(),
            proImagen: $('#editImagenPreview').attr('src'),
            proComplementos: editComplementosSeleccionados.join(',')
        };

        console.log("Datos de producto a enviar en PUT:", productoData);
        $.ajax({
            url: `/kenpis/producto/update`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(productoData),
            success: function () {
                $('#editProductModal').modal('hide');
                toastr.success('Producto actualizado correctamente.');
                cargarProductos(empresa);
            },
            error: function () {
                toastr.error('Error al actualizar el producto. Intente nuevamente.');
            }
        });
    });

    function eliminarProducto(proId) {
        $('#confirmDeleteButton').data('id', proId);
        $('#confirmDeleteModal').modal('show');
    }
    $('#confirmDeleteButton').click(function () {
        var proId = $(this).data('id');
        $.ajax({
            url: `/kenpis/producto/delete/${proId}`,
            method: 'DELETE',
            success: function () {
                toastr.success('Producto eliminado correctamente.');
                cargarProductos(empresaId);
                $('#confirmDeleteModal').modal('hide');
            },
            error: function () {
                toastr.error('Error al eliminar el producto. Intente nuevamente.');
            }
        });
    });


    $(document).on('change', '.estado-checkbox', function () {
        var checkbox = $(this);
        var productId = checkbox.data('id');
        var isActive = checkbox.is(':checked');
        $.ajax({
            url: '/kenpis/producto/update/status',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                proId: productId,
                proIsActive: isActive
            }),
            success: function () {
                toastr.success('Estado del producto actualizado correctamente.');
            },
            error: function () {
                toastr.error('Error al actualizar el estado del producto. Intente nuevamente.');
            }
        });
    });
});
