import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js';

const MealPlan = sequelize.define('meal_plan', {
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
    mealPlanJsonFormat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mealPlanHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    added: {
        type: DataTypes.BOOLEAN,
    }
}, {
    tableName: 'meal_plan',
    timestamps: false,
});

await sequelize.sync();

export default MealPlan;
