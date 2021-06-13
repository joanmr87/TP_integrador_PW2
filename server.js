const express = require('express');
const { PORT } = require('./src/config');
const database = require('./src/database')
const routingTareas = require('./routes/routingTareas')

const app = express();
app.use(express.json());



app.use('/api/tareas', routingTareas);

app.use(express.static('./public'));

(async () => {
  await database.initDB();
  app.listen(APP_PORT, () => {
    console.info(`Oyendo en puerto ${APP_PORT}`);
  });
})();