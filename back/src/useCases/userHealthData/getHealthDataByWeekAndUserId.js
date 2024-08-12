import UserHealthData from "../../models/userHealthDataModel.js";

async function getHealthDataByWeekAndUserId(userId, week) {
    try {
        return await UserHealthData.findOne({
            where: {
                userId,
                week,
            },
        });
    } catch (error) {
        throw error;
    }
}

export default getHealthDataByWeekAndUserId;