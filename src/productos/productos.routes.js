import { Router } from "express";
import { check } from 'express-validator';
import {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
    generarFactura, 
} from "./productos.controller.js";
import {
    existenteProductoById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getProductos);

router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    getProductoById
);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("stock", "El stock es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    createProducto,
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    updateProducto
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    deleteProducto
);

router.post(
    "/generar-factura",
    [
        validarCampos,
    ],
    generarFactura
);

export default router;
