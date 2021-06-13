const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../src/database');
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res) => {
	// Reviso errores en la validacion
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	// Extraer mail y password
	const { email, password } = req.body;
	try {
		// Revisar que el usuario este registrado
		let usuario = await db.findUser(email);
		// console.log(usuario[0].password);

		if (!usuario.length) {
			return res.status(400).json({ msg: "El usuario no existe" });
		}

		// Revisar el pass
		const passCorrecto = await bcryptjs.compare(password, usuario[0].password);
		if (!passCorrecto) {
			return res.status(400).json({ msg: "Password incorrecto" });
		}

		// Si las credenciales son correctas
		const payload = {
			usuario: {
				id: usuario[0].id
			}
		}

		jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: 3600 // 1 hora
		}, (error, token) => {
			if (error) throw error;

			res.json({ token });
		})

	} catch (error) {
		console.log(error);
	}
}