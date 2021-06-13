const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

exports.autenticarUsuario = (req, res) => {
    // Reviso errores en la validacion
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer mail y password
    const { email, password } = req.body;
    try {
        // Revisar que el usuario este registrado
        let usuario = await
    } catch (error) {
        console.log(error);
    }
}