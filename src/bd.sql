create database Usuarios;
use Usuarios;

create table USUARIOS(
    id_usuario int auto_increment,
    apellido varchar(100) NULL,
    nombre varchar(100)NULL,
    nombre_usuario varchar(100) NOT NULL,
    pass varchar(100) NOT NULL,
    mail varchar(100) NOT NULL,
    primary key (id_usuario)    
);

create table TAREAS(
    id_tareas int auto_increment,
    titulo varchar(100),
    descripcion varchar(100),
    estado varchar(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_edicion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_eliminacion datetime,
    id_usuario int,
    primary key (id_tareas),
    foreign	key	(id_usuario) references usuarios(id_usuario)    
);

insert into usuarios (apellido, nombre, nombre_usuario, pass, mail) value('argenta','pepa','pepaargenta','4321','pepa@argenta.com');
insert into tareas (titulo, descripcion, estado) value ('Tarea 3', 'descripcion', 'estado');

SELECT * from USUARIOS;
SELECT * from TAREAS;

update tareas set titulo = 'titulos2', estado = 'finalizado'  where id_tareas = 1;
delete from tareas where id_tareas = 1; 

SELECT * FROM tareas =, WHERE ID_usuario = 2;