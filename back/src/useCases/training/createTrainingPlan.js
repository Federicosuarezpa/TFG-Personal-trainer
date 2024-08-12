import TrainingPlan from "../../models/trainingPlanModel.js";

async function createDiet(userId, trainingPlanJson, uniqueId) {
    try {
        await TrainingPlan.create({
            userId,
            trainingPlanJsonFormat: JSON.stringify(trainingPlanJson),
            trainingPlanHashId: uniqueId
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default createDiet;