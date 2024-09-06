import {v4 as uuidv4} from "uuid";
import {getLastUserHealthData} from "../usersHealthData/usersHealthInfoController.js";
import createTrainingPlan from "../../useCases/training/createTrainingPlan.js";
import {generateTrainingPlan} from "../../useCases/training/generateTrainingPlan.js";
import getAllDietPlans from "../../useCases/diet/getAllDietPlans.js";
import getAllTrainingPlans from "../../useCases/training/getAllTrainingPlans.js";
import updateTrainingPlan from "../../useCases/training/updateTrainingPlan.js";
import deleteTrainingPlan from "../../useCases/training/deleteTrainingPlan.js";
import getTrainingPlanByHash from "../../useCases/training/getTrainingPlanByHash.js";
import getTrainingPlanByWeek from "../../useCases/training/getTrainingPlanByWeek.js";


async function generateTraining(req, res, next) {
    try {
        const id  = 14;
        const uniqueId = uuidv4();
        const userData = await getLastUserHealthData(id);

        if (!userData) {
            return res.status(400).json({error: 'Can not retrieve user data. Please fill your health data'});
        }

        const trainingPlan = await generateTrainingPlan(userData.exerciseFrequency);

        if (!trainingPlan) {
            return res.status(400).json({error: 'Error generating diet plan'});
        }

        await createTrainingPlan(id, trainingPlan, uniqueId);


        res.status(200).json({message: 'Diet created successfully', uniqueId });
    } catch (error) {
        next(error)
    }
}

async function getAllPlans(req, res, next) {
    try {
        const { id } = req.userAuth;
        const trainingPlan = await getAllTrainingPlans(id);

        if (!trainingPlan) {
            return res.status(404).json({ message: 'No diet plans found' });
        }
        let weekNumber = 1;
        const trainingPlansFormatted = trainingPlan.map(data => data.dataValues);
        const info = trainingPlansFormatted.map(data => {
            if (data.added) {
                weekNumber++;
                return;
            }
            const weeklyTrainingPlan = JSON.parse(data.trainingPlanJsonFormat);

            return {
                id: data.id,
                userId: data.userId,
                week: data.week,
                trainingPlanJsonFormat: weeklyTrainingPlan,
                trainingPlanHash: data.trainingPlanHashId
            };
        }).filter((data) => data !== undefined);

        res.status(200).json({ message: 'Training plan retrieved successfully', info, weekNumber });
    } catch (error) {
        next(error);
    }
}

async function addTrainingPlan(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { trainingPlanHash } = req.params;

        if (!trainingPlanHash) {
            return res.status(404).json({ message: 'No training plan found' });
        }
        const allTrainingPlans = await getAllTrainingPlans(id);
        const allTrainingPlansFormatted = allTrainingPlans.map(data => data.dataValues);
        const trainingPlansAdded = allTrainingPlansFormatted.filter(data => data.added === true);
        await updateTrainingPlan(trainingPlanHash, trainingPlansAdded.length + 1, 1);
        res.status(200).json({ message: 'Training plan added successfully' });
    } catch (error) {
        next(error);
    }
}

async function deleteTraining(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { trainingPlanHash } = req.params;
        const getTrainingPlan = await getTrainingPlanByHash(id, trainingPlanHash);
        if (!getTrainingPlan) {
            return res.status(404).json({ message: 'No training plan found' });
        }
        await deleteTrainingPlan(trainingPlanHash);
        res.status(200).json({ message: 'Training plan deleted successfully' });
    } catch (error) {
        next(error);
    }
}

async function getTrainingPlanWeek(req, res, next) {
    try {
        const { id } = req.userAuth;
        const { week } = req.params;
        const trainingPlan = await getTrainingPlanByWeek(id, week);

        if (!trainingPlan) {
            return res.status(404).json({ message: 'No training plan found' });
        }
        const trainingPlanFormatted = trainingPlan.dataValues;
        const info =  [{
            id: trainingPlanFormatted.id,
            userId: trainingPlanFormatted.userId,
            week: trainingPlanFormatted.week,
            trainingPlanJsonFormat: JSON.parse(trainingPlanFormatted.trainingPlanJsonFormat),
            trainingPlanHash: trainingPlanFormatted.trainingPlanHashId
        }];
        res.status(200).json({ message: 'Training plan retrieved successfully', info, weekNumber: trainingPlanFormatted.week });
    } catch (error) {
        next(error);
    }
}
export { generateTraining, getAllPlans, addTrainingPlan, deleteTraining, getTrainingPlanWeek };