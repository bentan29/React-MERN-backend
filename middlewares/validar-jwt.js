import { response } from "express"
import jwt from 'jsonwebtoken'

const validarJWT = (req, res = response, next) => {

    //x-token vienen de los headers
    const token = req.header('x-token');

    //-si no hay token
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        //-tomamos el uid y el name que metemos como payload cuando creamos el token
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    }catch(error){
        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        });
    }


    next();

}

export {
    validarJWT
}