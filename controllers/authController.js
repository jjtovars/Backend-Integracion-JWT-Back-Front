const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

//Funcion para autenticar el usuario
exports.autenticarUsuario = async(req, res) => {

    //Revisamos la validacion para ver si encontramos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try {
        //Verificamos que el usuario este registrado
        let usuario = await Usuarios.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Verificamos que el password este registrada
        let passOk = await bcryptjs.compare(password, usuario.password)
        if(!passOk){
            return res.status(400).json({msg: 'La contraseña no es valida'});
        }

        //Si es correcto se crea y se confirma el token
        const payload = {
            usuario:{
                id: usuario.id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRETA,{
                expiresIn: 43200,
            },
            (error, token) => {
                if(error) throw error;

                //Mensaje confirmacion
                res.json({token})
            }
        );
    } catch (error) {
        console.log('Hay un error')
        console.error(error)
        res.status(400).send('Hubo un error');
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try {
        let usuario = await Usuarios.findById(req.usuario.id);
        res.json({usuario})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error'})
    }
}