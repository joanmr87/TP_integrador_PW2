
const express = require('express');
const PORT = 3000;
const app = express();

/*app.get('/', (req, res) => {
    console.log(`Probando si funciona`);
    res.send(`Esto sale del parametro res de app.get`)
});
*/

app.use(express.json());

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
});