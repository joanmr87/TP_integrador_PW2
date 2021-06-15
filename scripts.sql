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


