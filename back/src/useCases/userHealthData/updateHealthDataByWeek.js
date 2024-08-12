import UserHealthData from "../../models/userHealthDataModel.js";

async function updateHealthDataByWeek(week, userId, height, weight, objective, frequency, muscle, bodyfat, totalCaloriesBurnt) {
    try {
        return await UserHealthData.update({
            height,
            weight,
            objective,
            frequency,
            muscle,
            bodyfat,
            averageCaloriesBurnt: totalCaloriesBurnt,
            where: {
                userId,
                week,
            },
        });
    } catch (error) {
        throw error;
    }
}

export default updateHealthDataByWeek;