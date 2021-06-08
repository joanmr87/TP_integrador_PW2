
const express = require('express');
const {PORT} = require('./src/config');
const database = require('./src/database')
const app = express();
app.use(express.json());

const routingTareas = require('./src/routingTareas')


app.use('/tareas', routingTareas);

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});

