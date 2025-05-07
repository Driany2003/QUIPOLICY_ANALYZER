$(document).ready(function () {
    cargarUsuarios();

    // Función para cargar usuarios
    function cargarUsuarios() {
        $.ajax({
            url: '/usuario/findAll', // Asegúrate de colocar la ruta correcta
            method: 'GET',
            success: function (data) {
                let usuariosHTML = '';
                data.forEach(function (usuario) {
                    usuariosHTML += `
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>${usuario.usuaNombre} ${usuario.usuaApellido}</td>
                        <td>${usuario.authUsername}</td>
                        <td>${usuario.usuaCorreo}</td>
                        <td>
                            <span class="badge 
                                ${usuario.authRoles === 'ADMINISTRADOR' ? 'badge-rol-admin' :
                                (usuario.authRoles === 'CLIENTE' ? 'badge-rol-cliente' :
                                (usuario.authRoles === 'TRABAJADOR' ? 'badge-rol-trabajador' : ''))}">
                                ${usuario.authRoles}
                            </span>
                        </td>
                        <td>
                            <span class="badge ${usuario.authIsActive === true ? 'badge-activo' : 'badge-inactivo'}">
                                ${usuario.authIsActive === true ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        <td>${usuario.authFechaRegistrado}</td>
                        <td>
                            <button type="button" class="btn btn-link p-0 editarUsuario" data-id="${usuario.usuaId}">
                                <i class="bi bi-pencil-square"></i>
                            </button>

                            <button class="btn btn-link p-0 ms-2" onclick="gestionarRoles('${usuario.usuaId}')">
                                <i class="bi bi-people"></i>
                            </button>
                        </td>
                    </tr>
                    `;
                });
                $('.usuariosTableBody').html(usuariosHTML);
                $('.editarUsuario').click(function (event) {
                    event.preventDefault();
                    var usuaId = $(this).data('id');
                    editarUsuario(usuaId);
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar los usuarios:', error);
            }
        });
    }

    // Función para agregar un nuevo usuario
    $('#submitUser').on('click', function () {
        $('#createUserModal').modal('show');

        // Verificar si los campos están completos
        if ($('#usuaNombre').val() === "" || $('#usuaApellido').val() === "" || $('#usuaCorreo').val() === "" || $('#authUsername').val() === "" || $('#authPassword').val() === "") {
            toastr.error("Por favor complete todos los campos.");
            return;
        }

        if ($('#authPassword').val() !== $('#authPasswordConfirm').val()) {
            toastr.error("Las contraseñas no coinciden. Por favor, ingrese las mismas contraseñas.");
            return;
        }

        var nuevoUsuario = {
            usuaNombre: $('#usuaNombre').val(),
            usuaApellido: $('#usuaApellido').val(),
            usuaCorreo: $('#usuaCorreo').val(),
            authUsername: $('#authUsername').val(),
            authPassword: $('#authPassword').val(),
            authRoles: $('#authRoles').val(),
        };

        $.ajax({
            url: '/usuario/create', // Asegúrate de colocar la ruta correcta
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoUsuario),
            success: function (response) {
                toastr.success('Usuario creado exitosamente');
                $('#createUserModal').modal('hide'); // Cerrar el modal
                $('#createUserForm')[0].reset();
                cargarUsuarios(); // Recargar la lista de usuarios
            },
            error: function (xhr, status, error) {
                console.error('Error al crear el usuario:', error);
            }
        });
    });

    function editarUsuario(usuaId) {
        // Hacer una solicitud para obtener los datos del usuario
        $.ajax({
            url: `/usuario/find-by-id/${usuaId}`, // Asegúrate de que la URL sea correcta para obtener el usuario
            method: 'GET',
            success: function (usuario) {
                // Llenar el formulario del modal con los datos del usuario
                $('#usuaId').val(usuaId);
                $('#usuaNombreUpadte').val(usuario.usuaNombre);
                $('#usuaApellidoUpadte').val(usuario.usuaApellido);
                $('#usuaCorreoUpdate').val(usuario.usuaCorreo);
                $('#authUsernameUpdate').val(usuario.authUsername);
                $('#authRolesUpdate').val(usuario.authRoles);
                $('#authIsActiveUpdate').val(usuario.authIsActive.toString());
                $('#authPasswordUpdate').val('');
                $('#updateUserModal').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        });
    }

    $('#enablePasswordChangeBtn').on('click', function () {
        $('#authPasswordUpdate').prop('readonly', false);
        $('#passwordHelp').text('Puedes ahora ingresar una nueva contraseña.');
        $(this).hide();
    });

    $('#updateUserModal').on('hidden.bs.modal', function () {
        $('#authPasswordUpdate').prop('readonly', true);
        $('#passwordHelp').text('Si deseas cambiar la contraseña, haz clic en el botón para habilitar el campo.');
        $('#enablePasswordChangeBtn').show();
    });


    // Función para actualizar un usuario
    $('#submitUserUpdate').on('click', function () {
        // Verificar si los campos están completos
        if ($('#usuaNombreUpadte').val() === "" || $('#usuaApellidoUpadte').val() === "" || $('#usuaCorreoUpdate').val() === "" || $('#authUsernameUpdate').val() === "") {
            toastr.error("Por favor complete todos los campos.");
            return;
        }

        var usuarioActualizado = {
            usuaId: $('#usuaId').val(),
            usuaNombre: $('#usuaNombreUpadte').val(),
            usuaApellido: $('#usuaApellidoUpadte').val(),
            usuaCorreo: $('#usuaCorreoUpdate').val(),
            authUsername: $('#authUsernameUpdate').val(),
            authPassword: $('#authPasswordUpdate').val(),
            authRoles: $('#authRolesUpdate').val(),
            authIsActive: $('#authIsActiveUpdate').val(),
        };

        $.ajax({
            url: '/usuario/update',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(usuarioActualizado),
            success: function (response) {
                toastr.success('Usuario actualizado exitosamente');
                $('#updateUserModal').modal('hide');
                cargarUsuarios(); // Recargar la lista de usuarios
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar el usuario:', error);
            }
        });
    });

    // Función para eliminar usuario
    $('#eliminarUsuarioBtn').on('click', function () {
        let idsSeleccionados = [];
        $('input[type="checkbox"]:checked').each(function () {
            idsSeleccionados.push($(this).closest('tr').data('id')); // Asumiendo que tienes un data-id con el ID del usuario
        });

        if (idsSeleccionados.length > 0) {
            $.ajax({
                url: '/usuarios/delete',
                method: 'DELETE',
                data: { ids: idsSeleccionados },
                success: function (response) {
                    alert('Usuarios eliminados exitosamente');
                    cargarUsuarios(); // Recargar la lista de usuarios
                },
                error: function (xhr, status, error) {
                    console.error('Error al eliminar los usuarios:', error);
                }
            });
        } else {
            alert('Por favor seleccione al menos un usuario');
        }
    });
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




