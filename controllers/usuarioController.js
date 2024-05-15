const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    //Revisamos la validacion para ver si encontramos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try {

        //Verificamos que el usuario sea unico
        let usuario = await Usuarios.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //Vamos a crear el usuario
        usuario = new Usuarios(req.body);

        //Verificamos el password
        usuario.password = await bcryptjs.hash(password, 12);

        //Guardamos el usuario
        await usuario.save();

        //Firmamos JWT
        const payload = {
            usuario:{
                id: usuario.id
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,{
                expiresIn: 3600,
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