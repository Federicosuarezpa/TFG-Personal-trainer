import hashPassword from "../../utils/hashingPassword.js";
import User from "../../models/userModel.js";

async function createUser(email, password, age, name, lastname, address, phone) {
    try {
        const hashedPassword = hashPassword(password);
        return await User.create({
            email,
            password: hashedPassword,
            age,
            name,
            lastname,
            address,
            phone,
        });

    } catch (error) {
        throw error;
    }
}

export default createUser;