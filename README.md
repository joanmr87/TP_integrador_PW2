# Programación Web 2 - Trabajo Práctico Integrador

Autores: Martin Gonzalez, Facundo Cepeda, Joan M. Romero.

Implementar una aplicación para llevar el control de una lista de tareas pendientes (TODOs). Cada tarea está compuesta por un título, una descripción y un estado (pendiente, completada o eliminada). La aplicación debería permitir crear y modificar tareas, cambiarlas de estado y listarlas, teniendo en cuenta las siguientes consideraciones:

* El título es obligatorio.
* La descripción es opcional.
* Sólo deben listarse las tareas que no están en estado eliminado.
* Las tareas deben crearse con estado pendiente, luego pueden pasar al estado completada o eliminada.
* Una tarea pendiente o completada puede eliminarse, pero una tarea eliminada no puede cambiar su estado.
* La aplicación debe contar con un mecanismo de autenticación, y cada usuario debería poder acceder únicamente a las tareas que él creó.
* No debe visualizarse la lista de tareas hasta que el usuario inicie sesión.
* No se deben poder realizar acciones hasta que el usuario esté logueado.
* Los usuarios se crearán en la Base de Datos directamente.
* Las entradas deberán contar con una fecha de creación, una fecha de edición y, cuando se elimine, una fecha de eliminación.
* Debe ser posible editar un registro en estado pendiente únicamente.

La aplicación constará de un un frontend que se comunicará con una API REST, que a su vez hará uso de una base de datos MySQL para almacenar la información.

La entrega se hará mediante un repositorio GIT que deberá además contener un dump de la base de datos utilizada por la aplicación.

El trabajo debe ser realizado por un equipo de trabajo de no más de 3 personas. Todos deben trabajar en el mismo repositorio. La evaluación final incluirá revisión de Commits individuales de cada integrante en el equipo.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

## Construido con 🛠️

* MySQL 5.7.34
* NodeJS v15.13.0

Para que funcione correctamente la aplicación, modificar las credenciales de su base de datos en el archivo `config.env.dist` y quitar la extesnión `dist`.

## Iniciar la aplicación 📦

### Base de datos

Puede hacer uso del archivo `scripts.sql` para crear la base de datos con sus respectivas tablas.

### Aplicación

Para iniciar la aplicación debe:
* Instalar las dependencias ejecutando `npm install`
* Iniciar la aplicación con el comando `npm start`

Puede acceder a la aplicación en `http://localhost:4000` por defecto. Puede modificar el puerto en el archivo `config.env` en la variable `PORT`.