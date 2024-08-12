import TrainingPlan from "../../models/trainingPlanModel.js";

async function addTrainingPlan(userId, week, added) {
    try {
        await TrainingPlan.update({
            added,
        }, {
            where: {
                userId,
                week,
            }
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default addTrainingPlan;