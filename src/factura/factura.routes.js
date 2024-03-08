import { Router } from 'express';
import { check } from 'express-validator';
import {
    getFacturasByUsuario,
    getFacturaById,
    createFactura,
} from './factura.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/:idUsuario', [validarJWT, validarCampos], getFacturasByUsuario);

router.get('/:id', [validarJWT, validarCampos], getFacturaById);

router.post(
    '/',
    [
        validarJWT,
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('productos', 'Los productos son obligatorios').not().isEmpty(),
        validarCampos,
    ],
    createFactura
);

export default router;
