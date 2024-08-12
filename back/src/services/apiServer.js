import axios from 'axios';
import dotenv from "dotenv";

/*URL localhost python endpoint*/
const { ENDPOINT_PYTHON, API_URL, API_KEY } = process.env;

dotenv.config({ path: '../.env' });


export const getCaloriesBurntByActivity = async (weight, height, age, gender) => {
    try {
        return await axios.post(`${API_URL}/predict`, {
            weight: Number(weight),
            height: Number(height) * 100,
            age: Number(age),
            gender: gender === 'male' ? 1 : 0,
            duration: 60,
        });
    } catch (error) {
        throw error;
    }
}

export const chatWithAI = async (message, day) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(generateRequestMessage(message))
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return { day, data };
    } catch (error) {
        console.error(`Error fetching plan for ${day}:`, error);
        return { day, error: error.message };
    }
}

const generateRequestMessage = (message) => {
    return {
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: message
            }
        ],
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        max_tokens: 3000,
        presence_penalty: 0,
        frequency_penalty: 0
    };
}