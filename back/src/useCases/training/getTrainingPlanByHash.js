import TrainingPlan from "../../models/trainingPlanModel.js";

async function getTrainingPlanByHash(userId, trainingHash) {
    try {
        return await TrainingPlan.findOne({
            where: {
                userId,
                trainingPlanHashId: trainingHash
            }
        });

    } catch (error) {
        throw error;
    }
}

export default getTrainingPlanByHash;