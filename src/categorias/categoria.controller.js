import Producto from "../productos/productos.model.js";
import Categoria from "./categorias.model.js";

export const saveCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const categoria = new Categoria({
            nombre,
            descripcion,
        });

        await categoria.save();

        res.status(200).json({
            categoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getCategorias = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const categorias = await Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Categoria.countDocuments(query);

        const categoriasConProductos = await Promise.all(
            categorias.map(async (categoria) => {
                const productos = await Producto.find({ categoria: categoria._id });
                return {
                    ...categoria.toObject(),
                    productos,
                };
            })
        );

        res.status(200).json({
            total,
            categorias: categoriasConProductos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const categoria = await Categoria.findByIdAndUpdate(
            id,
            { nombre, descripcion },
            { new: true }
        );

        res.status(200).json({
            msg: "Categoría actualizada",
            categoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByIdAndDelete(id);

        if (categoria) {
            const categoriaPredeterminada = await Categoria.findOne({
                nombre: "Categoría Predeterminada",
            });

            await Producto.updateMany(
                { categoria: id },
                { $set: { categoria: categoriaPredeterminada._id } }
            );
        }

        res.status(200).json({ msg: "Categoría eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
