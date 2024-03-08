import { response, request } from 'express';
import Factura from './factura.model.js';
import Producto from '../productos/productos.model.js';

export const getFacturasByUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const facturas = await Factura.find({ usuario: id }).populate('productos.producto');

        res.status(200).json({
            total: facturas.length,
            facturas,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getFacturaById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const factura = await Factura.findById(id).populate('productos.producto');

        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        res.status(200).json({
            factura,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createFactura = async (req, res) => {
    const { usuario, productos } = req.body;

    try {
        for (const item of productos) {
            const { producto, cantidad } = item;
            const productoDB = await Producto.findById(producto);

            if (!productoDB || productoDB.stock < cantidad) {
                return res.status(400).json({ message: 'Producto no disponible en stock' });
            }
        }

        const factura = new Factura({
            usuario,
            productos,
            total: calcularTotal(productos),
        });

        await factura.save();

        await Promise.all(
            productos.map(async (item) => {
                const { producto, cantidad } = item;
                await Producto.findByIdAndUpdate(producto, {
                    $inc: { stock: -cantidad },
                });
            })
        );

        res.status(200).json({
            factura,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const calcularTotal = (productos) => {
    return productos.reduce((total, item) => {
        return total + item.cantidad * item.producto.precio; 
    }, 0);
};
