function formatDateForBackend(date) {
    // Verifica si la fecha no es nula o indefinida
    if (date instanceof Date && !isNaN(date)) {
        // Obtiene los componentes de la fecha
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear().toString();

        // Formatea la fecha en el formato esperado por el backend (yyyy.MM-dd)
        var formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    } else {
        console.error("La fecha es nula, indefinida o no válida.");
        return null;
    }
}

