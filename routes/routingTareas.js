const express = require('express');
const { body, validationResult } = require('express-validator');
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');

const routingTareas = express.Router();

// Listar tareas
// /api/tareas
routingTareas.get('/', tareaController.obtenerTareas);

// Crear una tarea
// /api/tareas
routingTareas.post('/',
	[
		check('name', 'El nombre de la tarea es obligatorio').not().isEmpty()
	],
	tareaController.crearTarea
);

// Actualizar una tarea
// /api/tareas/id
routingTareas.put('/:id',
	[
		check('name', 'El nombre de la tarea es obligatorio').not().isEmpty()
	],
	tareaController.actualizarTarea
);

module.exports = routingTareas;