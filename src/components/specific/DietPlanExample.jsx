// src/pages/DietPlan.js
import { useState, useEffect } from 'react';
import '../../styles/Profile.css';
import {getDietExample} from "../../http/ApiConnection.js";

const DietPlanExample = () => {
    const [dietPlan, setDietPlan] = useState([]);

    useEffect(() => {
        getDietExample().then((data) => {
            setDietPlan(data ? data['info'] : []);
        });
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-body">
                    <div className="profile-content-example">
                        {dietPlan.length > 0 && (
                            <div className="week-info">
                                {dietPlan.map((dayPlan, index) => (
                                    <div key={index} className="day-info">
                                        <div className="day-info-content">
                                            {Object.entries(dayPlan.mealPlanJsonFormat).map(([day, meals]) => (
                                                <div key={day} className="day-info">
                                                    <div className="day-title">{day}</div>
                                                    <div className="day-content">
                                                        {Object.entries(meals).map(([mealType, mealDetails]) => (
                                                            mealType !== 'Daily_Total' && !mealType.toLowerCase().includes('total') && (
                                                                <div key={mealType} className="day-item">
                                                                    <div className="day-label">{mealType.replaceAll('_', ' ')}:</div>
                                                                    <div className="day-text">{mealDetails.meal}</div>
                                                                </div>
                                                            )
                                                        ))}
                                                        <div className="day-item">
                                                            <div className="day-label">Daily Calories:</div>
                                                            <div className="day-text">{meals.totalCalories} kcal</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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

export default DietPlanExample;