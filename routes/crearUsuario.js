const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

const router = express.Router();

// Crear un usuario
// api/usuarios
router.post('/', usuarioController.crearUsuario);

module.exports = router;