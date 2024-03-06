import { response, request } from "express";
import Producto from './productos.model.js';

export const getProductos = async (req = request, res = response) => {
    try {
        const { limite, desde, categoria } = req.query;
        let query = {};
   
        if (categoria) {
            query.categoria = categoria;
        }
   
        const productos = await Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
   
        res.status(200).json({
            total: productos.length,
            productos
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las empresas', error: error.message });
    }
};

export const createProducto = async (req, res) => {
    const { nombre, descripcion, stock, categoria } = req.body;
    const producto = new Producto ({ nombre, descripcion, stock, categoria });

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