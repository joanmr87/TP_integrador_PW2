const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

const router = express.Router();

// Crear un usuario
// api/usuarios
router.post('/',
	[
		check('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email valido').isEmail(),
		check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 })
	],
	usuarioController.crearUsuario);

module.exports = router;