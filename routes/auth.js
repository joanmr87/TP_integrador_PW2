const express = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();

// /api/auth
router.post('/',
    [
        check('email', 'Debe ser un email valido').not().isEmpty(),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario);

module.exports = router;