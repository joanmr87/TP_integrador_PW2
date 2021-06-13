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
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');
let connection;

const database = process.env.BD_NOMBRE;
const host = process.env.BD_HOST;
const port = process.env.BD_PORT;
const user = process.env.BD_USER;
const password = process.env.BD_PASS;

module.exports = {
  async initDB() {
    // connection = await mysql.createConnection(DB_CONFIG);
    connection = await mysql.createConnection({ host, port, user, password, database });
  },

  async createUser(user) {
    const { usuario, password, email } = user;
    const [result] = await connection.execute(
      'INSERT INTO usuarios(usuario, password, email) VALUES(?, ?, ?)',
      [usuario, password, email]
    );

    console.log(result);

    return result.insertId;
  },

  //LISTAR TAREAS
  async listTask(tareas) {
    const [tarea] = await connection.execute('SELECT id, titulo, descripcion, estado, fecha_creacion FROM tareas');
    return tarea;
  },
  // CREAR TAREAS
  async addTask(tarea) {
    validateUser(tarea);
    const { titulo, descripcion, usuario_id } = tarea;
    const [result] = await connection.execute(
      'INSERT INTO TAREAS(titulo, descripcion, usuario_id) VALUES(?, ?, ?)',
      [titulo, descripcion, usuario_id]
    );

    return await this.find(result.insertId);
  },

  // Actualiza Datos

  async updateTask(TAREAS, id_tareas) {
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
      'UPDATE TAREAS SET titulo = ?, descripcion = ?, fecha_actualizacion = ? WHERE usuario_id = ?',
      [tarea.name, tarea.description, tarea.fecha_edicion, ID_tarea]
    );

    return tarea;
  },

  async removeTask(id_tarea) {
    const user = await this.find(id_tarea);

    /*if (!ID_tarea) {
      throw new ResourceNotFoundError(
        `No existe esa tarea "${tareas.id}"`,        
       tareas.id
      );
    }*/

    await connection.execute('DELETE FROM TAREAS WHERE id_tareas = ?', [TAREAS.id_tareas]);
  },

  //ResourceNotFoundError,
};