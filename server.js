const express = require('express');
const { APP_PORT } = require('./src/config');
const database = require('./src/database')
const routingTareas = require('./routes/routingTareas')
const auth = require('./routes/auth')

const app = express();
app.use(express.json());


// app.use('/api/auth', auth);
app.use('/api/tareas', routingTareas);

app.use(express.static('./public'));

(async () => {
  await database.initDB();
  app.listen(APP_PORT, () => {
    console.info(`Oyendo en puerto ${APP_PORT}`);
  });
})();