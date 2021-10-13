const { request, response } = require('express')

const usuarioGet = (req = request, res = response) => {
    const { q, nombre = 'no tiene', apikey } = req.query

    res.json({
        msg: 'get API- controlador',
        q,
        nombre,
        apikey
    })
}

const usuarioPost = (req = request, res = response) => {
    const { nombre, edad } = req.body


    res.json({
        msg: 'post API - controlador',
        nombre, edad
    })
}
const usuarioPut = (req, res = response) => {
    const id = req.params.id

    res.json({

        msg: 'put API - controlador',
        id
    })
}

const usuarioDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delite API - controlador'
    })
}
const usuarioPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
}


module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}