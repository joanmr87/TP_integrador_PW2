// Variables
const formTareas = document.querySelector('#form-tareas');

// Listeners
formTareas.addEventListener('submit', submitFormTarea);

function submitFormTarea(e) {
    e.preventDefault();

    const nombre = this.querySelector('#nombre-tarea').value;
    const descripcion = this.querySelector('#descripcion').value;

    if (nombre && descripcion) {
        const tarea = { nombre, descripcion };
        console.log(tarea);
    } else {
        console.log("Faltan datos");
    }
}