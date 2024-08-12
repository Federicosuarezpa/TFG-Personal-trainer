import User from "../../models/userModel.js";

async function getUserByToken(token) {
    try {
        return await User.findOne({
            where: {
                token,
            },
            attributes: { exclude: ['password'] },
        });
    } catch (error) {
        throw error;
    }
}

export default getUserByToken;