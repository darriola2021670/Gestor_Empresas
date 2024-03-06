import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Categoria', CategoriaSchema);