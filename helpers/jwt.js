import jwt from 'jsonwebtoken';


//- Generador de token
const generarJWT = ( uid, name ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        // Generamos el jwt. pasandole el (paylod), (secretOrPrivateKey) seria una palabra unica secreta y rara, y ({cuando expira})
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' //expira en 2 horas
        }, (err, token) => { //-cuando se firma  el token pasa a este callbak y retorna error o el token

            //-si hay un error
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            //-si sale correctamente
            resolve(token);

        })

    })

}

export {
    generarJWT
}