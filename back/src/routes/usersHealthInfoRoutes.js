import express from 'express';
import {
    addUserHealthDataWeek,
    getUserHealthData, getUserHealthDataByWeek,
    removeUserHealthData, updateUserHealthDataWeek
} from "../controllers/usersHealthData/usersHealthInfoController.js";
import {authUser} from "../middlewares/authUser.js";

const router = express.Router();

router.post('/add-week-data', authUser, addUserHealthDataWeek)

router.post('/modify-week-data/:week', authUser, updateUserHealthDataWeek)

router.get('/get-all-user-health-data', authUser, getUserHealthData)

router.get('/get-week-info/:week', authUser, getUserHealthDataByWeek)

router.post('/delete-info/:weekId', authUser, removeUserHealthData)


export default router;
