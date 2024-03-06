import mongoose from "mongoose";

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    stock: {
        type: String,
        required: [true, "Se necesita saber el stock"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Producto', ProductoSchema);