import getAllHealthDataByUserId from "../../useCases/userHealthData/getAllHealthDataByUserId.js";
import createUserHealthDataByWeek from "../../useCases/userHealthData/createUserHealthDataByWeek.js";
import {getUserData} from "../users/userController.js";
import getUserById from "../../useCases/users/getUserById.js";
import {getCaloriesBurntByActivity} from "../../services/apiServer.js";
import removeHealthDataByWeekId from "../../useCases/userHealthData/removeHealthDataByWeekId.js";
import getHealthDataByWeekAndUserId from "../../useCases/userHealthData/getHealthDataByWeekAndUserId.js";
import updateHealthDataByWeek from "../../useCases/userHealthData/updateHealthDataByWeek.js";

async function getUserHealthData(req, res, next) {
    try {
        const { id } = req.userAuth;

        if (!id) {
            return res.status(400).json({message: 'User id is required'});
        }

        const healthData = await getAllHealthDataByUserId(id);
        const formattedData = healthData.map(data => data.dataValues);


        res.status(200).json({message: 'Data retrieved successfully', formattedData});
    } catch (error) {
        next(error)
    }
}

async function getUserHealthDataByWeek(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { week } = req.params;

        if (!id) {
            return res.status(400).json({message: 'User id is required'});
        }

        const healthData = await getHealthDataByWeekAndUserId(id, week);

        if (!healthData) {
            return res.status(400).json({error: 'Data not found'});
        }

        const formattedData = healthData.dataValues;
        res.status(200).json({message: 'Data retrieved successfully', formattedData});
    } catch (error) {
        next(error)
    }
}

async function getLastUserHealthData(userId) {
    const healthData = await getAllHealthDataByUserId(userId);
    const formattedData = healthData.map(data => data.dataValues);
    if (formattedData.length === 0) {
        return null;
    }
    return formattedData[formattedData.length - 1];
}

async function addUserHealthDataWeek(req, res, next) {
    try {
        const { weight, height, muscle, bodyfat, objective, frequency } = req.body;
        const { id } = req.userAuth;

        if (!weight || !height) {
            return res.status(400).json({ message: 'Weight and height are required' });
        }
        /* Required to gather all user data and use a Python model + formula to calculate approximate calories burned just by existing, based on age, weight, height, and sex. */
        const userData = await getUserById(id);
        if (!userData) {
            return res.status(400).json({message: 'Can not retrieve user'});
        }
        const userHealthData = await getAllHealthDataByUserId(id);
        const userHealthDataFormatted = userHealthData.map(data => data.dataValues);
        const week = userHealthDataFormatted.length + 1;
        const userDataFormatted = userData.dataValues;
        const caloriesBurnt = await calculateCaloriesBasedOnUserData(userDataFormatted.age, userData.gender, height, weight, frequency);
        const predictCaloriesBurntByActivity = await getCaloriesBurntByActivity(weight, height, userDataFormatted.age, userData.gender);
        /*The response is in calories burnt by one day activity, so we multiply that value for the frequency of activity done and divided by the days of the week, so we get day average*/
        if (!predictCaloriesBurntByActivity || predictCaloriesBurntByActivity.status === 400) {
            return res.status(400).json({message: 'Can not retrieve calories burnt by activity'});
        }
        const totalCaloriesBurnt = caloriesBurnt + (predictCaloriesBurntByActivity.data * frequency / 7);
        await createUserHealthDataByWeek(id, height, weight, week, bodyfat, objective, muscle, frequency, totalCaloriesBurnt, '');

        res.status(200).json({message: 'Week created successfully'});
    } catch (error) {
        next(error)
    }
}

async function updateUserHealthDataWeek(req, res, next) {
    try {
        const {weight, height, muscle, bodyfat, objective, frequency} = req.body;
        const {id} = req.userAuth;
        const {week} = req.params;

        if (!weight || !height || !objective || !frequency) {
            return res.status(400).json({error: 'Weight, height, objective and frequency are required'});
        }

        const userData = await getUserById(id);
        if (!userData) {
            return res.status(400).json({error: 'Can not retrieve user'});
        }

        const userDataFormatted = userData.dataValues;
        const caloriesBurnt = await calculateCaloriesBasedOnUserData(userDataFormatted.age, userData.gender, height, weight, frequency);
        const predictCaloriesBurntByActivity = await getCaloriesBurntByActivity(weight, height, userDataFormatted.age, userData.gender);

        if (!predictCaloriesBurntByActivity || predictCaloriesBurntByActivity.status === 400) {
            return res.status(400).json({error: 'Can not retrieve calories burnt by activity'});
        }

        const totalCaloriesBurnt = caloriesBurnt + (predictCaloriesBurntByActivity.data * frequency / 7);
        await updateHealthDataByWeek(week, userId, height, weight, objective, frequency, muscle, bodyfat, totalCaloriesBurnt);

        res.status(200).json({message: 'Week updated successfully'});
    } catch (error) {
        next(error)
    }
}

async function removeUserHealthData(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { weekId } = req.params;

        if (!id) {
            return res.status(400).json({message: 'User id is required'});
        }

        if (!weekId) {
            return res.status(400).json({message: 'Week id is required'});
        }

        await removeHealthDataByWeekId(id, weekId);


        res.status(200).json({message: 'Week data removed successfully'});
    } catch (error) {
        next(error)
    }
}

async function calculateCaloriesBasedOnUserData(age, gender, height, weight, frequency) {
    let caloriesBurnt = 0;
    switch (gender) {
        case 'male':
            caloriesBurnt = (10 * weight) + (6.25 * height * 100) - (5 * age) + 5
            break;
        case 'female':
            caloriesBurnt = (10 * weight) + (6.25 * height * 100) - (5 * age) - 161
            break;
        default:
            caloriesBurnt = (10 * weight) + (6.25 * height * 100) - (5 * age) + 5
            break;
    }
    switch (frequency) {
        case 0:
            caloriesBurnt *= 1.2;
            break;
        case 1:
        case 2:
            caloriesBurnt *= 1.375;
            break;
        case 3:
        case 4:
        case 5:
            caloriesBurnt *= 1.55;
            break;
        case 6:
        case 7:
            caloriesBurnt *= 1.725;
            break;
        default:
            caloriesBurnt *= 1.9;
            break;
    }
    return caloriesBurnt;
}

export {getUserHealthData, addUserHealthDataWeek, removeUserHealthData, getLastUserHealthData, getUserHealthDataByWeek, updateUserHealthDataWeek};