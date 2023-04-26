export const obtenerFechaLocal = (fecha) => {
    const fechaLista = new Date(fecha);
    return fechaLista.toLocaleDateString();
}
// ************************************************

// ************************************************
export const obtenerHora = (fecha) => {
    const fechaLista = new Date(fecha);
    return fechaLista.toLocaleTimeString();
}