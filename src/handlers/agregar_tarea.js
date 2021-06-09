const express = require('express');
const database = require('./database')


 /*routingTareas.post('/',
body('tarea').notEmpty().withMessage('Campo obligatorio'), 
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //BUSCAR LA FORMA DE CAPTURAR msg PARA HACER UN ALERT
        console.log(errors.errors);
        return res.status(400).json({ errors: errors.array() });
      }

   

    const tareaDeUsuario = {
        Id: req.body.Id,
        tarea: req.body.tarea,
        descripcion: req.body.descripcion,
    };
    
    database.DB.push(tareaDeUsuario);
    res.json(tareaDeUsuario)
    console.log('La tarea fue agregada');
    
});*/

module.exports = (route) => {
  route.post(
    '/', body('tarea').notEmpty().withMessage('Campo obligatorio'), 
 (async (req, res) => { const errors = validationResult(req);
  if (!errors.isEmpty()) {
      //BUSCAR LA FORMA DE CAPTURAR msg PARA HACER UN ALERT
      console.log(errors.errors);
      return res.status(400).json({ errors: errors.array() });
    }

      const tareaDeUsuario = await database.add({
        Id: req.body.Id,
        tarea: req.body.tarea,
        descripcion: req.body.descripcion,
        username: 'test',
        password: 'test',
      });

      res.json(tareaDeUsuario);
    })
  );
};
