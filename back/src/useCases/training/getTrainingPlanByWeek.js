import TrainingPlan from "../../models/trainingPlanModel.js";

async function getTrainingPlanByWeek(userId, week) {
    try {
        return await TrainingPlan.findOne({
            where: {
                userId,
                week
            }
        });
    } catch (error) {
        throw error;
    }
}

export default getTrainingPlanByWeek;