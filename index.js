// const express = require('express');
import path from 'path'
import { fileURLToPath } from 'url';
// Definir __dirname para ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import express from 'express'
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'; //-authRouter es un alias que le elegimos a la importacion, podemos inventar cualquiera
import eventRouter from './routes/events.js'; //- rutas de eventos
import {dbConnection} from './database/config.js'
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

//-imprimimos todos los procesos que estamos corritendo del .env
// console.log(process.env)

//- Crear el servidor de express
const app = express();
app.use(cors())

//- Base de datos
dbConnection();


//- Directorio Publico
app.use(express.static('public'));

//- Lectura y parseo del body, para aceptar y procesar las peticiones en formato json
app.use(express.json());

//------------ Rutas ------------------
app.use('/api/auth', authRouter); //-- auth, crear , login, renovacion
app.use('/api/events', eventRouter); //-- CRUD eventos

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});


//- Escuchar peticiones, nota: no usar el mismo puerto que el front o alguno que este usado
app.listen(process.env.PORT, () => { //- process.env.PORT tomamos el puerto definido en el .env
    console.log(`Servidor escuchando en el puertos ${process.env.PORT}`);
})