import { Schema, model } from "mongoose";

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //- hacemos referencia al id de otro modelo
        ref: 'Usuario', //- la referencia la tomamos del modelo Usuario
        required: true
    }
});

//- Con esta modificacion es solo a la hora de llamarlo. No estamos haciendo la modificacion en la DB
EventoSchema.method('toJSON', function() {
    const { __v, _id, user, ...object } = this.toObject(); // Eliminamons las propiedades internas (__v y _id)
    object.id = _id; // sustituimos _id por id
    object.user = { uid: user?._id, name: user?.name };

    return object;
});


export default model('Evento', EventoSchema);