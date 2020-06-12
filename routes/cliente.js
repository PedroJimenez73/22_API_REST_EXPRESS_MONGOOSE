let express = require('express');

let app = express();

let Cliente = require('../models/cliente');

app.get('/', (req, res) => {

    Cliente.find({}, (error, clientes) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        res.status(200).json({
            clientes: clientes
        })

    })
})

app.get('/:_id', (req, res) => {

    Cliente.findById(req.params._id, (error, cliente) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        res.status(200).json({
            cliente: cliente
        })

    })
})

app.get('/cif/:cif', (req, res) => {

    Cliente.find({cif: req.params.cif}, (error, cliente) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        res.status(200).json({
            cliente: cliente
        })

    })
})

app.post('/', (req, res) => {

    let cliente = new Cliente({
        nombre: req.body.nombre,
        cif: req.body.cif,
        calle: req.body.calle,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
        email: req.body.email,
        pago: req.body.pago
    })

    cliente.save((error, clienteSaved) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        res.status(200).json({
            mensaje: `El cliente ${clienteSaved.nombre} ha sido creado`
        })
    })
})

module.exports = app;