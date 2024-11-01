/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express'
import { check } from 'express-validator'; 
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

//- Crear usuario.
router.post(
    //-ruta
    '/new',
    //-middlewares
    [
        check('name', 'El nombre es obligaorio').not().isEmpty(), //-el campo nombre tiene que ser obligatorio y no tiene que estar vacio
        check('email', 'Email no valido').isEmail(), //-el campo mail, preguntamos si es un mail
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min:6}),
        validarCampos // custom middleware
    ],
    //-controlador 
    crearUsuario
);

//- Login.
router.post(
    '/',
    [
        check('email', 'Email no valido').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos // custom middleware
    ],
    loginUsuario
);

//- Revalidar Token.
router.get(
    '/renew', 
    validarJWT, 
    revalidarToken
);

// module.exports = router
export default router;

