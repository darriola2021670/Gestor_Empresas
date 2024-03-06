import { response, request } from "express";
import Producto from './productos.model.js';

export const getProductos = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        productos,
    });
}

export const createProducto = async (req, res) => {
    const { nombre, descripcion, stock } = req.body;
    const producto = new Producto ({ nombre, descripcion, stock });

    await producto.save();

    res.status(200).json({
        producto,
    });
}

export const getProductoById = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOne({ _id: id });

    res.status(200).json({
        producto,
    });
}

export const updateProducto = async (req, res = response) => {
    const { id } = req.params;
    const { _id,  nombre, descripcion, stock, ...rest} = req.body;

    await Producto.findByIdAndUpdate(id, rest);

    const user = await Producto.findOne({ _id: id });

    res.status(200).json({
        msg: 'Producto Actualizado',
        producto,
    });
}

export const deleteProducto = async (req, res) =>{
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false });

    const authenticatedProducto = req.user;

    res.status(200).json({ msg: 'Producto sacado de stock', producto, authenticatedProducto });
}