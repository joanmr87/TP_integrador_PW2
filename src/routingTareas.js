const express = require('express');
const database = require('./database')
const { body, validationResult } = require('express-validator');

const routingTareas = express.Router();

routingTareas.get('/', (req, res) => {
    console.log(`Metodo GET funcionando`);
    res.json(database.DB)
});

routingTareas.post('/',
body('tarea').notEmpty().withMessage('Campo obligatorio'), 
(req, res) => {
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
    
});

module.exports = routingTareas;