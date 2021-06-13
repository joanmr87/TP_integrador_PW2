const express = require('express');
const database = require('./src/database')
const routingTareas = require('./routes/routingTareas')
const routingUsuarios = require('./routes/crearUsuario')
const auth = require('./routes/auth')


const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json({ extended: true }));

// app.use('/api/auth', auth);
app.use('/api/usuarios', routingUsuarios);
// app.use('/api/tareas', routingTareas);

app.use(express.static('./public'));

(async () => {
  await database.initDB();
  app.listen(PORT, () => {
    console.info(`Oyendo en puerto ${PORT}`);
  });
})();