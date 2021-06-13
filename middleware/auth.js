const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	// Leer el token del header
	const headerAuth = req.header('Authorization');


	// Revisar si no hay token
	if (!headerAuth) {
		return res.status(401).json({ msg: "No autorizado" });
	}

	try {
		const [bearer, token] = headerAuth.split(' ');
		const cifrado = jwt.verify(token, process.env.JWT_SECRET)
		req.usuario = cifrado.usuario;
		next();
	} catch (error) {
		res.status(401).json({ msg: "Token no valido" });
	}



	// Validar el token
}