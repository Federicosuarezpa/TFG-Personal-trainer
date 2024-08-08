// src/pages/DietPlan.js
import { useState, useEffect } from 'react';
import '../../styles/Profile.css';
import { getAllDietPlans, removeWeekData } from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";
import ProgressBar from './ProgressBar.jsx';

const DietPlan = () => {
    const [dietPlan, setDietPlan] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        getAllDietPlans().then((data) => {
            setDietPlan(data ? data['info'] : []);
        });
    }, []);

    const clearError = () => {
        setError(null);
    }

    const handleGenerateDietPlan = async (e) => {
        e.preventDefault();

        setLoading(true);
        setComplete(false);

        try {
            await new Promise((resolve) => setTimeout(resolve, 25000));

        } catch (err) {
            setError('Failed to generate diet plan.');
        } finally {
            setComplete(true);
            setLoading(false);
        }

    };

    const removeWeek = async (weekId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this week\'s data?');

        if (isConfirmed) {
            await removeWeekData(weekId);
            await updateHealthData();
        } else {
            console.log('Deletion canceled');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <ProfileHeader title={'Diet plan'} />
                <div className="profile-body">
                    <ProfileSidebar activeItem='diet-plan' />
                    <div className="profile-content">
                        <form onSubmit={handleGenerateDietPlan}>
                            <div className="form-group">
                                <label htmlFor="height"><strong>Allergies:</strong></label>
                                <input type="text" id="height" name="height" placeholder='Ex. Lactose, gluten, nuts...' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><strong>Food preferences:</strong></label>
                                <input type="text" id="weight" name="weight" placeholder='Ex. Vegetarian, vegan, keto, paleo...' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyfat"><strong>Food that you don't like:</strong></label>
                                <input type="text" id="bodyfat" name="bodyfat" placeholder='Ex. Fish, chicken, salmon...' />
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
                                                            mealType !== 'Daily_Total' && (
                                                                <div key={mealType} className="day-item">
                                                                    <div className="day-label">{mealType.replace('_', ' ')}:</div>
                                                                    <div className="day-text">{mealDetails.meal}</div>
                                                                </div>
                                                            )
                                                        ))}
                                                        <div className="day-item">
                                                            <div className="day-label">Total Daily:</div>
                                                            <div className="day-text">{meals.total_daily_calories} kcal</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="info-footer">
                                            <button className="edit-button">Regenerate</button>
                                        </div>
                                        <div className="info-footer">
                                            <button className="edit-button">Add to your diets</button>
                                        </div>
                                        <div className="info-footer">
                                            <button className="delete-button" onClick={() => removeWeek(dayPlan.day)}>Delete</button>
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