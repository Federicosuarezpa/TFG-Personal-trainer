import TrainingPlan from "../../models/trainingPlanModel.js";

async function getAllTrainingPlans(userId) {
    try {
        return await TrainingPlan.findAll({
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

export default getAllTrainingPlans;