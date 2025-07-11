$(document).ready(function () {
    cargarPoliticas();

    function cargarPoliticas() {
        $.ajax({
            url: "/politicas/listar-politicas",
            method: "GET",
            success: function (data) {
                $("#referenceDoc").empty();
                $("#referenceDoc").append('<option value="">Seleccionar Documento</option>');

                data.politicas.forEach(function (doc) {
                    $("#referenceDoc").append('<option value="' + doc + '">' + doc + '</option>');
                });
            },
            error: function (error) {
                console.error("Error cargando documentos:", error);
            }
        });
    }

    $("#formAgregarPolitica").submit(function(event) {
        event.preventDefault();
        var formData = new FormData();
        var fileInput = $("#nuevoArchivo")[0].files[0];

        if (fileInput) {
            formData.append("file", fileInput);

            $.ajax({
                url: "/politicas/agregar-nueva-politica",
                method: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    toastr.success("Política agregada con éxito!");
                    $("#nuevoArchivo").val("");
                    $("#fileName").text("No se ha seleccionado ningún archivo");
                    $("#fileSize").text("");
                    cargarPoliticas();
                },
                error: function(error) {
                    toastr.error("Error al agregar la política:", error);
                    alert("Error al agregar la política: " + error.responseText);
                }
            });
        } else {
            alert("Por favor, seleccione un archivo PDF.");
        }

    });

    $("#uploadBtn").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function () {
        const file = this.files[0];
        if (file) {
            $("#fileName").text(file.name);
            $("#fileSize").text((file.size / 1024).toFixed(2) + " KB");
        } else {
            $("#fileName").text("No se ha seleccionado ningún archivo");
            $("#fileSize").text("");
        }
    });

    $("#validateBtn").click(function () {
        const file = $("#fileInput")[0].files[0];
        const politicaSeleccionada = $("#referenceDoc").val();
        const usuId = $("#usuId").val();

        if (!file) {
            toastr.error("Por favor, seleccione un archivo PDF.");
            return;
        }
        if (!politicaSeleccionada) {
            toastr.error("Por favor, seleccione un documento de referencia.");
            return;
        }
        if (!usuId) {
            toastr.error("No se encontró el ID de usuario en la sesión.");
            return;
        }

        $("body").append('<div id="loader" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.7);z-index:9999;text-align:center;padding-top:20%;font-size:20px;color:#333;">Cargando...</div>');

        const formData = new FormData();
        formData.append("file", file);
        formData.append("politicaSeleccionada", politicaSeleccionada);
        formData.append("usuId", usuId);

        $.ajax({
            url: "/politicas/validar-politica",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (respuesta) {
                toastr.success("Respuesta recibida");
            },
            error: function (xhr, status, error) {
                toastr.error("Error al validar política: " + error);
            },
            complete: function () {
                $("#loader").remove();
                $("#referenceDoc").val("");
                $("#fileInput").val("");
                $("#fileName").text("No se ha seleccionado ningún archivo");
                $("#fileSize").text("");
            }
        });
    });
});
