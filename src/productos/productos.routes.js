import { Router } from "express";
import { check } from "express-validator";
import {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
} from "./productos.controller.js";
import{
    existenteProductoById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get("/", getProductos);

router.get(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    getProductoById
);

router.post(
    "/",
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
      check("stock", "El stock es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    createProducto,
);

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    updateProducto
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existenteProductoById),
        validarCampos,
    ],
    deleteProducto
);

export default router;