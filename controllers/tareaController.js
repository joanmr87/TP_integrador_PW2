const db = require('../src/database');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Crear una tarea
exports.crearTarea = async (req, res) => {
	body('tarea').notEmpty().withMessage('Campo obligatorio');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const tareaDeUsuario = {
		Id: req.body.Id,
		tarea: req.body.tarea,
		descripcion: req.body.descripcion,
	};

	database.DB.push(tareaDeUsuario);
	res.json(tareaDeUsuario)
	console.log('La tarea fue agregada');

}