const db = require('../src/database');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')

exports.crearUsuario = async (req, res) => {

	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	let { email } = req.body;

	try {
		// Chequear que el usuario registrado sea unico
		let usuario = await db.findUser(email);

		if (usuario) {
			return res.status(400).json({ msg: "El usuario ya existe" });
		}

		//Hashear el password
		const salt = await bcryptjs.genSalt(10);
		req.body.password = await bcryptjs.hash(String(req.body.password), salt);

		const idCreado = await db.createUser(req.body);
		res.json({ id: idCreado });
	} catch (error) {
		res.status(400).json({ msg: "Ocurrio un error" });
	}
}