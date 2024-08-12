import UserHealthData from "../../models/userHealthDataModel.js";

async function removeHealthDataByWeekId(userId, weekId) {
    try {
        return await UserHealthData.destroy({where: {week: weekId, userId}});
    } catch (error) {
        throw error;
    }
}

export default removeHealthDataByWeekId;