//Esto me lo agrego solo 
const { response } = require('express');
const express = require('express');
//Esto me lo agrego solo 
const { clearScreenDown } = require('readline');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    console.log(`Probando si funciona y mirando que viene en req:${req}`);
    res.send(`Esto sale del parametro res de app.get`)
});

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});