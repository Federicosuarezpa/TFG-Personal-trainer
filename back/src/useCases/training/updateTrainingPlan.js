import TrainingPlan from "../../models/trainingPlanModel.js";

async function updateTrainingPlan(trainingPlanHash, week, added) {
    try {
        await TrainingPlan.update({
            added,
            week
        }, {
            where: {
                trainingPlanHashId: trainingPlanHash,
            }
        });
    } catch (error) {
        throw error;
    }
}

export default updateTrainingPlan;