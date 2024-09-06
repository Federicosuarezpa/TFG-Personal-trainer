import MealPlan from "../../models/mealPlanModel.js";

export default async function updateDietPlanAdded(added, mealPlanHash, week) {
    try {
        await MealPlan.update({
            added,
            week
        }, {
            where: {
                mealPlanHash
            }
        });
    } catch (error) {
        return error;
    }
}