// factura.model.js
import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    productos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: [true, "Se necesita especificar el producto"]
        },
        cantidad: {
            type: Number,
            required: [true, "Se necesita especificar la cantidad"]
        }
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: [true, "Se necesita especificar el usuario"]
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: [true, "Se necesita especificar el total"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Factura', FacturaSchema);
