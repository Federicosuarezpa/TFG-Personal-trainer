import {v4 as uuidv4} from "uuid";
import {getLastUserHealthData} from "../usersHealthData/usersHealthInfoController.js";
import createTrainingPlan from "../../useCases/training/createTrainingPlan.js";
import {generateTrainingPlan} from "../../useCases/training/generateTrainingPlan.js";


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

export { generateTraining };