
const express = require('express');
const {PORT} = require('./src/config');
const database = require('./src/database')
const app = express();
app.use(express.json());

const routingTareas = require('./src/routingTareas')


app.use('/tareas', routingTareas);

app.use(express.static('./public'));

(async () => {
    await database.initDB();
    app.listen(APP_PORT, () => {
      console.info(`Oyendo en puerto ${APP_PORT}`);
    });
  })();