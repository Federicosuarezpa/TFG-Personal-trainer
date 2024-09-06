import TrainingPlan from "../../models/trainingPlanModel.js";

const deleteTrainingPlan = async (trainingPlanHash) => {
    try {
        await TrainingPlan.destroy({
            where: {
                trainingPlanHashId: trainingPlanHash,
            },
        });
    }catch (error) {
        throw error;
    }
}

export default deleteTrainingPlan;