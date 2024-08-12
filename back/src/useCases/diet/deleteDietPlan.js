import MealPlan from "../../models/mealPlanModel.js";

const deleteDietPlan = async (mealPlanHash) => {
    try {
        await MealPlan.destroy({
            where: {
                mealPlanHash,
            },
        });
    }catch (error) {
        throw error;
    }
}

export default deleteDietPlan;