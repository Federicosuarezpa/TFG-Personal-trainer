import MealPlan from "../../models/mealPlanModel.js";

async function getAllDietPlans(userId) {
    try {
        return await MealPlan.findAll({
            where: {
                userId,
            },
            order: [
                ['id', 'DESC'],
            ],
        });
    } catch (error) {
        throw error;
    }
}

export default getAllDietPlans;