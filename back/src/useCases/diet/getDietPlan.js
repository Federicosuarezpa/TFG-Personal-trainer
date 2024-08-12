import { v4 as uuidv4 } from 'uuid';
import MealPlan from "../../models/mealPlanModel.js";

async function getDietPlan(mealPlanHash) {
    try {
        return await MealPlan.findOne({
            where: {
                mealPlanHash,
            },
            order: [
                ['id', 'DESC'],
            ],
        });
    } catch (error) {
        throw error;
    }
}

export default getDietPlan;