
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
    let tarea = req.body.tarea;   
    
    database.DB.push(tarea);
    res.json(tarea)
    console.log('La tarea fue agregada')
    
});

app.use('/tareas', routingTareas);




 



app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});