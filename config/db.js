const mongoose = require('mongoose');
require('dotenv').config({path:'.env'});

//Creacion de la conexion con mongoDB

const conectarDB = () => {

    mongoose.connect(process.env.DB_MONGO)
    .then(() => console.log('Conectados con Mongo'))
    .catch((err) => console.error(err));
};

module.exports = conectarDB;
