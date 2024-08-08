import '../../styles/Profile.css';
import {useEffect, useState} from "react";
import {createHealthData, getUserHealthData, removeWeekData} from "../../http/ApiConnection.js";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";

const HealthData = () => {
    const [weekData, setWeekData] = useState([]);
    const [error, setError] = useState(null);
    const [lastWeek, setLastWeek] = useState(1);

    useEffect(() => {
        getUserHealthData().then((data) => {
            setWeekData(data ? data['formattedData'] : []);
            const lastWeekCreated = data ? data['formattedData'][data['formattedData'].length] : 1;
            setLastWeek(lastWeekCreated);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const height = event.target.height.value;
        const weight = event.target.weight.value;
        const bodyfat = event.target.bodyfat.value;
        const muscle = event.target.muscle.value;
        const objective = event.target.objective.value;
        const exercisefrequency = event.target.exercisefrequency.value;
        const fileUpload = event.target.fileUpload.files[0];

        if (!height || !weight || !exercisefrequency || !objective) {
            setError('Height, weight, exercise frequency and objective are required');
            return;
        }
        try {
            await createHealthData(weight, height, muscle, bodyfat, objective, exercisefrequency, fileUpload);
            await updateHealthData();
            clearError();
        } catch (error) {
            setError('Error creating health data');
        }
    };

    const updateHealthData = async () => {
        getUserHealthData().then((data) => {
            setWeekData(data ? data['formattedData'] : []);
        });
    }

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
                <ProfileHeader title={'Health data'}/>
                <div className="profile-body">
                    <ProfileSidebar activeItem='health-data'/>
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="height"><strong>Height:</strong></label>
                                <input type="text" id="height" name="height"
                                       placeholder='Height in meters: 1.75 for example'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><strong>Weight:</strong></label>
                                <input type="text" id="weight" name="weight"
                                       placeholder='Weight in kg: 70.3 for example'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyfat"><strong>Body fat percentage:</strong></label>
                                <input type="text" id="bodyfat" name="bodyfat"
                                       placeholder='Body fat percentage if you know it, for example 20'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="muscle"><strong>Muscle percentage:</strong></label>
                                <input type="text" id="muscle" name="muscle"
                                       placeholder='Muscle percentage if you know it, for example 15'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exercisefrequency"><strong>Exercise frequency:</strong></label>
                                <input type="text" id="exercisefrequency" name="exercisefrequency"
                                       placeholder='Exercise frequency, for example 3 times a week, just the number'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender"><strong>Objective:</strong></label>
                                <select id="objective" name="objective">
                                    <option value="maintainWeight">Maintain weight</option>
                                    <option value="loseWeight">Lose weight</option>
                                    <option value="gainMuscle">Gain muscle</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fileUpload"><strong>Upload image of your body
                                    (optional):</strong></label>
                                <input type="file" id="fileUpload" name="fileUpload"/>
                            </div>
                            <button type="submit" className="update-button">Create data for
                                week {lastWeek}</button>
                        </form>
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
                            </div>
                        )}

                        {/* Nueva sección para la información */}
                        <div className="info-grid">
                            {weekData.map((week) => (
                                <div key={week.week} className="info-box">
                                    <div className="info-title">Week {week.week}</div>
                                    <div className="info-content">
                                        <div className="info-item">
                                            <div className="info-label">Weight:</div>
                                            <div className="info-text">{week.weight}Kg</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Height:</div>
                                            <div className="info-text">{week.height}m</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Muscle:</div>
                                            <div className="info-text">{week.muscle}%</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Body fat:</div>
                                            <div className="info-text">{week.bodyFat}%</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Exercise frequency:</div>
                                            <div className="info-text">{week.exerciseFrequency} times per week</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Objective:</div>
                                            <div className="info-text">{week.objective}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">Average calories burnt:</div>
                                            <div className="info-text">{week.averageCaloriesBurnt}</div>
                                        </div>
                                    </div>
                                    <div className="info-footer">
                                        <button className="edit-button">Edit</button>
                                    </div>
                                    <div className="info-footer">
                                        <button className="delete-button" onClick={() => removeWeek(week.week)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthData;
