const express = require('express');
const database = require('../src/database')
const { body, validationResult } = require('express-validator');
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');

const routingTareas = express.Router();

// Listar tareas
// /api/tareas
routingTareas.get('/', async (req, res) => {

	const tareas = await database.listTask();
	res.json(tareas);
});

// Crear una tarea
// /api/tareas
routingTareas.post('/', tareaController.crearTarea);

module.exports = routingTareas;