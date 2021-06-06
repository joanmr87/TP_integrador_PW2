const express = require('express');
const database = require('./src/database')

const routingTareas = express.Router();

routingTareas.get('/', (req, res) => {
    console.log(`Metodo GET funcionando`);
    res.json(database.DB)
});

routingTareas.post('/', (req, res) => {
    const tarea = req.body.tarea;   
    const estado = req.body.estado

    const tareaDeUsuario = {
        tarea: tarea,
        estado: estado
    };
    
    database.DB.push(tareaDeUsuario);
    res.json(tareaDeUsuario)
    console.log('La tarea fue agregada');
    
});

module.exports = routingTareas;