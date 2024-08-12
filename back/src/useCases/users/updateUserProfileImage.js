import User from "../../models/userModel.js";

export default async function updateUserProfileImage(imageLink, id) {
    try {
        await User.update({
            image: imageLink
        }, {
            where: {
                id
            }
        });
    } catch (error) {
        return error;
    }
}