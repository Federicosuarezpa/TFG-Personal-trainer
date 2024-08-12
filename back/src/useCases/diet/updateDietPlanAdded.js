import MealPlan from "../../models/mealPlanModel.js";

export default async function updateDietPlanAdded(added, mealPlanHash) {
    try {
        await MealPlan.update({
            added,
        }, {
            where: {
                mealPlanHash
            }
        });
    } catch (error) {
        return error;
    }
}