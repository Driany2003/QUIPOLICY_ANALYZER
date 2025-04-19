$(document).ready(function () {
    cargarClientes();
    var empresaId = $("#empresaId").val();
    var usuarioNivel = $("#usuarioNivel").val();

    function cargarClientes() {
        var empresaId = $("#empresaId").val();
        if (!empresaId) {
            alert("No se ha definido el ID de la empresa.");
            return;
        } else {
            $.ajax({
                url: '/kenpis/cliente/cargar-clientes',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({empId: empresaId}),
                success: function (response) {
                    const clientes = response.data;
                    let tableBody = '';

                    clientes.forEach(function (cliente, index) {
                        tableBody += '<tr>' +
                            '<th scope="row">' + (index + 1) + '</th>' +
                            '<td>' + (cliente.cliTelefono || '') + '</td>' +
                            '<td>' + (cliente.cliNombre || '') + '</td>' +
                            '<td>' + (cliente.cliCorreo || '') + '</td>' +
                            '<td>' + (cliente.cliNotificacion ? 'Sí' : 'No') + '</td>' +
                            '<td>' + (cliente.cliIsActive ? 'Activo' : 'Inactivo') + '</td>' +
                            '<td>' + (cliente.empNombreComercial || '') + '</td>' +
                            '<td>' +
                            '<button type="button" data-id="' + (cliente.cliId || '') + '" class="btn btn-sm btn-warning editarCliente" data-toggle="tooltip" data-placement="top" title="Editar Cliente">' +
                            '<i class="fas fa-pencil-alt"></i>' +
                            '</button>' +
                            '<span> </span>' +
                            '<button type="button" data-id="' + (cliente.cliId || '') + '" class="btn btn-sm btn-danger eliminarCliente" data-toggle="tooltip" data-placement="top" title="Eliminar Cliente">' +
                            '<i class="fas fa-trash"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';
                    });

                    $('#clientesBody').html(tableBody);

                    $('.eliminarCliente').click(function (event) {
                        event.preventDefault();
                        var cliId = $(this).data('id');
                        eliminarCliente(cliId);
                    });
                    $('.editarCliente').click(function (event) {
                        event.preventDefault();
                        var cliId = $(this).data('id');
                        editarCliente(cliId);
                    });
                    if (usuarioNivel === "ADMINISTRADOR" && response.empresasList) {
                        listarEmpresasAdmin(response.empresasList, 'cliente_empresa');
                    }
                },
                error: function (error) {
                    alert("Ocurrió un error al cargar los clientes.");
                }
            });
        }
    }

    function listarEmpresasAdmin(empresas, selectElementId) {
        let options = '';
        empresas.forEach(function (empresa) {
            options += '<option value="' + empresa.empId + '">' + empresa.empNombreComercial + '</option>';
        });
        $('#' + selectElementId).html(options);
    }

    // Función para registrar un nuevo cliente
    $('#registrarCliente').on('click', function () {
        var empId = (usuarioNivel === "ADMINISTRADOR") ? $('#cliente_empresa').val() : empresaId;

        var notificacionValue = $('input[name="cli_notificacion"]:checked').val() === "Sí" ? true : false;

        var clienteData = {
            empId: empId,
            cliNombre: $('#cliente_nombre').val().toUpperCase(),
            cliTelefono: $('#cliente_telefono').val(),
            cliCorreo: $('#cliente_correo').val(),
            cliNotificacion: notificacionValue
        };

        // Validar campo vacío
        function validarCampoVacio(selector) {
            const campo = $(selector);
            if (campo.val().trim() === '') {
                campo.addClass('is-invalid');
                return false;
            } else {
                campo.removeClass('is-invalid');
                return true;
            }
        }

        // Validación de campos
        function validarEmail() {
            const email = $('#cliente_correo').val();
            if (!/\S+@\S+\.\S+/.test(email)) {
                $('#cliente_correo').addClass('is-invalid');
                $('#emailError').remove(); // Limpiar error anterior
                $('#cliente_correo').after('<div id="emailError" class="text-danger">Correo electrónico inválido.</div>'); // Mostrar nuevo error
                return false;
            } else {
                $('#cliente_correo').removeClass('is-invalid');
                $('#emailError').remove();
                return true;
            }
        }

        // Validación de teléfono
        function validarTelefono() {
            const phone = $('#cliente_telefono').val();
            if (phone.length !== 9) {
                $('#cliente_telefono').addClass('is-invalid');
                $('#telefonoError').remove();
                $('#cliente_telefono').after('<div id="telefonoError" class="text-danger">El teléfono debe tener 9 dígitos.</div>'); // Mostrar nuevo error
                return false;
            } else {
                $('#cliente_telefono').removeClass('is-invalid');
                $('#telefonoError').remove();
                return true;
            }
        }

        // Validar selección de notificación
        function validarNotificacion() {
            if (!$('input[name="cli_notificacion"]:checked').val()) {
                $('#notificacionError').remove();
                $('#cli_notificacion_group').after('<div id="notificacionError" class="text-danger">Por favor, seleccione una opción de notificación.</div>');
                return false;
            } else {
                $('#notificacionError').remove();
                return true;
            }
        }

        // Validar selección del combo box de empresa
        function validarComboBox() {
            if (usuarioNivel === "ADMINISTRADOR" && $('#cliente_empresa').val() === "") {
                $('#cliente_empresa').addClass('is-invalid');
                $('#empresaError').remove();
                $('#cliente_empresa').after('<div id="empresaError" class="text-danger">Por favor, seleccione una empresa.</div>');
                return false;
            } else {
                $('#cliente_empresa').removeClass('is-invalid');
                $('#empresaError').remove();
                return true;
            }
        }

        // Validar todos los campos
        function validarFormulario() {
            const nombreValido = validarCampoVacio('#cliente_nombre');
            const telefonoValido = validarTelefono();
            const correoValido = validarEmail();
            const notificacionValido = validarNotificacion();
            const comboBoxValido = validarComboBox();

            return nombreValido && telefonoValido && correoValido && notificacionValido && comboBoxValido;
        }

        if (validarFormulario()) {
            $.ajax({
                url: '/kenpis/cliente/create',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function () {
                    $('#crearClienteModal').modal('hide');
                    $('.modal-backdrop').remove();
                    $('#clienteForm')[0].reset();
                    toastr.success("Cliente creado exitosamente.");
                    cargarClientes();
                },
                error: function (error) {
                    console.error("Error al crear el cliente:", error);
                    toastr.error('Ocurrió un error al crear el cliente.');
                }
            });
        } else {
            toastr.error("Por favor, complete todos los campos requeridos correctamente. Verifique el formato de correo electrónico y teléfono.");
        }
    });

    // función para editar
    function editarCliente(cliId) {
        $.ajax({
            url: `/kenpis/cliente/find-by-id/${cliId}`,
            method: 'GET',
            success: function (response) {
                let cliente = response.cliente;
                console.log("datos recuperados", cliente);
                $('#cliId').val(cliente.cliId);
                $('#cliente_nombre_edit').val(cliente.cliNombre);
                $('#cliente_telefono_edit').val(cliente.cliTelefono);
                $('#cliente_correo_edit').val(cliente.cliCorreo);
                $('#cliente_activo_edit').val(cliente.cliIsActive ? "true" : "false");

                if (cliente.cliNotificacion === true) {
                    $('#cliente_notificacion_edit_si').prop('checked', true);
                } else {
                    $('#cliente_notificacion_edit_no').prop('checked', true);
                }

                if (usuarioNivel === "ADMINISTRADOR" && response.empresasList) {
                    listarEmpresasAdmin(response.empresasList, 'cliente_empresa_edit');
                    $('#cliente_empresa_edit').val(cliente.empId);
                } else if (usuarioNivel === "PROPIETARIO") {
                    $('#cliente_empresa_edit').val(cliente.empId);
                }

                $('#editarClienteModal').modal('show');
            },
            error: function () {
                toastr.error("Ocurrió un error al cargar el cliente para editar.");
            }
        });
    }

    // Función para validar campos vacíos (similar a la del registro)
    function validarNombre() {
        const nombre = $('#cliente_nombre_edit').val().trim();
        if (nombre.length === 0) {
            $('#cliente_nombre_edit').addClass('is-invalid');
            $('#nombreErrorEdit').remove();
            $('#cliente_nombre_edit').after('<div id="nombreErrorEdit" class="text-danger">El nombre no puede estar vacío.</div>');
            return false;
        } else {
            $('#cliente_nombre_edit').removeClass('is-invalid');
            $('#nombreErrorEdit').remove();
            return true;
        }
    }

    // Validación de correo electrónico
    function validarEmail() {
        const email = $('#cliente_correo_edit').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar el email
        if (!emailRegex.test(email)) {
            $('#cliente_correo_edit').addClass('is-invalid');
            $('#emailErrorEdit').remove();
            $('#cliente_correo_edit').after('<div id="emailErrorEdit" class="text-danger">El correo electrónico no es válido.</div>');
            return false;
        } else {
            $('#cliente_correo_edit').removeClass('is-invalid');
            $('#emailErrorEdit').remove();
            return true;
        }
    }

    // Validación de teléfono
    function validarTelefonoEdit() {
        const phone = $('#cliente_telefono_edit').val();
        if (phone.length !== 9) {
            $('#cliente_telefono_edit').addClass('is-invalid');
            $('#telefonoErrorEdit').remove();
            $('#cliente_telefono_edit').after('<div id="telefonoErrorEdit" class="text-danger">El teléfono debe tener 9 dígitos.</div>');
            return false;
        } else {
            $('#cliente_telefono_edit').removeClass('is-invalid');
            $('#telefonoErrorEdit').remove();
            return true;
        }
    }

    // Validación de notificación
    function validarNotificacion() {
        const notificacion = $('input[name="cli_notificacion"]:checked').val();
        if (!notificacion) {
            $('#notificacionErrorEdit').remove();
            $('#cliente_notificacion_edit').after('<div id="notificacionErrorEdit" class="text-danger">Debes seleccionar una opción de notificación.</div>');
            return false;
        } else {
            $('#notificacionErrorEdit').remove();
            return true;
        }
    }
    // Validación del formulario de edición
    function validarFormularioEdit() {
        const nombreValido = validarNombre();
        const telefonoValido = validarTelefonoEdit();
        const correoValido = validarEmail();
        const notificacionValido = validarNotificacion();

        return nombreValido && telefonoValido && correoValido && notificacionValido;
    }

    // función para guardar
    $('#editarClienteForm').submit(function (event) {
        event.preventDefault();

        if (validarFormularioEdit()) {
            var clienteData = {
                cliId: $('#cliId').val(),
                cliNombre: $('#cliente_nombre_edit').val().toUpperCase(),
                cliTelefono: $('#cliente_telefono_edit').val(),
                cliCorreo: $('#cliente_correo_edit').val(),
                cliNotificacion: $('input[name="cli_notificacion"]:checked').val(),
                cliIsActive: $('#cliente_activo_edit').val(),
                empId: $('#cliente_empresa_edit').val()
            };

            $.ajax({
                url: '/kenpis/cliente/update',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(clienteData),
                success: function () {
                    $('#editarClienteModal').modal('hide');
                    $('.modal-backdrop').remove();
                    cargarClientes();
                    toastr.success("Cliente editado exitosamente.");
                },
                error: function (error) {
                    console.error("Error al editar el cliente:", error);
                    toastr.error('Ocurrió un error al editar el cliente.');
                }
            });
        } else {
            toastr.error("Por favor, complete todos los campos requeridos correctamente. Verifique el formato de correo electrónico y teléfono.");
        }
    });

// Función para eliminar un cliente

    function eliminarCliente(usuId) {
        $('#deleteClienteId').val(usuId);
        $('#confirmDeleteModal').modal('show');
    }

    $('#eliminarCliente').click(function () {
        let clienteId = $('#deleteClienteId').val();
        $.ajax({
            url: '/kenpis/cliente/delete/' + clienteId,
            method: 'DELETE',
            success: function () {
                $('#confirmDeleteModal').modal('hide');
                toastr.success("Cliente eliminado exitosamente.");
                cargarClientes();
            },
            error: function () {
                toastr.error("Ocurrió un error al eliminar el cliente.");
            }
        });
    });

    $('#crearClienteModal').on('hidden.bs.modal', function () {
        $('#clienteForm')[0].reset();
        $('.modal-backdrop').remove();
    });
    $('#tableFilter').on('keyup', function () {
        var term = $(this).val().toLowerCase();
        $('#clienteTable tbody tr').each(function () {
            var found = false;
            $(this).find('td').each(function () {
                if ($(this).text().toLowerCase().indexOf(term) !== -1) {
                    found = true;
                    return false;
                }
            });
            $(this).toggle(found);
        });
    });
})
;

