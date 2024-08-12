import express from 'express';
import {
    login,
    register,
    forgottenPassword,
    changePasswordWithToken,
    updateUser,
    removeUser,
    getUserData,
    saveProfileImage,
    getUserProfilePhoto
} from "../controllers/users/userController.js";
import {authUser} from "../middlewares/authUser.js";
import {upload} from "../helpers/auxFunctions.js";

const router = express.Router();

router.post('/login', login)

router.post('/register', register)

router.post('/reset-password', forgottenPassword)

router.post('/change-password', changePasswordWithToken)

router.post('/update-profile', authUser, updateUser)

router.post('/delete-user', authUser, removeUser)

router.post('/add-profile-image', authUser, upload.single('fileUpload'), saveProfileImage)

router.get('/get-user-profile-image', authUser, getUserProfilePhoto)



router.get('/:id', authUser, getUserData)

export default router;
