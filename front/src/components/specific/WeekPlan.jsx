import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Profile.css';
import {
    getDietPlanByWeek, getTrainingPlanByWeek
} from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";
import ProgressBar from './ProgressBar.jsx';

const WeekPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainingPlan, setTrainingPlan] = useState([]);
    const [dietPlan, setDietPlan] = useState([]);

    useEffect(() => {
        getTrainingPlanByWeek(id).then((data) => {
            setTrainingPlan(data ? data['info'] : []);
        });
        getDietPlanByWeek(id).then((data) => {
            setDietPlan(data ? data['info'] : []);
        });
    }, [id]);

    const handlePreviousWeek = () => {
        navigate(`/week-plan/${parseInt(id) - 1}`);
    };

    const handleNextWeek = () => {
        navigate(`/week-plan/${parseInt(id) + 1}`);
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <ProfileHeader title={`Week plan week: ${id}`} />
                <div className="profile-body">
                    <ProfileSidebar activeItem='week-plan' />
                    <div className="profile-content">
                        {trainingPlan.length > 0 && (
                            <div className="week-info">
                                {trainingPlan.map((dayPlan, index) => (
                                    <div key={index} className="day-info">
                                        <div className="day-info-content">
                                            {/* Mostrar cada día en el dietPlan */}
                                            {Object.entries(dayPlan.trainingPlanJsonFormat).map(([day, details]) => (
                                                <div key={day} className="day-info">
                                                    <div className="day-title">{day}</div>
                                                    <div className="day-content">
                                                        {details.exercises.map((exercise, index) => (
                                                            <div key={index} className="exercise-item">
                                                                <div className="exercise-name"><strong>{exercise.name}</strong></div>
                                                                <div className="exercise-details">
                                                                    <div className="exercise-sets">Sets: {exercise.sets}</div>
                                                                    <div className="exercise-reps">Reps: {exercise.reps}</div>
                                                                    <div className="exercise-weight">Weight: {exercise.weight}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
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
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="week-navigation">
                            <button onClick={handlePreviousWeek} className="nav-button">Previous Week</button>
                            <div className="week-number">Week {id}</div>
                            <button onClick={handleNextWeek} className="nav-button">Next Week</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekPlan;