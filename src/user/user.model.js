import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
      },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true,   
    },
    role: {
        type: String,
        required: true,
        enum:["ADMIN_ROLE","USER_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.id = _id;
    return usuario;
};

export default mongoose.model('User', UserSchema);