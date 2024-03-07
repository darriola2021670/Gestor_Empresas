'use strict';

import Producto from '../productos/productos.model.js';
import Categoria from './categorias.model.js';

export const saveCategoria = async (req, res) =>{
    const data = req.body;

    const producto = await Producto.findOne({id: data.id});

    if (!producto) return res.status(404).send({message: 'Producto no encontrado'});

    const pet = new Categoria({
        ...data,
        keeper: id._id,
    });
}

export const getCategorias = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { status: true };

    try {
        const categorias = await Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const categoriaWithOwnerNames = await Promise.all(categorias.map(async (pet) => {
            const owner = await Producto.findById(categoria.keeper);
            return {
                ...categoria.toObject(),
                keeper: owner ? owner.nombre : "Producto no encontrado",
            };
        }));

        const total = await Categoria.countDocuments(query);

        res.status(200).json({
            total,
            categorias: categoriaWithOwnerNames,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const searchCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        
        if (!categoria) {
            return res.status(404).json({ message: 'categoria no encontrada' });
        }

        const owner = await Producto.findById(categoria.keeper);

        res.status(200).json({
            categoria: {
                ...categoria.toObject(),
                keeper: owner ? owner.nombre : "Producto no encontrado",
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    await Categoria.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ msg: 'categoria eliminada exitosamente' });
}

