const express = require('express');
const cors = require('cors');
const conectarDB = require('../config/db');

//Creamos el servidor
const app = express();
//Conecto la base de datos
conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('../routes/usuariosRoutes'))
app.use('/api/auth', require('../routes/authRoutes'))
app.use('/api/clientes', require('../routes/clientesRoutes'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log('Servidor iniciado');
})