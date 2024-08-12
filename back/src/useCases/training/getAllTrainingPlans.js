import TrainingPlan from "../../models/trainingPlanModel.js";

async function getAllTrainingPlans(userId) {
    try {
        await TrainingPlan.findAll({
            where: {
                userId,
            }
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default getAllTrainingPlans;