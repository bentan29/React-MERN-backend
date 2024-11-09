//--- configuracion conexion a DB
// const mongoose = require('mongoose');
import { mongoose } from "mongoose";

const dbConnection = async() => {
    try {
        //-conexion a mongo.. antes! se hacia asi
        // await mongoose.connect(process.env.DB_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online')

    }catch(error) {

        console.log(error)
        throw new Error('Error a l inicializar BD')

    }
}

export {
    dbConnection
}