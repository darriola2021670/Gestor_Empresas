import { Router } from "express";
import { check } from "express-validator";
import { deleteCategoria, getCategorias, saveCategoria, searchCategoria } from "./categoria.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post('/',
    [
        validarJWT,
        check('id', 'Esta id es incorrecta').not().isEmpty(),
        validarCampos
    ], saveCategoria);

router.get('/', getCategorias);

router.get(
    '/:id',
    [
        validarJWT,
        validarCampos
    ], searchCategoria);

router.delete('/:id', [validarJWT, validarCampos], deleteCategoria);

export default router;