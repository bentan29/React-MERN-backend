import { response } from 'express'; //-opcional para tener el intelligence :rellenos automaticos
import Evento from '../models/Evento.js';

//--------- Tomar todos los eventos.
const getEventos = async(req, res = response) => {
    //- cargamos todos
    const eventos = await Evento.find() //-los filtros entrar en el find ({})
                            .populate('user','name'); //-queremos el contenido de user, y que muestre solo el name, el _id lo trae por defecto

    res.json({
        ok: true,
        eventos
    });
};

//--------- Crear nuevo evento.
const crearEvento = async(req, res = response) => {
    const evento = new Evento(req.body);
    try{
        //- el modelo evento en la propiedad user va a tener el uid que tomamos del middleware validarJWT al inicio de las rutas
        evento.user = req.uid;
        
        //-guardamos en DB
        const eventoGuardado = await evento.save();

        res.json({
            ok:true,
            evento: eventoGuardado
        })
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

//--------- Actualizar el evento.
const actualizarEvento = async(req, res = response) => {
    const eventoId = req.params.id; //- tomamos el valor id que viene en los parametros
    const uid = req.uid; //-id que llega del middleware

    try{
        const evento = await Evento.findById(eventoId);

        //- si no encuentra el id
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            })
        }

        //- si el id del evento registrado es distinto al usuario que lo quiere cambiar
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar este evento'
            })
        }

        //- Nueva data
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //- Buscamos el evento por el id del evento, y la nueva data, {new:true} retorna el nuevo evento, sin ello retornaria el anterior
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

//--------- Eliminar un evento por el id
const eliminarEvento = async (req, res = response) => {

    const eventoEliminarId = req.params.id; //- id del evento
    const uid = req.uid; //- id del usuario logeado, quien hace la solicitud

    try{
        //-buscamos el evento
        const evento = await Evento.findById(eventoEliminarId);

        //-verificamos si existe
        if(!evento) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        //-verificamos si el usuario que solicita es el dueño del evento
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar este evento'
            });
        }

        //-eliminamos el evento
        const eventoEliminado = await Evento.findByIdAndDelete(eventoEliminarId);

        res.json({
            ok: true,
            eventoEliminado
        })

    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}