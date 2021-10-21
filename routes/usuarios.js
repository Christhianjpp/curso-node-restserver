const { Router } = require('express')
const { check } = require('express-validator')

const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/usuarios')
const { esRoleValido, emalExiste, existeUsuarioPorId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

router.get('/', usuarioGet)

router.put('/:id', [
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPut)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),// Validar nombre obligatorio
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),  // validar correo
    check('correo', 'El correo ya existe').custom(emalExiste),
    //check('rol', 'No s un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost)
router.delete('/:id', [
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete)

router.patch('/', usuarioPatch)




module.exports = router