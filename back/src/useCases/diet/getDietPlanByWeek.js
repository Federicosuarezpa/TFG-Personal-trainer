import MealPlan from "../../models/mealPlanModel.js";

async function getDietPlanByWeek(userId, week) {
    try {
        return await MealPlan.findOne({
            where: {
                userId,
                week,
            },
            order: [
                ['id', 'DESC'],
            ],
        });
    } catch (error) {
        throw error;
    }
}

export default getDietPlanByWeek;