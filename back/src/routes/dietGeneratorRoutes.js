import express from 'express';
import {
    generateDiet, getAllPlans,
    getDiet, removeDietPlan, updateDietPlan, getDietExample
} from '../controllers/diet/dietController.js';
import {authUser} from "../middlewares/authUser.js";

const router = express.Router();

router.post('/generate-diet', authUser, generateDiet)
router.get('/get-diet/:mealPlanHash', getDiet)
router.get('/get-all-diet-plans', authUser, getAllPlans)
router.delete('/delete-diet-plan/:mealPlanHash', authUser, removeDietPlan)
router.post('/add-diet/:mealPlanHash', authUser, updateDietPlan)
router.get('/get-example-diet', getDietExample)

export default router;