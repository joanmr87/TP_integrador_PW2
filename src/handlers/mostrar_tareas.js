
const database = require('./database')
const requestHandler = require('../../middlewares/requestHandler');


/*routingTareas.get('/', (req, res) => {
    console.log(`Metodo GET funcionando`);
    res.json(database.DB)
});*/
module.exports = (route) => {
    route.get(
      '/',
      requestHandler(async (req, res) => {
        const tareas = await database.list(req.query.filterName);
        res.json(tareas);
      })
    );
  };
  