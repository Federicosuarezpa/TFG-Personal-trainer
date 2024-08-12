import TrainingPlan from "../../models/trainingPlanModel.js";

async function getTrainingPlanByHash(userId, trainingHash) {
    try {
        await TrainingPlan.findOne({
            where: {
                userId,
                trainingPlanHashId: trainingHash
            }
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default getTrainingPlanByHash;