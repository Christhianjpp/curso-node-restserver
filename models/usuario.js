const { Schema, model } = require('mongoose')

const UsuarioShema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es oblogatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es oblogatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es oblogatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioShema.methods.toJSON = function () {                 // sacar el password  
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}

module.exports = model('Usuario', UsuarioShema)