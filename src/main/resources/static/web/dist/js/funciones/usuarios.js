$(document).ready(function () {
    alert("hola")
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
                        <td><span class="badge ${usuario.authRoles === 'Administrador' ? 'badge-rol-admin' : 'badge-rol-cliente'}">${usuario.authRoles}</span></td>
                        <td><span class="badge ${usuario.authIsActive === 'Activo' ? 'badge-activo' : 'badge-inactivo'}">${usuario.authIsActive}</span></td>
                        <td>${usuario.authFechaRegistrado}</td>
                        <td>
                            <button class="btn btn-link p-0" onclick="editarUsuario('${usuario.id}')">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-link p-0 ms-2" onclick="gestionarRoles('${usuario.id}')">
                                <i class="bi bi-people"></i>
                            </button>
                        </td>
                    </tr>
                    `;
                });
                $('.usuariosTableBody').html(usuariosHTML);
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar los usuarios:', error);
            }
        });
    }

    // Función para editar usuario
    window.editarUsuario = function (id) {
        // Aquí puedes redirigir o abrir un modal para editar el usuario
        $.ajax({
            url: '/ruta/para/obtener/usuario/' + id, // Asegúrate de colocar la ruta correcta
            method: 'GET',
            success: function (usuario) {
                // Rellenar los datos en un formulario o en un modal
                console.log(usuario); // Aquí puedes llenar el formulario con los datos del usuario
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener el usuario:', error);
            }
        });
    };

    // Función para gestionar roles
    window.gestionarRoles = function (id) {
        // Aquí puedes redirigir o abrir un modal para gestionar los roles
        $.ajax({
            url: '/ruta/para/obtener/roles/' + id, // Asegúrate de colocar la ruta correcta
            method: 'GET',
            success: function (roles) {
                console.log(roles); // Aquí puedes llenar el formulario con los roles disponibles
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener los roles:', error);
            }
        });
    };

    // Función para agregar un nuevo usuario
    $('#nuevoUsuarioBtn').on('click', function () {
        // Abrir modal o formulario para agregar nuevo usuario
        // Ejemplo de llamada AJAX para guardar el nuevo usuario
        let nuevoUsuario = {
            nombre: $('#nombre').val(),
            usuario: $('#usuario').val(),
            email: $('#email').val(),
            rol: $('#rol').val(),
            estado: $('#estado').val()
        };

        $.ajax({
            url: '/usuario/create', // Asegúrate de colocar la ruta correcta
            method: 'POST',
            data: nuevoUsuario,
            success: function (response) {
                alert('Usuario creado exitosamente');
                cargarUsuarios(); // Recargar la lista de usuarios
            },
            error: function (xhr, status, error) {
                console.error('Error al crear el usuario:', error);
            }
        });
    });

    // Función para actualizar un usuario
    $('#actualizarUsuarioBtn').on('click', function () {
        let usuarioActualizado = {
            id: $('#usuarioId').val(),
            nombre: $('#nombre').val(),
            usuario: $('#usuario').val(),
            email: $('#email').val(),
            rol: $('#rol').val(),
            estado: $('#estado').val()
        };

        $.ajax({
            url: '/usuario/update', // Asegúrate de colocar la ruta correcta
            method: 'PUT',
            data: usuarioActualizado,
            success: function (response) {
                alert('Usuario actualizado exitosamente');
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




