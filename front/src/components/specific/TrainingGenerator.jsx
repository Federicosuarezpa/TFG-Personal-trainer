import { useState, useEffect } from 'react';
import '../../styles/Profile.css';
import {
    addDiet, addTrainingPlan,
    deleteDietPlan, deleteTrainingPlan,
    generateNewDiet,
    generateNewTrainingPlan,
    getAllDietPlans, getAllTrainingPlans
} from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";
import ProgressBar from './ProgressBar.jsx';

const TrainingGenerator = () => {
    const [trainingPlan, setTrainingPlan] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [lastWeek, setLastWeek] = useState(1);
    const [dietPlan, setDietPlan] = useState([]);

    useEffect(() => {
        getAllTrainingPlans().then((data) => {
            setTrainingPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
            console.log(data);
        });
    }, []);

    const clearError = () => {
        setError(null);
    }

    const handleGenerateTrainingPlan = async (e) => {
        e.preventDefault();

        setLoading(true);
        setComplete(false);

        try {
            const response = await generateNewTrainingPlan();
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
            getAllTrainingPlans().then((data) => {
                setTrainingPlan(data ? data['info'] : []);
                setLastWeek(data ? data['weekNumber'] : 1);
            });
        }

    };

    const handleDeleteTrainingPlan = async (trainingPlanHash) => {
        await deleteTrainingPlan(trainingPlanHash);
        getAllTrainingPlans().then((data) => {
            setTrainingPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
        });
    }

    const handleAddToTrainingPlans = async (trainingPlanHash) => {
        await addTrainingPlan(trainingPlanHash);
        getAllTrainingPlans().then((data) => {
            setTrainingPlan(data ? data['info'] : []);
            setLastWeek(data ? data['weekNumber'] : 1);
        });
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <ProfileHeader title={'Training generator'} />
                <div className="profile-body">
                    <ProfileSidebar activeItem='week-plan' />
                    <div className="profile-content">
                        <form onSubmit={handleGenerateTrainingPlan}>
                            <button type="submit" className={`update-button ${loading ? 'generating' : ''}`} disabled={loading}>
                                {loading ? 'Generating...' : 'Generate training plan based on your last health report'}
                            </button>
                        </form>
                        <ProgressBar loading={loading} complete={complete} />
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
                            </div>
                        )}
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
                                            <div className="info-footer">
                                                <button className="edit-button" onClick={() => handleAddToTrainingPlans(dayPlan.trainingPlanHash)}>Add to your diets for week {lastWeek}</button>
                                            </div>
                                            <div className="info-footer">
                                                <button className="delete-button" onClick={() => handleDeleteTrainingPlan(dayPlan.trainingPlanHash)}>Delete</button>
                                            </div>
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

export default TrainingGenerator;