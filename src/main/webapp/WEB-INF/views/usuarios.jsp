<%@ page contentType="text/html; charset=UTF-8" %>
<html dir="ltr" lang="en">
<%@ include file="includes/header.jspf" %>
<body>
<%@ include file="includes/preloader.jspf" %>
<div id="main-wrapper">
    <%@ include file="includes/topbar.jspf" %>
    <%@ include file="includes/left-sidebar.jspf" %>
    <div class="page-wrapper">
        <!--  <div class="page-breadcrumb">
              <div class="row">
                  <div class="col-12 align-self-center">
                      <h4 class="page-title">EMPRESA <span class="label label-rounded label-info">Lista</span></h4>
                  </div>
              </div>
          </div>
          -->
        <div class="container-fluid">
            <div class="card mt-3">
                <div class="container py-5">
                    <div class="row">
                        <div class="container-fluid">
                            <div class="card mt-3">
                                <div class="container py-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h2>Gestión de Usuarios</h2>
                                            <p>Administre los usuarios del sistema, tanto administradores como clientes</p>
                                            <button class="btn btn-primary mb-3">Nuevo Usuario</button>
                                            <table class="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
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
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Administrador Principal</td>
                                                    <td>admin</td>
                                                    <td>admin@docvalidator.com</td>
                                                    <td><span class="badge bg-purple">Administrador</span></td>
                                                    <td><span class="badge bg-success">Activo</span></td>
                                                    <td>01/01/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Juan Pérez</td>
                                                    <td>jperez</td>
                                                    <td>juan.perez@empresa.com</td>
                                                    <td><span class="badge bg-info">Cliente</span></td>
                                                    <td><span class="badge bg-success">Activo</span></td>
                                                    <td>15/01/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>María López</td>
                                                    <td>mlopez</td>
                                                    <td>maria.lopez@empresa.com</td>
                                                    <td><span class="badge bg-info">Cliente</span></td>
                                                    <td><span class="badge bg-success">Activo</span></td>
                                                    <td>20/01/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Carlos Rodríguez</td>
                                                    <td>crodriguez</td>
                                                    <td>carlos.rodriguez@docvalidator.com</td>
                                                    <td><span class="badge bg-purple">Administrador</span></td>
                                                    <td><span class="badge bg-success">Activo</span></td>
                                                    <td>05/01/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>Ana Martínez</td>
                                                    <td>amartinez</td>
                                                    <td>ana.martinez@empresa.com</td>
                                                    <td><span class="badge bg-info">Cliente</span></td>
                                                    <td><span class="badge bg-danger">Inactivo</span></td>
                                                    <td>10/02/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">6</th>
                                                    <td>Roberto Sánchez</td>
                                                    <td>rsanchez</td>
                                                    <td>roberto.sanchez@empresa.com</td>
                                                    <td><span class="badge bg-info">Cliente</span></td>
                                                    <td><span class="badge bg-success">Activo</span></td>
                                                    <td>25/02/2024</td>
                                                    <td>
                                                        <button class="btn btn-warning btn-sm">Editar</button>
                                                        <button class="btn btn-danger btn-sm">Eliminar</button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

    <!-- import -->
    <%@ include file="includes/all-jquery.jspf" %>
</body>
</html>