
const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    console.log(`Probando si funciona y mirando que viene en req`, req);
    res.send(`Esto sale del parametro res de app.get`)
});

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});