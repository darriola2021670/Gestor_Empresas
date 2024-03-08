// categoria.routes.js
import { Router } from "express";
import { check } from "express-validator";
import {
    deleteCategoria,
    getCategorias,
    saveCategoria,
    updateCategoria,
} from "./categoria.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    saveCategoria
);

router.get("/", getCategorias);

router.get(
    "/:id",
    [validarCampos],
    getCategorias
);

router.put(
    "/:id",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    updateCategoria
);

router.delete("/:id", [validarCampos], deleteCategoria);

export default router;
