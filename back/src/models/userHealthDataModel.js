import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js';

const UserHealthData = sequelize.define('user_health_data', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    bodyFat: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    muscle: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    exerciseFrequency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    averageCaloriesBurnt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'user_health_data',
    timestamps: false,
});

await sequelize.sync();

export default UserHealthData;
