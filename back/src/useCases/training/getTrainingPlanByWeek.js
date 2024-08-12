import TrainingPlan from "../../models/trainingPlanModel.js";

async function getTrainingPlanByWeek(userId, week) {
    try {
        await TrainingPlan.findOne({
            where: {
                userId,
                week
            }
        });

        return uniqueId;

    } catch (error) {
        throw error;
    }
}

export default getTrainingPlanByWeek;