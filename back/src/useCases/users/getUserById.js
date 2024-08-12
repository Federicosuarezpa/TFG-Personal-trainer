import User from "../../models/userModel.js";

async function getUserById(id) {
    try {
        return await User.findOne({
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
}

export default getUserById;