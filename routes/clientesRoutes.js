const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//Aca van las rutas de mi CRUD
router.post('/', clienteController.agregarClientes);
router.get('/', clienteController.todosLosClientes);
router.get('/:clienteId', clienteController.clientePorId);
router.put('/:clienteId', clienteController.modificarCliente);
router.delete('/:clienteId', clienteController.eliminarCliente);

module.exports = router;