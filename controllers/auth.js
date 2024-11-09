import { response } from 'express' //-opcional para tener el intelligence :rellenos automaticos
import bcrypt from 'bcryptjs' //-encriptar contraseñas
import Usuario from '../models/Usuario.js'
import { generarJWT } from '../helpers/jwt.js'

//-- POST ------------------------------------------------------------
const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body; 
    try{
        //- Buscamos en bd si existe el email que ingresa
        let usuario = await Usuario.findOne({email});
        //- si existe retornamos
        if(usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya existe en la base de datos'
            });
        }
        //--- Si no existe creamos una nueva instancia de Usuario, pasamos la req ---
        usuario = new Usuario(req.body);
        //- encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //-- Guardamos usuario en BD --
        //- al guardar se crea un campo mas que seria el id a la instancia usuario
        await usuario.save();

        //-- Generar nuestro JWT ( TOKEN ) --
        const token = await generarJWT(usuario.id, usuario.name);

        //- respuesta ok, usuario nuevo creado
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }
 
}

//-- POST ------------------------------------------------------------
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try{
        //-Buscamos en bd si existe el email que ingresa
        const usuario = await Usuario.findOne({email});
        //- si NO existe email
        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe con ese email'
            });
        }
        //- confiramar los passwords, comparamos pass que escribimos con el de la BD
        const validPassword = bcrypt.compareSync(password, usuario.password);

        //- si no es valido, si son diferentes los password
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            })
        }
        
        //-- Generar nuestro JWT ( TOKEN ) --
        const token = await generarJWT(usuario.id, usuario.name);

        //- Respuesta ok
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }catch(error) {
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

//-- GET ------------------------------------------------------------
const revalidarToken = async(req, res = response) => {
    //-el middleware validarJWT deposíta en la req los valores de uid y name
    const { uid, name } = req;

    //- Generamos un nuevo token
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token,
    })
}



export {
    crearUsuario,
    loginUsuario,
    revalidarToken
}