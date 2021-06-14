if (!sessionStorage.getItem('jwt')) {
	window.location = '/login.html';
}
// Variables
const templateTask = document.querySelector('#task-item').content;
const taskList = document.querySelector('#task-list');
const formTask = document.querySelector('#form-tareas');
const formTitle = document.querySelector('.form-title');
const taskName = document.querySelector('#task-name');
const taskDesription = document.querySelector('#task-description');
const taskStatus = document.querySelector('#task-status');
const taskId = document.querySelector('#task-id');
const submitButton = document.querySelector('.submit-button');
const cancelButton = document.querySelector('.cancel-button');
const logoutButton = document.querySelector('#logout');
let editMode = false;

// Listeners
formTask.addEventListener('submit', submitFormTask);
cancelButton.addEventListener('click', cancelEdit);
taskList.addEventListener('click', modifyTasks);
logoutButton.addEventListener('click', (e) => {
	e.preventDefault();
	sessionStorage.removeItem('jwt');
	window.location = '/login.html';
})
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
		console.log(`Eliminar tarea`);
	}
	if (e.target.classList.contains('task-state')) {
		changeTaskState(e.target);
	}
}

function changeTaskState(stateButton) {
	const item = stateButton.parentElement.parentElement;
	const name = item.querySelector('.task-name').textContent;
	const description = item.querySelector('.task-description').textContent;

	stateButton.classList.toggle('badge-warning');

	if (stateButton.classList.toggle('badge-success')) {
		stateButton.textContent = 'finalizada';
	} else {
		stateButton.textContent = 'pendiente';
	};

	updateTask(name, description, item.dataset.id, stateButton.textContent);

}

function deleteTask(item) {
	const name = item.querySelector('.task-name').textContent;
	const description = item.querySelector('.task-description').textContent;
	const id = item.dataset.id;
	Swal.fire({
		title: 'Seguro que querés eliminar esta tarea?',
		// text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar'
	}).then(async (result) => {
		if (result.isConfirmed) {
			// Envio id de la tarea para eliminarla
			updateTask(name, description, id, 'eliminada');

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
	taskId.value = item.dataset.id;
	formTitle.textContent = "Editar tarea";
	cancelButton.classList.remove('d-none');
	submitButton.textContent = "Editar";
	taskName.value = item.querySelector('.task-name').textContent;
	taskStatus.value = item.querySelector('.task-state').textContent;
	taskDesription.value = item.querySelector('.task-description').textContent;
}

async function addTask(name, description) {

	// Envio tarea a la BD y recibo el id de la nueva tarea
	const response = await callApi('POST', '/tareas/', { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.jwt}` }, JSON.stringify({ name, description, state: 'pendiente', date_creation: new Date().toISOString().slice(0, 19).replace('T', ' ') }));
	const id = response;

	addHTMLTask(name, description, id, 'pendiente', new Date().toISOString().slice(0, 19).replace('T', ' '));
}

function addHTMLTask(name, description, id, state, create_date, edited_date) {
	const item = templateTask.cloneNode(true);

	item.querySelector('.task-name').textContent = name;
	item.querySelector('.task-description').textContent = description;
	item.querySelector('li').dataset.id = id;
	item.querySelector('.creation-date').textContent = create_date;
	item.querySelector('.edited-date').textContent = edited_date;
	item.querySelector('.task-state').textContent = state;

	if (state == "pendiente") {
		item.querySelector('.task-state').classList.add('badge-warning')
	} else {
		item.querySelector('.task-state').classList.add('badge-success')
	}

	taskList.appendChild(item);
}

async function listTasks() {
	const result = await callApi('GET', '/tareas/', { 'Authorization': `Bearer ${sessionStorage.jwt}` });

	if (result.status === 'error') {
		localStorage.removeItem('jwt');
		window.location = '/login.html';
	}

	taskList.innerHTML = '';

	const tareas = result.filter(tarea => tarea.estado !== 'eliminada');

	tareas.forEach((task) => {
		const { titulo, descripcion, id, estado, fecha_creacion, fecha_edicion } = task;
		addHTMLTask(titulo, descripcion, id, estado, fecha_creacion, fecha_edicion)
	});
}

async function updateTask(name, description, id, state) {
	// Envio tarea a la BD y recibo el id de la nueva tarea
	const response = await callApi('PUT', `/tareas/${id}`, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.jwt}` }, JSON.stringify({ name, description, state, edit_date: new Date().toISOString().slice(0, 19).replace('T', ' ') }));

	if (response.status === "ok") {
		Swal.fire({
			icon: 'success',
			title: `Tarea ${(state == "eliminada") ? "Eliminada" : "Actualizada"}`,
			text: 'Su tarea ha sido actualizada correctamente',
		})
		listTasks();
	}

	// invoco nuevamente al método para listar las tareas de la BD actualizadas

}

function submitFormTask(e) {
	e.preventDefault();
	const name = taskName.value;
	const description = taskDesription.value;

	if (name && description) {
		if (!editMode) {
			addTask(name, description);
			Swal.fire({
				icon: 'success',
				title: 'Tarea Agregada',
				text: 'Su tarea ha sido agregada correctamente',
			})
		} else {
			updateTask(name, description, taskId.value, taskStatus.value);
			formTitle.textContent = "Crear tarea";
			submitButton.textContent = "Crear";
			editMode = false;
			cancelButton.classList.add('d-none');
		}

	} else {
		console.log("Faltan datos");
	}
	this.reset();
}