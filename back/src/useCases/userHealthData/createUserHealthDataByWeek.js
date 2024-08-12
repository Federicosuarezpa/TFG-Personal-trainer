import UserHealthData from "../../models/userHealthDataModel.js";

async function createUserHealthDataByWeek(userId, height, weight, week, bodyFat, objective, muscle, exerciseFrequency, averageCaloriesBurnt, imageLink) {
    try {
        return await UserHealthData.create({
            userId,
            height: Number(height),
            weight: Number(weight),
            week,
            bodyFat: bodyFat ? Number(bodyFat) : null,
            objective,
            muscle: muscle ? Number(muscle) : null,
            exerciseFrequency,
            averageCaloriesBurnt,
            image: imageLink
        });
    } catch (error) {
        throw error;
    }
}

export default createUserHealthDataByWeek;