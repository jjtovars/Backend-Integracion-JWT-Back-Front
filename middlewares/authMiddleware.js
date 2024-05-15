const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    //Leer el token en el header
    const token = req.header('x-auth-token');

    //Revisar si hay token
    if(!token){
        return res.status(400).json({msg: 'No se encuentra un token'})
    }

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(400).json({msg: 'El token no es valido'})
    }
}