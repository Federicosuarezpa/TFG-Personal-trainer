import User from "../../models/userModel.js";

export default async function updateUserData(age, address, phone, gender, id) {
    try {
        await User.update({
            age,
            address,
            phone,
            gender
        }, {
            where: {
                id
            }
        });
    } catch (error) {
        return error;
    }
}