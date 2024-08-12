import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js';

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
    },
    token: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});

await sequelize.sync();

export default User;
