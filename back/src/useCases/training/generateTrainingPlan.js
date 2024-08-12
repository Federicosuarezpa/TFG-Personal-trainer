// Estructura de datos para almacenar los mensajes
import {chatWithAI} from "../../services/apiServer.js";

const workoutPlans = {
    1: {
        default: `Create a training plan for {day} with 1 hour of exercises for each muscle group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    2: {
        default: `Create a training plan for {day} with 1 hour of exercises for each muscle group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    3: {
        default: `Create a training plan for {day} with 1 hour of exercises for each muscle group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    4: {
        monday: `Create a training plan for monday with 1 hour of exercises for chest and biceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        tuesday: `Create a training plan for tuesday with 1 hour of exercises for back and triceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        thursday: `Create a training plan for thursday with 1 hour of exercises for legs and abs groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        friday: `Create a training plan for friday with 1 hour of exercises for shoulders and cardio groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    5: {
        monday: `Create a training plan for monday with 1 hour of exercises for chest and biceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        tuesday: `Create a training plan for tuesday with 1 hour of exercises for back and triceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        wednesday: `Create a training plan for wednesday with 1 hour of exercises for cardio group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        thursday: `Create a training plan for thursday with 1 hour of exercises for legs and abs groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        friday: `Create a training plan for friday with 1 hour of exercises for shoulders and cardio groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    6: {
        monday: `Create a training plan for monday with 1 hour of exercises for chest and biceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        tuesday: `Create a training plan for tuesday with 1 hour of exercises for back and triceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        wednesday: `Create a training plan for wednesday with 1 hour of exercises for cardio group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        thursday: `Create a training plan for thursday with 1 hour of exercises for legs and abs groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        friday: `Create a training plan for friday with 1 hour of exercises for shoulders and cardio groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        saturday: `Create a training plan for saturday with 1 hour of exercises for arms group with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    },
    7: {
        monday: `Create a training plan for monday with 1 hour of exercises for chest and biceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        tuesday: `Create a training plan for tuesday with 1 hour of exercises for back and triceps groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        wednesday: `Create a training plan for wednesday with 1 hour of exercises for each muscle group except legs with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        thursday: `Create a training plan for thursday with 1 hour of exercises for legs and abs groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        friday: `Create a training plan for friday with 1 hour of exercises for shoulders and cardio groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        saturday: `Create a training plan for saturday with 1 hour of exercises for arms groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`,
        sunday: `Create a training plan for sunday with 1 hour of exercises for cardio groups with gym exercises and present the response in JSON format without any additional characters or line breaks, following this format: {"mondayWorkoutPlan":{"exercises":[{"name":"exercise name","sets":number,"reps":number,"weight":"weight type"},{"..."]}}`
    }
};

function generateMessage(day, frequency) {
    const plan = workoutPlans[frequency] || workoutPlans[1];
    const message = plan[day] || plan.default;

    return message.replace(/{day}/g, day);
}

function combineResponses(responses) {
    const combined = {};
    let day = 1;
    for (const response of responses) {
        try {
            const content = JSON.parse(response.data.choices[0].message.content);

            const dayPlanKey = Object.keys(content)[0];
            combined[`Day ${day}`] = content[dayPlanKey];
            day++;
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }

    return combined;
}

async function generateTrainingPlan(frequency) {
    try {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const effectiveFrequency = Math.min(frequency, days.length);

        const requests = days.slice(0, effectiveFrequency).map(day => {
            return makeRequestChat(generateMessage(day, frequency));
        });

        const responses = await Promise.all(requests);

        return combineResponses(responses);
    } catch (error) {
        return null;
    }
}

async function makeRequestChat(message, tries = 3) {
    try {
        if (tries === 0) {
            return null;
        }
        return await chatWithAI(message);
    } catch (error) {
        if (tries === 0) {
            console.error('Error making request:', error);
            return null;
        }
        return makeRequestChat(message, tries - 1);
    }
}

export {generateTrainingPlan};
