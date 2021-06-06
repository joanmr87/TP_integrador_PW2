
const express = require('express');
const PORT = 3000;
const database = require('./src/database')
const app = express();
app.use(express.json());

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

app.use('/tareas', routingTareas);

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});

