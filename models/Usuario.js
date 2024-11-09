import { Schema, model } from "mongoose";

//-info que vamos a grabar en base de datos
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});



export default model('Usuario', UsuarioSchema);