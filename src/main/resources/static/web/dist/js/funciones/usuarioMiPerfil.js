$(document).ready(function () {
    const nombre = $('#nombre').val();
    const apellido = $('#apellidoPaterno').val();
    generarImagenIniciales(nombre, apellido);

    const valoresOriginales = {
        nombre: $('#nombre').val(),
        apellidoPaterno: $('#apellidoPaterno').val(),
        apellidoMaterno: $('#apellidoMaterno').val(),
        telefono: $('#telefono').val(),
        correoUsuario: $('#correoUsuario').val()
    };

    // Función para verificar si los campos han cambiado
    function camposHanCambiado() {
        return (
            $('#nombre').val() !== valoresOriginales.nombre ||
            $('#apellidoPaterno').val() !== valoresOriginales.apellidoPaterno ||
            $('#apellidoMaterno').val() !== valoresOriginales.apellidoMaterno ||
            $('#telefono').val() !== valoresOriginales.telefono ||
            $('#correoUsuario').val() !== valoresOriginales.correoUsuario
        );
    }

    // Obtener iniciales
    function obtenerIniciales(nombre, apellido) {
        return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
    }

    // Generar imagen con iniciales
    function generarImagenIniciales(nombre, apellido) {
        const canvas = document.getElementById('initialsCanvas');
        const ctx = canvas.getContext('2d');
        const scale = 2;

        canvas.width = 150 * scale;
        canvas.height = 150 * scale;
        canvas.style.width = '150px';
        canvas.style.height = '150px';
        ctx.scale(scale, scale);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#007bff';
        ctx.arc(75, 75, 75, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obtenerIniciales(nombre, apellido), 75, 75);
    }

    // Validación de campos
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

    function validarEmail() {
        const email = $('#correoUsuario').val();
        if (!/\S+@\S+\.\S+/.test(email)) {
            $('#correoUsuario').addClass('is-invalid');
            return false;
        } else {
            $('#correoUsuario').removeClass('is-invalid');
            return true;
        }
    }

    function validarTelefono() {
        const phone = $('#telefono').val();
        if (phone.length !== 9) {
            $('#telefono').addClass('is-invalid');
            return false;
        } else {
            $('#telefono').removeClass('is-invalid');
            return true;
        }
    }

    // Validar todos los campos y cambios
    function validarFormulario() {
        const nombreValido = validarCampoVacio('#nombre');
        const apellidoPaternoValido = validarCampoVacio('#apellidoPaterno');
        const apellidoMaternoValido = validarCampoVacio('#apellidoMaterno');
        const telefonoValido = validarTelefono();
        const correoValido = validarEmail();
        const cambiosRealizados = camposHanCambiado();

        return nombreValido && apellidoPaternoValido && apellidoMaternoValido && telefonoValido && correoValido && cambiosRealizados;
    }

    // Evento para habilitar o deshabilitar botón de actualización
    function gestionarHabilitacionBoton() {
        if (validarFormulario()) {
            $('#actualizarPerfil').prop('disabled', false);
        } else {
            $('#actualizarPerfil').prop('disabled', true);
        }
    }
    $('#nombre, #apellidoPaterno, #apellidoMaterno').on('input', function () {
        $(this).val($(this).val().toUpperCase());
    });

    // Aplicar transformación a mayúsculas y habilitar el botón según validación
    $('#nombre, #apellidoPaterno, #apellidoMaterno, #correoUsuario, #telefono').on('input', function () {
        const nombre = $('#nombre').val();
        const apellido = $('#apellidoPaterno').val();
        generarImagenIniciales(nombre, apellido);
        gestionarHabilitacionBoton();
    });

    // Manejar clic del botón de actualizar perfil
    $('#actualizarPerfil').click(function (event) {
        event.preventDefault();
        const miPerfilData = {
            usuId: $('#usuId').val(),
            empId: $('#empId').val(),
            usuNombre: $('#nombre').val(),
            usuApePaterno: $('#apellidoPaterno').val(),
            usuApeMaterno: $('#apellidoMaterno').val(),
            usuTelefono: $('#telefono').val(),
            usuCorreo: $('#correoUsuario').val(),
            usuTipoDocumento: $('#tipoDocumento').val(),
            usuNumeroDocumento: $('#numeroDocumento').val()

        };

        $.ajax({
            url: `/kenpis/usuario/actualizar-perfil`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(miPerfilData),
            success: function (response) {
                toastr.success("Perfil actualizado correctamente.");
                location.reload();
            },
            error: function () {
                toastr.error("Ocurrió un error al actualizar el perfil.");
            }
        });
    });

    ////////////////////////////////////////////////////////////////////////////


    $('#validarClave').click(function () {
        var claveActual = $('#claveActual').val();
        var usuId = $('#usuId').val();

        if (claveActual.trim() === '') {
            toastr.error("Debe ingresar su clave actual.");
            return;
        }

        $.ajax({
            url: `/kenpis/usuario/validar-clave`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({usuId: usuId, claveActual: claveActual}),
            success: function (response) {
                if (response.valida === true) {
                    toastr.success("Clave actual válida. Ahora ingrese su nueva clave.");
                    $('#nuevaClaveSection').addClass('show').css('display', 'block');
                    //validar clave
                    $('#claveActual').prop('disabled', true);
                    $('#validarClave').prop('disabled', true);
                    //nueva clave

                    $('#nuevaClave').prop('disabled', false);
                    $('#guardarNuevaClave').prop('disabled', false);
                } else {
                    toastr.error("La clave actual es incorrecta.");
                    $('#claveActual').val('');
                }
            },
            error: function (xhr, status, error) {
                toastr.error("Ocurrió un error al validar la clave.");
            }
        });
    });

    $('#guardarNuevaClave').click(function () {
        var nuevaClave = $('#nuevaClave').val();
        var usuId = $('#usuId').val();

        if (nuevaClave.trim() === '') {
            toastr.error("Debe ingresar una nueva clave.");
            return;
        }

        $.ajax({
            url: `/kenpis/usuario/actualizar-clave`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({usuId: usuId, nuevaClave: nuevaClave}),
            success: function (response) {
                toastr.success("Clave actualizada correctamente.");
                $('#resetClaveModal').modal('hide');
                resetForm();
            },
            error: function (xhr, status, error) {
                toastr.error("Ocurrió un error al actualizar la clave.");

            }
        });
    });

    function resetForm() {
        $('#resetClaveForm')[0].reset();
        $('#nuevaClaveSection').removeClass('show').css('display', 'none');
        $('#nuevaClave').prop('disabled', true);
        $('#guardarNuevaClave').prop('disabled', true);
        $('#claveActual').prop('disabled', false);
        $('#validarClave').prop('disabled', false);
        $('#nuevaClave').removeClass('is-invalid');
    }

    $('#resetClaveModal').on('hidden.bs.modal', function () {
        resetForm();
        $('.modal-backdrop').remove();
    });


});