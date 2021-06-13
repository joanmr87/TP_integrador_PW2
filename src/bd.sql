drop database if exists todo_app;
create database todo_app;
use todo_app;

drop table if exists usuarios;
create table usuarios(
    id int auto_increment,
    apellido varchar(100) NULL,
    nombre varchar(100)NULL,
    usuario varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    primary key (id)    
);

drop table if exists tareas;
create table tareas(
    id int auto_increment,
    titulo varchar(100) not null,
    descripcion text,
    estado varchar(15) default 'pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_edicion DATETIME ON UPDATE CURRENT_TIMESTAMP,
    fecha_eliminacion DATETIME,
    usuario_id int,
    primary key (id),
    foreign	key	(usuario_id) references usuarios(id)    
);

insert into usuarios (apellido, nombre, nombre_usuario, pass, mail) value('argenta','pepa','pepaargenta','4321','pepa@argenta.com');
insert into tareas (titulo, descripcion, estado) value ('Tarea 3', 'descripcion', 'estado');

SELECT * from USUARIOS;
SELECT * from TAREAS;

update tareas set titulo = 'titulos2', estado = 'finalizado'  where id_tareas = 1;
delete from tareas where id_tareas = 1; 

SELECT * FROM tareas =, WHERE ID_usuario = 2;