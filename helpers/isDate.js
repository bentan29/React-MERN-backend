import moment from "moment";

const isDate = (value) => {

    //-si no enviamos nada
    if (!value) {
        return false;
    }

    //- moment nos va a decir si una fecha correcta o no
    const fecha = moment(value);

    if(fecha.isValid()) {
        return true;
    } else {
        return false;
    }

}

export {
    isDate
}