const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator')
const auth = require('../middlewares/authMiddleware');

//Vamos a autenticar el usuario
//api/usuarios
router.post('/',[
    check('email', 'Ingresa un email valido').isEmail(),
    check('password', 'El password debe tener minimo 10 caracteres').isLength({min:10, }),
],
authController.autenticarUsuario
);

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;