import { response } from 'express' //-opcional para tener el intelligence :rellenos automaticos
import { validationResult } from 'express-validator';

const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() //. serealizamos los errores
        })
    }

    //- Si no hay nigun error llamamos a next() y pasa al siguiente
    next();

}


export {
    validarCampos
}