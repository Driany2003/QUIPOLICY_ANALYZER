<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<style>
    .modulo-usuarios {
        flex: 1;
        padding: 2rem;
        background-color: #fff;
    }
    .modulo-usuarios .table {
        margin-bottom: 0;
    }
    .modulo-usuarios h3 {
        font-weight: bold;
    }
    .modulo-usuarios .badge-rol-admin {
        background-color: #e0c6ff;
        border-radius: 10px;
        color: #6a1b9a;
    }
    .modulo-usuarios .badge-rol-cliente {
        background-color: #cce5ff;
        border-radius: 10px;
        color: #004085;
    }
    .modulo-usuarios .badge-rol-trabajador {
        background-color: #fec85d;
        border-radius: 10px;
        color: #624509;
    }
    .modulo-usuarios .badge-activo {
        background-color: #d4edda;
        border-radius: 10px;
        color: #155724;
    }
    .modulo-usuarios .badge-inactivo {
        background-color: #f8d7da;
        border-radius: 10px;
        color: #721c24;
    }



</style>
<body>
<%@ include file="includes/preloader.jspf" %>
<div id="main-wrapper">
    <%@ include file="includes/topbar.jspf" %>
    <%@ include file="includes/left-sidebar.jspf" %>
    <div class="page-wrapper">

        <div class="container-fluid">
            <div class="modulo-usuarios">

                <div class="container mt-5 border border-2 border-pink rounded p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3>Gestión de Usuarios</h3>
                            <p class="text-muted">Administre los usuarios del sistema, tanto administradores como clientes</p>
                        </div>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createUserModal">
                            <i class="bi bi-person-plus"></i> Nuevo Usuario
                        </button>
                    </div>

                    <div class="d-flex gap-2 mb-3">
                        <input type="text" id="tableFilter" class="form-control" placeholder="Buscar por nombre, usuario o email...">
                        <select class="form-select d-none d-md-flex">
                            <option selected>Todos los roles</option>
                            <option>Administrador</option>
                            <option>Cliente</option>
                        </select>
                        <select class="form-select d-none d-md-flex">
                            <option selected>Todos los estados</option>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>


                    <div class="table-responsive">
                        <table id="usuarioTable" class="table table-hover align-middle">
                            <thead class="table-light">
                            <tr>
                                <th scope="col"><input type="checkbox"></th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Estado</th>
                                <th scope="col">F.Registro</th>
                                <th scope="col">Acciones</th>
                            </tr>
                            </thead>
                            <tbody class="usuariosTableBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>
<!-- Modal para crear un usuario -->
<div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createUserModalLabel">Crear Nuevo Usuario</h5>
                <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
                    <!-- Icono mdi-close-circle -->
                    <i class="mdi mdi-close"></i>
                </button>
            </div>

            <div class="modal-body">
                <!-- Formulario para crear un nuevo usuario -->
                <form id="createUserForm">
                    <div class="mb-3">
                        <label for="usuaNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="usuaNombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="usuaApellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="usuaApellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="usuaCorreo" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="usuaCorreo" required>
                    </div>
                    <div class="mb-3">
                        <label for="authUsername" class="form-label">Nombre de Usuario</label>
                        <input type="text" class="form-control" id="authUsername" required>
                    </div>
                    <div class="mb-3">
                        <label for="authPassword" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="authPassword" required>
                    </div>
                    <div class="mb-3">
                        <label for="authPasswordConfirm" class="form-label">Confirmar Contraseña</label>
                        <input type="password" class="form-control" id="authPasswordConfirm" required>
                    </div>
                    <div class="mb-3">
                        <label for="authRoles" class="form-label">Rol</label>
                        <select class="form-select" id="authRoles">
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="CLIENTE">Cliente</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="submitUser">Crear Usuario</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para actualizar un usuario -->
<div class="modal fade" id="updateUserModal" tabindex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateUserModalLabel">Actualizar Usuario</h5>
                <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
                    <i class="mdi mdi-close"></i>
                </button>
            </div>

            <div class="modal-body">
                <!-- Formulario para crear un nuevo usuario -->
                <form id="updateUserForm">
                    <input type="hidden" id="usuaId">
                    <div class="mb-3">
                        <label for="usuaNombreUpadte" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="usuaNombreUpadte" required>
                    </div>
                    <div class="mb-3">
                        <label for="usuaApellidoUpadte" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="usuaApellidoUpadte" required>
                    </div>
                    <div class="mb-3">
                        <label for="usuaCorreoUpdate" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="usuaCorreoUpdate" required>
                    </div>
                    <div class="mb-3">
                        <label for="authUsernameUpdate" class="form-label">Nombre de Usuario</label>
                        <input type="text" class="form-control" id="authUsernameUpdate" required>
                    </div>
                    <div class="mb-3">
                        <label for="authPasswordUpdate" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="authPasswordUpdate" readonly required>
                        <small id="passwordHelp" class="form-text text-muted">
                            Si deseas cambiar la contraseña, haz clic en el botón para habilitar el campo.
                        </small>
                        <button type="button" class="btn btn-link" id="enablePasswordChangeBtn">Cambiar Contraseña</button>
                    </div>
                    <div class="mb-3">
                        <label for="authRolesUpdate" class="form-label">Rol</label>
                        <select class="form-select" id="authRolesUpdate">
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="TRABAJADOR">Trabajador</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="authIsActiveUpdate" class="form-label">Estado</label>
                        <select class="form-select" id="authIsActiveUpdate">
                            <option value="true" >Activo</option>
                            <option value="false" >Inactivo</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="submitUserUpdate">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>

<footer class="mt-auto bg-light text-center py-3">
    <%@ include file="includes/footer.jspf" %>
</footer>

<!-- customs -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.3/dragula.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<link href="/static/web/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.css" rel="stylesheet">
<link href="/static/web/assets/extra-libs/taskboard/css/lobilist.css" rel="stylesheet">
<link href="/static/web/assets/extra-libs/taskboard/css/jquery-ui.min.css" rel="stylesheet">
<link href="/static/web/assets/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css" rel="stylesheet">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<link href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<script src="/static/web/dist/js/funciones/usuarios.js"></script>
<!-- import -->
<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>