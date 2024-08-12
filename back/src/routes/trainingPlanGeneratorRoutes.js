import express from 'express';
import {authUser} from "../middlewares/authUser.js";
import {generateTraining} from "../controllers/training/trainingPlanController.js";

const router = express.Router();

router.post('/generate-plan', authUser, generateTraining)
router.get('/get-all-training-plans', authUser, generateTraining)
router.get('/get-example-training-plan/:trainingHash', generateTraining)
router.post('/add-training-plan', authUser, generateTraining)
router.delete('/delete-training-plan', authUser, generateTraining)
router.get('/get-training-plan-by-week/:week', authUser, generateTraining)

export default router;