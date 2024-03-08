import mongoose from 'mongoose';
import Role from '../src/role/role.model.js';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Try connecting');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to MongoDB');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB | connected to database');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

        await Role.initRoles();
    } catch (error) {
        console.log('Database connection failed', error);
    }
};
