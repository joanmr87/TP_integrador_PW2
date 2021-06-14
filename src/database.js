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
// const { DB_CONFIG } = require('./config');
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

	async findUser(email) {
		const [user] = await connection.execute('SELECT `id`, `usuario`, `password` FROM `usuarios` WHERE `email` = ?', [email]);

		return user;

	},

	async createUser(user) {
		const { usuario, password, email } = user;
		const [result] = await connection.execute(
			'INSERT INTO usuarios(usuario, password, email) VALUES(?, ?, ?)',
			[usuario, password, email]
		);

		return result.insertId;
	},

	async findTask(id) {
		const [tarea] = await connection.execute('SELECT id, titulo, descripcion, estado, fecha_creacion, fecha_edicion, usuario_id FROM tareas WHERE id = ?', [id]);
		return tarea;
	},

	//LISTAR TAREAS
	async listTask(userId) {
		const [tareas] = await connection.execute('SELECT id, titulo, descripcion, estado, fecha_creacion, fecha_edicion FROM tareas WHERE usuario_id = ?', [userId]);
		return tareas;
	},
	// CREAR TAREAS
	async addTask(tarea, usuario_id) {
		const { nombre, descripcion, estado, fecha_creacion } = tarea;
		const [result] = await connection.execute(
			'INSERT INTO tareas(titulo, descripcion, estado, fecha_creacion, fecha_edicion, usuario_id) VALUES(?, ?, ?, ?, ?, ?)',
			[nombre, descripcion, estado, fecha_creacion, fecha_creacion, usuario_id]
		);

		return result.insertId;
	},

	// Actualiza Datos

	async updateTask(tarea, id) {
		const { nombre, descripcion, estado, fecha_edicion } = tarea
		const [result, row] = await connection.execute(
			'UPDATE TAREAS SET titulo = ?, descripcion = ?, estado = ?, fecha_edicion = ? WHERE id = ?',
			[nombre, descripcion, estado, fecha_edicion, id]
		);

		return result;
	},

	async deleteTask(id) {
		await connection.execute('DELETE FROM tareas WHERE id = ?', [id]);
	},

	//ResourceNotFoundError,
};