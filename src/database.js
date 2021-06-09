/*BASE DE DATOS DE PRUEBA PARA DEJAR HECHOS LOS ROUTING 

const DB = [{
            Id: 1,
            tarea: 'Programacion web 2',
            descripcion: 'Hacer las validaciones del post'
            },
            {
             Id: 2,
             tarea: 'Base de datos',
             descripcion: 'Hacer el tp'
            }];

module.exports = {
    DB
}; 

*/

const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');

let connection;

module.exports = {
    async initDB() {
      connection = await mysql.createConnection(DB_CONFIG);
    }, 

    //LISTAR TAREAS
    async list(ID_usuario) {
        const [users] = await connection.execute('SELECT * FROM Tarea WHERE usuario_id = ?',);
        return tareas;
  },
    // CREAR TAREAS
  async add(tarea) {
    validateUser(tarea);
    const { name, descripcion, ID_usuario } = tarea;
    const [result] = await connection.execute(
      'INSERT INTO Tarea(titulo, descripcion, usuario_id) VALUES(?, ?, ?)',
      [name, descripcion, ID_usuario]
    );

    return await this.find(result.insertId);
  },

  // Actualiza Datos

  async update(tarea, ID_tarea) {
    /*const user = await this.find(ID_tarea);

    if (!user) {
      throw new ResourceNotFoundError(
        `No existe un usuario con ID "${userId}"`,
        'user',
        userId
      );
    }

    validateUser(newUserData);

    // Actualiza datos

    if (newUserData.username) {
      user.username = newUserData.username;
    }

    if (newUserData.password) {
      user.password = newUserData.password;
    }

    user.name = newUserData.name;
    user.age = newUserData.age;
*/
    await connection.execute(
      'UPDATE tareas SET titulo = ?, descripcion = ?, fecha_actualizacion = ? WHERE usuario_id = ?',
      [tarea.name, tarea.description, tarea.fecha_edicion, ID_tarea]
    );

    return tarea;
  },

  async remove(id_tarea) {
    const user = await this.find(ID_tarea);

    /*if (!ID_tarea) {
      throw new ResourceNotFoundError(
        `No existe esa tarea "${userId}"`,        
       ID_tarea
      );
    }*/

    await connection.execute('DELETE FROM users WHERE id = ?', [user.id]);
  },

  //ResourceNotFoundError,
};