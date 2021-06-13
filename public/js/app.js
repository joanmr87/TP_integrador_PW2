if (!sessionStorage.getItem('jwt')) {
    // window.location = '/login.html';
}
// Variables
const templateTask = document.querySelector('#task-item').content;
const taskList = document.querySelector('#task-list');
const formTask = document.querySelector('#form-tareas');
const formTitle = document.querySelector('.form-title');
const taskName = document.querySelector('#task-name');
const taskDesription = document.querySelector('#task-description');
const submitButton = document.querySelector('.submit-button');
const cancelButton = document.querySelector('.cancel-button');
let editMode = false;

// Listeners
formTask.addEventListener('submit', submitFormTask);
cancelButton.addEventListener('click', cancelEdit);
taskList.addEventListener('click', modifyTasks);
document.addEventListener('DOMContentLoaded', () => {
    listTasks();
});

function cancelEdit() {
    formTitle.textContent = "Crear tarea";
    cancelButton.classList.add('d-none');
    submitButton.textContent = "Crear";
    editMode = false;
}

function modifyTasks(e) {
    if (e.target.classList.contains('edit-task')) {
        editTask(e.target.parentElement.parentElement);
    }
    if (e.target.classList.contains('delete-task')) {
        deleteTask(e.target.parentElement.parentElement);
        console.log(`Eliminar tarea`)
    }
}

function deleteTask(item) {


    Swal.fire({
        title: 'Seguro que querés eliminar esta tarea?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Envio id de la tarea para eliminarla
            // const response = await callApi('DELETE', '/${id}');
            // const id = response.json();

            Swal.fire(
                'Tarea Eliminada!',
                'La tarea ha sido eliminada',
                'success'
            )
        }
    })
}

function editTask(item) {
    editMode = true;
    formTitle.textContent = "Editar tarea";
    cancelButton.classList.remove('d-none');
    submitButton.textContent = "Editar";
    taskName.value = item.querySelector('.task-name').textContent;
    taskDesription.value = item.querySelector('.task-description').textContent;
}

async function addTask(name, description, id) {

    // Envio tarea a la BD y recibo el id de la nueva tarea
    // const response = await callApi('POST', '/', { name, description, id_usuario });
    // const id = response.json();

    const item = templateTask.cloneNode(true);

    item.querySelector('.task-name').textContent = name;
    item.querySelector('.task-description').textContent = description;
    item.querySelector('li').dataset.id = id;

    taskList.appendChild(item);
}

/**
 * 
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method 
 * @param {'/' | '/:id'} url 
 * @param {*} body 
 * @returns 
 */
async function callApi(method, url, body = undefined) {
    const resp = await fetch(`/tareas${url}`, {
        method: method
    });
    const data = await resp.json();
    return data;
}

async function listTasks() {
    const tasks = await callApi('GET', '/');
    tasks.forEach((task) => {
        const { tarea, descripcion, Id } = task;
        addTask(tarea, descripcion, Id)
    });
    console.log(tasks)
}

function updateTask(name, description, id) {
    // Envio tarea a la BD y recibo el id de la nueva tarea
    // const response = await callApi('PUT', '/${id}', { name, description });
    // const id = response.json();

    // invoco nuevamente al método para listar las tareas de la BD actualizadas
    listTasks();
}

function submitFormTask(e) {
    e.preventDefault();
    const name = taskName.value;
    const description = taskDesription.value;

    if (name && description) {
        if (!editMode) {
            addTask(name, description, 2);
            Swal.fire({
                icon: 'success',
                title: 'Tarea Agregada',
                text: 'Su tarea ha sido agregada correctamente',
            })
        } else {
            updateTask(name, description, 2);
        }

    } else {
        console.log("Faltan datos");
    }
    this.reset();
}