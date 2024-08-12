import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js';

const TrainingPlan = sequelize.define('training_plan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    week: {
        type: DataTypes.INTEGER,
        trim: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true,
    },
    trainingPlanJsonFormat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainingPlanHashId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    added: {
        type: DataTypes.BOOLEAN,
    }
}, {
    tableName: 'training_plan',
    timestamps: false,
});

await sequelize.sync();

export default TrainingPlan;
