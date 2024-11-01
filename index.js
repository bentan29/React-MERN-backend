// const express = require('express');
import express from 'express'
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'; //-authRouter es un alias que le elegimos a la importacion, podemos inventar cualquiera
import eventRouter from './routes/events.js'; //- rutas de eventos
import {dbConnection} from './database/config.js'

// Cargar variables de entorno
dotenv.config();

//-imprimimos todos los procesos que estamos corritendo del .env
// console.log(process.env)

//- Crear el servidor de express
const app = express();

//- Base de datos
dbConnection();

//- Directorio Publico
app.use(express.static('public'));

//- Lectura y parseo del body, para aceptar y procesar las peticiones en formato json
app.use(express.json());

//------------ Rutas ------------------
//-- auth, crear , login, renovacion
app.use('/api/auth', authRouter);

//-- CRUD eventos
app.use('/api/events', eventRouter);


//- Escuchar peticiones, nota: no usar el mismo puerto que el front o alguno que este usado
app.listen(process.env.PORT, () => { //- process.env.PORT tomamos el puerto definido en el .env
    console.log(`Servidor escuchando en el puertos ${process.env.PORT}`);
})