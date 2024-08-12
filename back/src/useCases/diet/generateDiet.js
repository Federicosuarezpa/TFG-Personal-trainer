import {chatWithAI} from "../../services/apiServer.js";

async function generateDietPlan(allergies, foodLike, foodDislike, averageCaloriesBurnt, objective, tries = 3) {
    if (tries === 0) {
        return null;
    }
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const rangeOfCalories = rangeCalories(objective, averageCaloriesBurnt);

    try {
        const response = await Promise.all(days.map(day => chatWithAI(generateMessage(day, allergies, foodDislike, foodLike, rangeOfCalories), day)));

        if (!response || response.length === 0) {
            return null;
        }

        const dietPlans = response.map(({day, data}) => {
            const content = data.choices[0].message.content;
            let mealPlan;
            try {
                mealPlan = JSON.parse(content.replace(/```json\n/g, '').replace(/```/g, ''));
            } catch (e) {
                throw new Error(`Failed to parse JSON for ${day}: ${e.message}`);
            }
            return {day, mealPlan};
        });

        const combinedMealPlans = combineMealPlans(dietPlans);

        if (!combinedMealPlans) {
            return generateDietPlan(allergies, foodLike, foodDislike, averageCaloriesBurnt, objective, tries - 1);
        }
        return combinedMealPlans;
    } catch (error) {
        if (tries === 0) {
            console.error('Error generating diet plan:', error);
            return null;
        }
        return generateDietPlan(allergies, foodLike, foodDislike, averageCaloriesBurnt, objective, tries - 1);
    }
}

const rangeCalories = (objective, averageCaloriesBurnt) => {
    if (objective === 'loseWeight') {
        return [averageCaloriesBurnt - 500, averageCaloriesBurnt - 300];
    }
    if (objective === 'gainMuscle') {
        return [averageCaloriesBurnt + 300, averageCaloriesBurnt + 500];
    }
    return [averageCaloriesBurnt - 200, averageCaloriesBurnt + 200];
}

const generateMessage = (day, allergies, foodDislike, foodLike, rangeOfCalories) => {
    let content = `Create a diet plan for ${day} with an intake of ${rangeOfCalories[0]}-${rangeOfCalories[1]} kcal, `;
    if (allergies) {
        content += `without ${allergies} because im allergic, `
    }
    if (foodLike) {
        content += `add some ${foodLike} because i like it, `
    }
    if (foodDislike) {
        content += `don't add ${foodDislike} because i can not eat it, `
    }
    return content + 'Present the response in JSON format without any additional characters or line breaks, so it can be easily parsed with Node.js. I need the amount of every meal, like two whatever, any amount of any food, 100gr of whatever, etc. Present the format in Json {\"${day}\":{\"Breakfast\":{\"meal\":\"food (150 kcal), food x grams (180 kcal), 2 slices of any food (200 kcal)\",\"total_calories\":530},\"Snack\":{\"meal\":\"food x slices (180 kcal)\",\"total_calories\":180},\"Lunch\":{\"meal\":\"food x grams (300 kcal), food x grams (130 kcal)\",\"total_calories\":430},\"evening_snack\":{\"meal\":\"food x grams (amount kcal)\",\"total_calories\":amount}}, \"Dinner\":{\"meal\":\"food x grams (amount kcal)\",\"total_calories\":amount} any other meal you need to add to get the right amount of calories, total_daily_calories}';
}

const combineMealPlans = (dietPlans) => {
    return dietPlans.reduce((acc, {day, mealPlan}) => {
        acc[day] = mealPlan[day];
        return acc;
    }, {});
};

export default generateDietPlan;