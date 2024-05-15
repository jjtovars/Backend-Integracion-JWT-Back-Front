const Clientes = require('../models/Clientes');


// Metodo POST
exports.agregarClientes = async(req, res) => {

    try {
        let crearCliente;
        crearCliente = new Clientes(req.body);
        await crearCliente.save();
        res.send(crearCliente);
    } catch (error) {
        res.status(500).send('Hubo un error al agregar un cliente');
    };
};

//Metodo GET

exports.todosLosClientes = async(req,res) => {

    try {
        const clientes = await Clientes.find();
        res.json({clientes})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al ver los clientes');
    }
};

//Metodo GET by Id
exports.clientePorId = async(req, res) => {

    try {
        const cliente = await Clientes.findById(req.params.clienteId)
        if(!cliente){
            return res.status(404).send('Cliente no encontrado con ese ID');
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al ver el cliente');
    }
}

//Metodo PATCH 
exports.modificarCliente = async(req,res) => {

    try {
        
        const updateCliente = await Clientes.findByIdAndUpdate(req.params.clienteId, req.body, { new: true });
        if(!updateCliente){
            return res.status(404).send('Cliente no encontrado');
        }
        res.json({updateCliente})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el cliente');
    }
}

//Metodo DELETE
exports.eliminarCliente = async(req,res) => {
    try {
        const deleteCliente = await Clientes.findByIdAndDelete(req.params.clienteId);
        if(!deleteCliente){
            return res.status(404).send('Cliente no encontrado');
        };
        res.json({msg: 'Cliente eliminado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el cliente');
    }
}