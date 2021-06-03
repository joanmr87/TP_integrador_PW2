
const express = require('express');
const PORT = 3000;
const database = require('./src/database')
const app = express();

app.get('/tareas', (req, res) => {
    console.log(`Metodo GET funcionando`);
    res.json(database.DB)
});
 

app.use(express.json());

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});