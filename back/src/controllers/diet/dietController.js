import dotenv from 'dotenv';
import getDietPlan from "../../useCases/diet/getDietPlan.js";
import createDiet from "../../useCases/diet/createDiet.js";
import generateDietPlan from "../../useCases/diet/generateDiet.js";
import getAllDietPlans from "../../useCases/diet/getAllDietPlans.js";
import {v4 as uuidv4} from "uuid";
import {getLastUserHealthData} from "../usersHealthData/usersHealthInfoController.js";
import deleteDietPlan from "../../useCases/diet/deleteDietPlan.js";
import updateDietPlanAdded from "../../useCases/diet/updateDietPlanAdded.js";

dotenv.config({ path: '../../.env' });

async function generateDiet(req, res, next) {
    try {
        const { allergies, foodDislike, foodLike } = req.body;
        const { id } = req.userAuth;
        const uniqueId = uuidv4();
        const userData = await getLastUserHealthData(id);
        if (!userData) {
            return res.status(400).json({error: 'Can not retrieve user data. Please fill your health data'});
        }
        const mealPlan = await generateDietPlan(allergies, foodLike, foodDislike, userData.averageCaloriesBurnt, userData.objective);

        if (!mealPlan) {
            return res.status(400).json({error: 'Error generating diet plan'});
        }

        await createDiet(id, mealPlan, uniqueId);


        res.status(200).json({message: 'Diet created successfully', uniqueId });
    } catch (error) {
        next(error)
    }
}

async function getDiet(req, res, next) {
    try {
        const {mealPlanHash} = req.params
        const mealPlan = await getDietPlan(mealPlanHash);
        const info = {
            id: mealPlan.id,
            userId: mealPlan.userId,
            week: mealPlan.week,
            mealPlanJsonFormat: JSON.parse(mealPlan.mealPlanJsonFormat),
            mealPlanHash: mealPlan.mealPlanHash
        };
        res.status(200).json({message: 'Diet retrieved successfully', info });
    } catch (error) {
        next(error)
    }
}

function extractCalories(mealDescription) {
    const calorieMatches = mealDescription.match(/\d+(?= kcal)/g);
    if (calorieMatches) {
        return calorieMatches.map(Number).reduce((a, b) => a + b, 0);
    }
    return 0;
}

function calculateDailyCalories(dailyMeal) {
    let totalCalories = 0;

    for (const mealKey in dailyMeal) {
        const meal = dailyMeal[mealKey];
        if (meal && meal.meal) {
            totalCalories += extractCalories(meal.meal);
        }
    }

    return totalCalories;
}

function updateMealPlansWithDailyCalories(weeklyMeals) {
    const updatedWeeklyMeals = { ...weeklyMeals };

    for (const day in updatedWeeklyMeals) {
        if (Object.prototype.hasOwnProperty.call(updatedWeeklyMeals, day)) {
            const dailyMeal = updatedWeeklyMeals[day];
            if (dailyMeal && typeof dailyMeal === 'object') {
                updatedWeeklyMeals[day].totalCalories = calculateDailyCalories(dailyMeal);
            }
        }
    }

    return updatedWeeklyMeals;
}

async function getAllPlans(req, res, next) {
    try {
        const { id } = req.userAuth;
        const mealPlan = await getAllDietPlans(id);

        if (!mealPlan) {
            return res.status(404).json({ message: 'No diet plans found' });
        }
        let weekNumber = 1;
        const mealPlansFormatted = mealPlan.map(data => data.dataValues);
        const info = mealPlansFormatted.map(data => {
            if (data.added) {
                weekNumber++;
                return;
            }
            const weeklyMeals = JSON.parse(data.mealPlanJsonFormat);
            const updatedMeals = updateMealPlansWithDailyCalories(weeklyMeals);

            return {
                id: data.id,
                userId: data.userId,
                week: data.week,
                mealPlanJsonFormat: updatedMeals,
                mealPlanHash: data.mealPlanHash
            };
        }).filter((data) => data !== undefined);

        res.status(200).json({ message: 'Diet retrieved successfully', info, weekNumber });
    } catch (error) {
        next(error);
    }
}

async function getDietExample(req, res, next) {
    try {
        const mealPlan = await getDietPlan('ef5bad8d-2d8f-4709-81c0-955c1bc6d301');

        if (!mealPlan) {
            return res.status(404).json({ message: 'No diet plans found' });
        }

        const weeklyMeals = JSON.parse(mealPlan.mealPlanJsonFormat);
        const updatedMeals = updateMealPlansWithDailyCalories(weeklyMeals);

        const info = [{
            id: mealPlan.id,
            userId: mealPlan.userId,
            week: mealPlan.week,
            mealPlanJsonFormat: updatedMeals,
            mealPlanHash: mealPlan.mealPlanHash
        }];

        res.status(200).json({ message: 'Diet retrieved successfully', info });
    } catch (error) {
        next(error);
    }
}

async function removeDietPlan(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { mealPlanHash } = req.params;
        const mealPlan = await getDietPlan(mealPlanHash);

        if (!mealPlan) {
            return res.status(404).json({ message: 'No diet plans found' });
        }

        if (mealPlan.userId !== id) {
            return res.status(403).json({ message: 'You are not allowed to access this diet plan' });
        }
        await deleteDietPlan(mealPlanHash);

        res.status(200).json({ message: 'Diet deleted successfully' });
    } catch (error) {
        next(error);
    }
}

async function updateDietPlan(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { mealPlanHash } = req.params;
        const mealPlan = await getDietPlan(mealPlanHash);

        if (!mealPlan) {
            return res.status(404).json({ message: 'No diet plans found' });
        }

        if (mealPlan.userId !== id) {
            return res.status(403).json({ message: 'You are not allowed to access this diet plan' });
        }
        await updateDietPlanAdded(1, mealPlanHash);

        res.status(200).json({ message: 'Diet updated successfully' });
    } catch (error) {
        next(error);
    }
}





export { generateDiet, getDiet, getAllPlans, removeDietPlan, updateDietPlan, getDietExample };