$(document).ready(function () {
    let rolUsuario = $("#rolUsuario").val();
    if (rolUsuario === "ADMINISTRADOR") {
        cargarAsistencia(); // Solo los administradores pueden listar asistencias
    } else {
        iniciarFuncionesTrabajador();
    }
});

// 🔹 Funciones exclusivas para trabajadores (Registrar asistencia, reloj, cámara y geolocalización)
function iniciarFuncionesTrabajador() {
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('localizacion').value = `${position.coords.latitude}, ${position.coords.longitude}`;
        });
    }
}

function actualizarReloj() {
    const reloj = document.getElementById('clock');
    if (!reloj) return;
    const ahora = new Date();
    reloj.textContent = ahora.toLocaleTimeString();
}

function iniciarCamara() {
    const video = document.getElementById('video');
    const btnCamara = document.getElementById('btnCamara');
    const btnFoto = document.getElementById('btnFoto');
    const fotoPreview = document.getElementById('fotoPreview');

    fotoPreview.style.display = "none"; // Ocultar la foto previa

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.style.display = "block";


            btnCamara.innerText = "Tomar Otra Foto";
            btnFoto.disabled = false;
            btnRegistrar.disabled = true;
        })
        .catch(error => console.error("No se pudo acceder a la cámara", error));
}

function tomarFoto() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const contexto = canvas.getContext('2d');
    const fotoPreview = document.getElementById('fotoPreview');
    const fotoData = document.getElementById('fotoData');
    const btnRegistrar = document.getElementById('btnRegistrar');

    if (!video.srcObject) {
        console.error("La cámara no está activada.");
        return;
    }

    // Capturar imagen en el canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir imagen a Base64
    const foto = canvas.toDataURL('image/png');

    // Detener la cámara y ocultar el video
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.style.display = "none";

    // Mostrar la foto tomada
    fotoPreview.src = foto;
    fotoPreview.style.display = "block";

    // Guardar la foto en el input oculto
    fotoData.value = foto;
    btnRegistrar.disabled = false;
}

function registrarAsistencia() {
    const usuId = $('#asiId').val();
    const localizacion = $('#localizacion').val();
    const foto = $('#fotoData').val();

    const fechaHoraRegistro = new Date().toISOString();

    if (!localizacion || !foto) {
        toastr.error("Todos los campos deben estar completos.");
        return;
    }

    const asistenciasData = {
        usuId: usuId,
        asiLocalizacion: localizacion,
        asiFechaIngreso: fechaHoraRegistro,
        asiFoto: foto,
        asiEstado: "Por Revisar"
    };

    $.ajax({
        url: '/holistic/asistencia/create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(asistenciasData),
        success: function (response) {
            console.log(response);
            toastr.success("Asistencia guardada exitosamente.");
            $('#mensaje').text("Asistencia registrada con éxito.");
        },
        error: function (xhr, status, error) {
            console.error("Error en AJAX:", status, error);
            $('#mensaje').text("Error al registrar asistencia.");
            toastr.error("Hubo un problema al guardar la asistencia.");
        }
    });
}


// 🔹 Función exclusiva para ADMINISTRADORES (Cargar asistencia)
function cargarAsistencia() {
    $.ajax({
        url: "/holistic/asistencia/find-all",
        method: "GET",
        success: function (data) {
            let tbody = $("#listaAsistencia");
            tbody.empty(); // Limpia la tabla antes de cargar nuevos datos

            data.forEach((asistencia, index) => {
                // Formatear fecha correctamente
                let fechaFormateada = new Date(asistencia.asiFechaIngreso).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                });

                // Obtener coordenadas
                let [lat, lng] = asistencia.asiLocalizacion.split(',');

                let fila = `<tr>
                    <td>${asistencia.usuNombre} ${asistencia.usuApellidos}</td>
                    <td>${asistencia.usuNumeroDocumento}</td>
                    <td>${fechaFormateada}</td>
                     <td>
                        <div id="mapa-${index}" class="mapa-preview" onclick="abrirMapa(${lat}, ${lng})"></div>
                    </td>
                    <td>
                        <img src="${asistencia.asiFoto}" alt="Foto" width="50" style="cursor:pointer; border-radius: 5px;" 
                             onclick="mostrarImagen('${asistencia.asiFoto}')">
                    </td>
                    <td>
                        <span class="badge ${asistencia.asiEstado === 'Aprobado' ? 'bg-success' : 'bg-warning'}">
                            ${asistencia.asiEstado}
                        </span>
                    </td>
                </tr>`;

                tbody.append(fila);
                // Inicializar el mapa en cada fila
                setTimeout(() => {
                    let map = L.map(`mapa-${index}`, {attributionControl: false, zoomControl: false}).setView([lat, lng], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    L.marker([lat, lng]).addTo(map);
                }, 100);
            });
        },
        error: function () {
            alert("Error al cargar los datos de asistencia.");
        }
    });
}

function abrirMapa(lat, lng) {
    let modalMapa = document.getElementById("modalMapa");
    let mapaGrande = document.getElementById("mapaGrande");

    modalMapa.style.display = "block";

    setTimeout(() => {
        let map = L.map(mapaGrande, {attributionControl: false}).setView([lat, lng], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([lat, lng]).addTo(map);
    }, 200);
}

// Función para mostrar la imagen en un modal
function mostrarImagen(url) {
    let modal = document.getElementById("modalImagen");
    let img = document.getElementById("imagenGrande");

    img.src = url;
    modal.style.display = "block";
}

window.onclick = function (event) {
    let modalMapa = document.getElementById("modalMapa");
    let modalImagen = document.getElementById("modalImagen");

    if (event.target == modalMapa) {
        modalMapa.style.display = "none";
    }
    if (event.target == modalImagen) {
        modalImagen.style.display = "none";
    }
}