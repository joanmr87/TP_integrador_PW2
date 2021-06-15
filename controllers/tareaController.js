const db = require('../src/database');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const database = require('../src/database');

// Crear una tarea
exports.crearTarea = async (req, res) => {
	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const tarea = {
		nombre: req.body.name,
		descripcion: req.body.description,
		estado: req.body.state,
		fecha_creacion: req.body.date_creation
	};

	const idTarea = await db.addTask(tarea, req.usuario.id);
	res.json(idTarea);
}

// Obtener listado de tareas
exports.obtenerTareas = async (req, res) => {

	try {
		// Obtengo las tareas del usuario autenticado
		const tareas = await db.listTask(req.usuario.id);
		// console.log(tareas);
		res.json(tareas);
	} catch (error) {
		res.status(400).json({ msg: "Error al obtener tareas" });
	}
}

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const nuevaTarea = {
		nombre: req.body.name,
		descripcion: req.body.description,
		estado: req.body.state,
		fecha_edicion: req.body.edit_date
	};

	try {
		// Revisar si existe la tarea
		const tarea = await database.findTask(req.params.id);

		if (!tarea.length) {
			res.status(404).json({ msg: "Tarea no encontrada" });
		}

		if (tarea[0].usuario_id !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado a editar esta tarea" });
		}

		const resultado = await database.updateTask(nuevaTarea, req.params.id);
		res.json({ status: 'ok', affectedRows: resultado.affectedRows });

	} catch (error) {
		res.status(500).json({ msg: "Error al actualizar la tarea" });
	}
}


// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
	try {
		// Revisar si existe la tarea
		const tarea = await database.findTask(req.params.id);

		if (!tarea.length) {
			res.status(404).json({ msg: "Tarea no encontrada" });
		}

		if (tarea[0].usuario_id !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado a eliminar esta tarea" });
		}

		await database.deleteTask(req.params.id);
		res.json({ status: 'ok' });

	} catch (error) {
		res.status(500).json({ msg: "Error al actualizar la tarea" });
	}
}