import UserHealthData from "../../models/userHealthDataModel.js";

async function getAllHealthDataByUserId(userId) {
    try {
        return await UserHealthData.findAll({
            where: {
                userId,
            },
        });
    } catch (error) {
        throw error;
    }
}

export default getAllHealthDataByUserId;