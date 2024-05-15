const express = require('express');
const router = express.Router();
const usuarioController = require ('../controllers/usuarioController');
const {check} = require('express-validator')

//api/usuarios
router.post('/',[
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('email', 'Ingresa un email valido').isEmail(),
    check('password', 'El password debe tener minimo 10 caracteres').isLength({min:10, }),
],
usuarioController.crearUsuario);

module.exports = router;