const { request, response, query } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuarioGet = async (req = request, res = response) => {
    // const { q, nombre = 'no tiene', apikey } = req.query

    const { limite = 5, desde = 0 } = req.query

    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments({ estado: true })

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({

        total,
        usuarios
    })
}

const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en la base de datos
    await usuario.save()

    res.json({ usuario })
}


const usuarioPut = async (req, res = response) => {
    const id = req.params.id
    const { _id, password, google, ...resto } = req.body

    // Todo validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json({ usuario })
}

const usuarioDelete = async (req, res = response) => {
    const id = req.params.id

    // Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    // Cambiar estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        usuario

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