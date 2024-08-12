import hashPassword from "../../utils/hashingPassword.js";
import User from "../../models/userModel.js";

async function getUserByEmailAndPassword(email, password) {
    try {
        const hashedPassword = hashPassword(password);
        return await User.findOne({
            where: {
                email,
                password: hashedPassword,
            },
            attributes: { exclude: ['password'] },
        });
    } catch (error) {
        throw error;
    }
}

export default getUserByEmailAndPassword;