
const express = require('express');
const PORT = 3000;
const database = require('./src/database')
const app = express();
app.use(express.json());

const routingTareas = require('./apiHandlers')


app.use('/tareas', routingTareas);

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});

