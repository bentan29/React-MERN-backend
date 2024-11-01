//- Todas tienen que pasar por la validacion del JWT

import { Router } from 'express'
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events.js";
import { isDate } from '../helpers/isDate.js';


const router = Router();

//-- Todas pasan por el mismo middleware !!! 
// las rutas que este abajo de esto router.use(validarJWT) herendan el middleware
router.use(validarJWT) //- tiene que haber un token activo

//- Obtener eventos
router.get('/', getEventos);

//- Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate), //custom validator para validar fechas
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate), //custom validator para validar fechas
        validarCampos
    ],
    crearEvento
);

//- Actualizar un nuevo
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate), //custom validator para validar fechas
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate), //custom validator para validar fechas
        validarCampos
    ], 
    actualizarEvento
);

//- Borrar un nuevo
router.delete('/:id', eliminarEvento);

export default router;