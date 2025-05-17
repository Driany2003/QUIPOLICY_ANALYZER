$(document).ready(function () {
    cargarPoliticas();

    function cargarPoliticas() {
        $.ajax({
            url: "/politicas/listar-politicas",
            method: "GET",
            success: function (data) {
                $("#referenceDoc").empty();
                $("#referenceDoc").append('<option value="">Seleccionar Documento</option>');

                data.politicas.forEach(function(doc) {
                    $("#referenceDoc").append('<option value="' + doc + '">' + doc + '</option>');
                });
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function analizarDocumentos(){

    }
});