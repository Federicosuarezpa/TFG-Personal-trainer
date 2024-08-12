import MealPlan from "../../models/mealPlanModel.js";

async function createDiet(userId, mealPlanJsonFormat, uniqueId) {
    try {
        await MealPlan.create({
            userId,
            mealPlanJsonFormat: JSON.stringify(mealPlanJsonFormat),
            mealPlanHash: uniqueId
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default createDiet;