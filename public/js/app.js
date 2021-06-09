// Variables
const formTask = document.querySelector('#form-tareas');
const templateTask = document.querySelector('#task-item').content;
const taskList = document.querySelector('#task-list');

// Listeners
formTask.addEventListener('submit', submitFormTask);
document.addEventListener('DOMContentLoaded', () => {
    listTasks();
});

function addTask(name, description, id) {
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
    console.log(tasks);

}

function submitFormTask(e) {
    e.preventDefault();

    const name = this.querySelector('#nombre-tarea').value;
    const description = this.querySelector('#descripcion').value;

    if (name && description) {
        const task = { name, description };
        addTask(name, description, 2)
        console.log(task);
    } else {
        console.log("Faltan datos");
    }
}