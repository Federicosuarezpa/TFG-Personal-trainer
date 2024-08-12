import User from "../../models/userModel.js";
import UserHealthData from "../../models/userHealthDataModel.js";
import MealPlan from "../../models/mealPlanModel.js";

async function removeUserAccount(userId) {
    try {
        await UserHealthData.destroy({where: {userId}});
        await MealPlan.destroy({where: {userId}});
        return await User.destroy({where: {id: userId}});
    } catch (error) {
        throw error;
    }
}

export default removeUserAccount;