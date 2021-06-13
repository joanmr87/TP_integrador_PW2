const db = require('../src/database');

exports.crearUsuario = async (req, res) => {
    try {
        let usuario;
        console.log(req.body);
        const idCreado = await db.createUser(req.body);
        res.json({ id: idCreado });
    } catch (error) {

    }
}