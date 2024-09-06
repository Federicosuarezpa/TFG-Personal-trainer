import express from 'express';
import {authUser} from "../middlewares/authUser.js";
import {
    addTrainingPlan,
    generateTraining,
    getAllPlans,
    deleteTraining,
    getTrainingPlanWeek
} from "../controllers/training/trainingPlanController.js";

const router = express.Router();

router.post('/generate-plan', authUser, generateTraining)
router.get('/get-all-training-plans', authUser, getAllPlans)
router.get('/get-example-training-plan/:trainingHash', generateTraining)
router.post('/add-training-plan/:trainingPlanHash', authUser, addTrainingPlan)
router.delete('/delete-training-plan/:trainingPlanHash', authUser, deleteTraining)
router.get('/get-training-plan-by-week/:week', authUser, getTrainingPlanWeek)

export default router;