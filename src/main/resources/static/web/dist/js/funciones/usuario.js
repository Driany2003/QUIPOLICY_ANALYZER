$(document).ready(function () {
    var usuarioEmpresaId = $("#empresaIdModal").val();
    var usuarioNivel = $("#usuarioNivel").val();
    cargarUsuarios();

    function cargarUsuarios() {
        var usuarioId = $("#usuarioId").val();

        if (!usuarioId) {
            alert("No se ha definido el ID del usuario.");
            return;
        } else {
            $.ajax({
                url: '/kenpis/usuario/cargar-usuarios',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({usuId: usuarioId}),
                success: function (response) {
                    const usuarios = response.data;
                    let tableBody = '';

                    usuarios.forEach(function (usuario, index) {
                        tableBody += '<tr>' +
                            '<th scope="row">' + (index + 1) + '</th>' +
                            '<td>' + (usuario.usuTipoDocumento || '') + ' - ' + (usuario.usuNumeroDocumento || '') + '</td>' +
                            '<td>' + (usuario.usuNombre || '') + ' ' + (usuario.usuApePaterno || '') + ' ' + (usuario.usuApeMaterno || '') + '</td>' +
                            '<td>' + (usuario.authRoles || '') + '</td>' +
                            '<td>' + (usuario.authUsername || '') + '</td>' +
                            '<td>' + (usuario.empNombreComercial || '') + '</td>' +
                            '<td>' +
                            '<button type="button" data-id="' + (usuario.usuId || '') + '" class="btn btn-sm btn-warning editarUsuario" data-toggle="tooltip" data-placement="top" title="Editar Usuario">' +
                            '<i class="fas fa-pencil-alt"></i>' +
                            '</button>' +
                            '<span> </span>' +
                            '<button type="button" data-id="' + (usuario.usuId || '') + '" class="btn btn-sm btn-danger eliminarUsuario" data-toggle="tooltip" data-placement="top" title="Eliminar Usuario">' +
                            '<i class="fas fa-trash"></i>' +
                            '</button>' +
                            '<span> </span>' +
                            '<button type="button" data-id="' + (usuario.usuId || '') + '" class="btn btn-sm btn-primary resetPassword" data-toggle="tooltip" data-placement="top" title="Resetear Contraseña">' +
                            '<i class="fas fa-key"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';

                    });

                    $('#usuariosBody').html(tableBody);

                    $('.eliminarUsuario').click(function (event) {
                        event.preventDefault();
                        var usuId = $(this).data('id');
                        console.log("ID DEL USUARIO A ELIMINAR SELECCIONADO", usuId);
                        eliminarUsuario(usuId);
                    });
                    $('.editarUsuario').click(function (event) {
                        event.preventDefault();
                        var usuId = $(this).data('id');
                        console.log("ID DEL USUARIO SELECCIONADO", usuId);
                        editarUsuario(usuId);
                    });
                    $('.resetPassword').click(function (event) {
                        event.preventDefault();
                        var usuId = $(this).data('id');
                        console.log("ID DEL USUARIO SELECCIONADO", usuId);
                        resetPassword(usuId);
                    });
                    if (usuarioNivel === "ADMINISTRADOR" && response.empresasList) {
                        listarEmpresasAdmin(response.empresasList, 'usuario_empresa');
                    }
                },
                error: function (error) {
                    alert("Ocurrió un error al cargar los usuarios.");
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


    // para poder registrar un usuario desde Administrador
    $('#registrarUsuario').on('click', function () {
        var empresaId = (usuarioNivel === "ADMINISTRADOR") ? $('#usuario_empresa').val() : usuarioEmpresaId;
        var usuarioData = {
            empresaId: empresaId,
            usuNombre: $('#usuario_nombre').val().toUpperCase(),
            usuApePaterno: $('#usuario_apellido_paterno').val().toUpperCase(),
            usuApeMaterno: $('#usuario_apellido_materno').val().toUpperCase(),
            usuTelefono: $('#usuario_telefono').val(),
            usuGenero: $('#usuario_genero').val().toUpperCase(),
            usuNumeroDocumento: $('#usuario_numero_documento').val().toUpperCase(),
            usuTipoDocumento: $('#usuario_tipo_documento').val().toUpperCase(),
            authRoles: $('#usuario_cargo').val().toUpperCase(),
            usuCorreo: $('#usuario_correo').val(),
            authUsername: $('#username_usuario').val(),
            authPassword: $('#usuario_clave_1').val(),
        };
        const validacion = () => {
            return Object.values(usuarioData).every(field => field.trim() !== '');
        };

        if (validacion()) {
            $.ajax({
                url: '/kenpis/usuario/create',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(usuarioData),
                success: function () {
                    $('#crearUsuarioModal').modal('hide');
                    $('.modal-backdrop').remove();
                    $('#usuarioForm')[0].reset();
                    toastr.success("Usuario creado exitosamente.");
                    cargarUsuarios();
                },
                error: function (error) {
                    console.error("Error al crear el usuario:", error);
                    toastr.success('Ocurrio un error al crear usuario.');
                }
            });
        } else {
            toastr.error("Por favor, complete todos los campos requeridos.");
        }
    });


    //Funcion para editar los Usuarios
    function editarUsuario(usuId) {
        $.ajax({
            url: `/kenpis/usuario/find-by-id/${usuId}`,
            method: 'GET',
            success: function (response) {
                let usuario = response.usuario;
                console.log("Datos del usuario recuperados:", usuario);

                $("#usuarioId").val(usuario.usuId);
                $('#usuario_nombre_edit').val(usuario.usuNombre);
                $('#usuario_apellido_paterno_edit').val(usuario.usuApePaterno);
                $('#usuario_apellido_materno_edit').val(usuario.usuApeMaterno);
                $('#usuario_telefono_edit').val(usuario.usuTelefono);
                $('#usuario_genero_edit').val(usuario.usuGenero);
                $('#usuario_tipo_documento_edit').val(usuario.usuTipoDocumento);
                $('#usuario_numero_documento_edit').val(usuario.usuNumeroDocumento);
                $('#usuario_email_edit').val(usuario.usuCorreo);
                $('#usuario_cargo_edit').val(usuario.authRoles);
                $('#username_usuario_edit').val(usuario.authUsername);

                if (usuarioNivel === "ADMINISTRADOR" && response.empresasList) {
                    listarEmpresasAdmin(response.empresasList, 'usuario_empresa_edit');
                    $('#usuario_empresa_edit').val(usuario.empresaId);
                } else if (usuarioNivel === "PROPIETARIO")
                    $('#usuario_empresa_edit').val(usuario.empresaId);


                $('#editUsuarioModal').modal('show');
            },
            error: function () {
                toastr.error('Error al obtener los detalles del Usuario.');
            }
        });
    }


    $('#editarUsuarioForm').submit(function (event) {
        event.preventDefault();
        var usuarioData = {
            usuId: $('#usuarioId').val(),
            empresaId: $('#usuario_empresa_edit').val(),
            usuNombre: $('#usuario_nombre_edit').val(),
            usuApePaterno: $('#usuario_apellido_paterno_edit').val(),
            usuApeMaterno: $('#usuario_apellido_materno_edit').val(),
            usuTelefono: $('#usuario_telefono_edit').val(),
            usuGenero: $('#usuario_genero_edit').val(),
            usuTipoDocumento: $('#usuario_tipo_documento_edit').val(),
            usuNumeroDocumento: $('#usuario_numero_documento_edit').val(),
            usuCorreo: $('#usuario_email_edit').val(),
            authRoles: $('#usuario_cargo_edit').val(),
            authUsername: $('#username_usuario_edit').val(),
        };

        $.ajax({
            url: `/kenpis/usuario/update`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(usuarioData),
            success: function () {
                $('#editUsuarioModal').modal('hide');
                toastr.success('Usuario actualizado correctamente.');
                cargarUsuarios();

            },
            error: function () {
                toastr.error('Error al actualizar el Usuario. Intente nuevamente.');
            }
        });
    });

    function eliminarUsuario(usuId) {
        $('#deleteUsuarioId').val(usuId);
        $('#confirmDeleteModal').modal('show');
    }

    $('#eliminarUsuario').click(function () {
        let usuId = $('#deleteUsuarioId').val();
        $.ajax({
            url: `/kenpis/usuario/delete/${usuId}`,
            method: 'DELETE',
            success: function () {
                toastr.success('Usuario eliminado correctamente.');
                $('#confirmDeleteModal').modal('hide');
                cargarUsuarios();
            },
            error: function () {
                toastr.error('Error al eliminar el usuario. Intente nuevamente.');
            }
        });
    });

    function resetPassword(usuId) {
        $('#resetUsuarioId').val(usuId);
        $('#resetPasswordModal').modal('show');
    }

    $('#confirmarContraseña').click(function () {
        var usuId = $('#resetUsuarioId').val();
        var nuevaPassword = $('#nuevaPassword').val();
        var confirmarPassword = $('#confirmarPassword').val();

        if (nuevaPassword !== confirmarPassword) {
            toastr.error("Las contraseñas no coinciden.");
            $('#nuevaPassword').val('');
            $('#confirmarPassword').val('');
            return;
        }

        if (nuevaPassword.trim() === "") {
            toastr.error("La nueva contraseña no puede estar vacía.");
            $('#nuevaPassword').val('');
            $('#confirmarPassword').val('');
            return;
        }

        $.ajax({
            url: `/kenpis/usuario/reset-password/${usuId}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({nuevaPassword: nuevaPassword}),
            success: function () {
                toastr.success('Contraseña reseteada correctamente.');
                $('#resetPasswordModal').modal('hide');
            },
            error: function () {
                toastr.error('Error al resetear la contraseña. Intente nuevamente.');
            }
        });
    });
    $('#resetPasswordModal').on('hidden.bs.modal', function () {
        $('#resetClaveForm')[0].reset();
        $('#resetUsuarioId').val('');
        $('#nuevaPassword').val('');
        $('#confirmarPassword').val('');
    });

    $('#tableFilter').on('keyup', function () {
        var term = $(this).val().toLowerCase();
        $('#usuarioTable tbody tr').each(function () {
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

});
