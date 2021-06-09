const express = require('express');
const database = require('./database')


module.exports = (route) => {
  route.post(
    '/',
 
 (async (req, res) => {
      const name = req.body.name;
      const age = req.body.age;

      const user = await database.add({
        name: name.trim(),
        age: parseInt(age),
        username: 'test',
        password: 'test',
      });

      res.json(user);
    })
  );
};
