import User from "../../models/userModel.js";

async function getUserByEmail(email) {
    try {
        return await User.findOne({
            where: {
                email,
            },
        });
    } catch (error) {
        throw error;
    }
}

export default getUserByEmail;