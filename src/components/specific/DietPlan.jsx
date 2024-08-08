import '../../styles/Profile.css';
import {useEffect, useState} from "react";
import {createHealthData, getAllDietPlans, getUserHealthData, removeWeekData} from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";

const DietPlan = () => {
    const [dietPlan, setDietPlan] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllDietPlans().then((data) => {
            setDietPlan(data ? data['info'] : []);
        });
    }, []);



    const clearError = () => {
        setError(null);
    }

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
                <ProfileHeader title={'Diet plan'}/>
                <div className="profile-body">
                    <ProfileSidebar activeItem='diet-plan'/>
                    <div className="profile-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="height"><strong>Allergies:</strong></label>
                                <input type="text" id="height" name="height"
                                       placeholder='Ex. Lactose, gluten, nuts...'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><strong>Food preferences:</strong></label>
                                <input type="text" id="weight" name="weight"
                                       placeholder='Ex. Vegetarian, vegan, keto, paleo...'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyfat"><strong>Food that you don't like:</strong></label>
                                <input type="text" id="bodyfat" name="bodyfat"
                                       placeholder='Ex. Fish, chicken, salmon...'/>
                            </div>
                            <button type="submit" className="update-button">Generate diet plan based in your last health report</button>
                        </form>
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
                            </div>
                        )}
                        { dietPlan.length > 0 &&
                        <div className="day-info">
                            <div>
                                {Object.entries(dietPlan[0].mealPlanJsonFormat).map(([day, meals]) => (
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
                                                <div className="day-text">{meals.Daily_Total} kcal</div>
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
                                <button className="delete-button" onClick={() => removeWeek(week.week)}>Delete</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietPlan;
