// src/pages/DietPlan.js
import { useState, useEffect } from 'react';
import '../../styles/Profile.css';
import {addDiet, deleteDietPlan, generateNewDiet, getAllDietPlans} from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";
import ProgressBar from './ProgressBar.jsx';

const DietPlan = () => {
    const [dietPlan, setDietPlan] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [lastWeek, setLastWeek] = useState(1);

    useEffect(() => {
        getAllDietPlans().then((data) => {
            setDietPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
        });
    }, []);

    const clearError = () => {
        setError(null);
    }

    const handleGenerateDietPlan = async (e) => {
        e.preventDefault();

        setLoading(true);
        setComplete(false);
        const allergies = e.target.allergies.value;
        const foodLike = e.target.foodLike.value;
        const foodDislike = e.target.foodDislike.value;

        try {
            const response = await generateNewDiet(allergies, foodLike, foodDislike);
            if (!response) {
                throw new Error('Failed to generate diet plan.');
            }
            if (response.error) {
                throw new Error(response.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setComplete(true);
            setLoading(false);
            getAllDietPlans().then((data) => {
                setDietPlan(data ? data['info'] : []);
            });
        }

    };

    const handleDeleteDietPlan = async (dietPlanHash) => {
        await deleteDietPlan(dietPlanHash);
        getAllDietPlans().then((data) => {
            setDietPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
        });
    }

    const handleAddToDiets = async (dietPlanHash) => {
        await addDiet(dietPlanHash);
        getAllDietPlans().then((data) => {
            setDietPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
        });
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <ProfileHeader title={'Diet generator'} />
                <div className="profile-body">
                    <ProfileSidebar activeItem='diet-plan' />
                    <div className="profile-content">
                        <form onSubmit={handleGenerateDietPlan}>
                            <div className="form-group">
                                <label htmlFor="allergies"><strong>Allergies:</strong></label>
                                <input type="text" id="allergies" name="allergies" placeholder='Ex. Lactose, gluten, nuts...' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="foodLike"><strong>Food preferences:</strong></label>
                                <input type="text" id="foodLike" name="foodLike" placeholder='Ex. Vegetarian, vegan, keto, paleo...' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="foodDislike"><strong>Food that you do not like:</strong></label>
                                <input type="text" id="foodDislike" name="foodDislike" placeholder='Ex. Fish, chicken, salmon...' />
                            </div>
                            <button type="submit" className={`update-button ${loading ? 'generating' : ''}`} disabled={loading}>
                                {loading ? 'Generating...' : 'Generate diet plan based on your last health report'}
                            </button>
                        </form>
                        <ProgressBar loading={loading} complete={complete} />
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
                            </div>
                        )}
                        {dietPlan.length > 0 && (
                            <div className="week-info">
                                {dietPlan.map((dayPlan, index) => (
                                    <div key={index} className="day-info">
                                        <div className="day-info-content">
                                            {/* Mostrar cada día en el dietPlan */}
                                            {Object.entries(dayPlan.mealPlanJsonFormat).map(([day, meals]) => (
                                                <div key={day} className="day-info">
                                                    <div className="day-title">{day}</div>
                                                    <div className="day-content">
                                                        {Object.entries(meals).map(([mealType, mealDetails]) => (
                                                            mealType !== 'Daily_Total' && !mealType.toLowerCase().includes('total') && (
                                                                <div key={mealType} className="day-item">
                                                                    <div className="day-label">{mealType.replace('_', ' ')}:</div>
                                                                    <div className="day-text">{mealDetails.meal}</div>
                                                                </div>
                                                            )
                                                        ))}
                                                        <div className="day-item">
                                                            <div className="day-label">Total Daily:</div>
                                                            <div className="day-text">{meals.totalCalories} kcal</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="info-footer">
                                            <button className="edit-button" onClick={() => handleAddToDiets(dayPlan.mealPlanHash)}>Add to your diets for week {lastWeek}</button>
                                        </div>
                                        <div className="info-footer">
                                            <button className="delete-button" onClick={() => handleDeleteDietPlan(dayPlan.mealPlanHash)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietPlan;