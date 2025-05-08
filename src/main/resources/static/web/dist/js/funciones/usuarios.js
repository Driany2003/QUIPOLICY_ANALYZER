$(document).ready(function () {
    cargarUsuarios();

    // Función para cargar usuarios
    function cargarUsuarios() {
        $.ajax({
            url: '/usuario/findAll',
            method: 'GET',
            success: function (data) {
                let usuariosHTML = '';
                data.forEach(function (usuario) {
                    usuariosHTML += `
                    <tr>
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
                                <i class="bi bi-pencil-square" style="font-size: 15px;" ></i>
                            </button>
                            
                             <button type="button" class="btn btn-link p-0 eliminarUsuario" data-id="${usuario.usuaId}">
                                <i class="bi bi-person-x" style="font-size: 15px;"></i>
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
                })

                $('.eliminarUsuario').click(function (event) {
                    event.preventDefault();
                    var usuaId = $(this).data('id');
                    eliminarUsuario(usuaId);
                })
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar los usuarios:', error);
            }
        });
    }

    // Función para agregar un nuevo usuario
    $('#submitUser').on('click', function () {
        $('#createUserModal').modal('show');

        // Verifica si los campos están completos
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
            url: '/usuario/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoUsuario),
            success: function (response) {
                toastr.success('Usuario creado exitosamente');
                $('#createUserModal').modal('hide');
                $('#createUserForm')[0].reset();
                cargarUsuarios();
            },
            error: function (xhr, status, error) {
                console.error('Error al crear el usuario:', error);
            }
        });
    });

    function editarUsuario(usuaId) {

        $.ajax({
            url: `/usuario/find-by-id/${usuaId}`,
            method: 'GET',
            success: function (usuario) {
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

    function resetPasswordField() {
        $('#authPasswordUpdate').prop('readonly', true);
        $('#passwordHelp').text('Si deseas cambiar la contraseña, haz clic en el botón para habilitar el campo.');
        $('#enablePasswordChangeBtn').show();
    }

    // Llamada a la función cuando se cierra el modal
    $('#updateUserModal').on('hidden.bs.modal', function () {
        resetPasswordField();
    });

    // Llamada a la función cuando el campo de contraseña pierde el foco
    $('#authPasswordUpdate').on('blur', function () {
        if ($(this).val() === '') {
            resetPasswordField();
        }
    });


    // Función para actualizar un usuario
    $('#submitUserUpdate').on('click', function () {
        // Verifica si los campos están completos
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
                cargarUsuarios();
            },
            error: function (xhr, status, error) {
                console.error('Error al actualizar el usuario:', error);
            }
        });
    });


    function eliminarUsuario(usuId) {
        $('#usuaDeleteId').val(usuId);
        $('#confirmDeleteModal').modal('show');
    }

    // Función para eliminar usuario
        $('#confirmDeleteBtn').click(function (){
            var usuaId = $('#usuaDeleteId').val();
            $.ajax({
                url: `/usuario/delete/${usuaId}`,
                method: 'DELETE',
                success: function (response) {
                    toastr.success('Usuario eliminado exitosamente');
                    $('#confirmDeleteModal').modal('hide');
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    toastr.error('No se pudo eliminar el usuario');
                    console.error('Error al eliminar el usuario:', error);
                }
            });
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




