import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio'],
        unique: true,
    },
});

RoleSchema.statics.initRoles = async function () {
    try {
        const roles = ['ADMIN_ROLE', 'CLIENTE_ROLE'];

        for (const role of roles) {
            const existingRole = await this.findOne({ role });

            if (!existingRole) {
                await this.create({ role });
            }
        }
    } catch (error) {
        console.error('Error inicializando roles:', error);
    }
};

export default mongoose.model('Role', RoleSchema);
