<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<body>
<%@ include file="includes/preloader.jspf" %>
<style>

    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }


    #main-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }


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
        color: #6a1b9a;
    }
    .modulo-usuarios .badge-rol-cliente {
        background-color: #cce5ff;
        color: #004085;
    }
    .modulo-usuarios .badge-activo {
        background-color: #d4edda;
        color: #155724;
    }
    .modulo-usuarios .badge-inactivo {
        background-color: #f8d7da;
        color: #721c24;

    }



</style>
<div id="main-wrapper">
    <%@ include file="includes/topbar.jspf" %>
    <%@ include file="includes/left-sidebar.jspf" %>


    <div class="modulo-usuarios">

        <div class="container mt-5 border border-2 border-pink rounded p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3>Gestión de Usuarios</h3>
                    <p class="text-muted">Administre los usuarios del sistema, tanto administradores como clientes</p>
                </div>
                <button class="btn btn-dark">
                    <i class="bi bi-person-plus"></i> Nuevo Usuario
                </button>
            </div>

            <div class="d-flex gap-2 mb-3">
                <input type="text" class="form-control" placeholder="Buscar por nombre, usuario o email...">
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
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                    <tr>
                        <th scope="col"><input type="checkbox"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Registro</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr th:each="usuario : ${usuarios}">
                        <td><input type="checkbox"></td>
                        <td th:text="${usuario.nombre}">Nombre</td>
                        <td th:text="${usuario.usuario}">Usuario</td>
                        <td th:text="${usuario.email}">Email</td>
                        <td>
                        <span th:text="${usuario.rol}"
                              th:classappend="${usuario.rol == 'Administrador'} ? 'badge badge-rol-admin' : 'badge badge-rol-cliente'">
                          Rol
                        </span>
                        </td>
                        <td>
                        <span th:text="${usuario.estado}"
                              th:classappend="${usuario.estado == 'Activo'} ? 'badge badge-activo' : 'badge badge-inactivo'">
                          Estado
                        </span>
                        </td>
                        <td th:text="${usuario.registro}">Registro</td>
                        <td>
                            <button class="btn btn-link p-0" onclick="editarUsuario('Administrador Principal')">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-link p-0 ms-2" onclick="gestionarRoles('Administrador Principal')">
                                <i class="bi bi-people"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
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

<!-- import -->
<%@ include file="includes/all-jquery.jspf" %>
</body>
</html>