import {useEffect, useState} from 'react';
import '../../styles/LoginModal.css';
import PropTypes from "prop-types";
import UseAuth from "../../shared/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { getUserHealthDataByWeek, updateWeekData } from "../../http/ApiConnection.js";

const EditHealthData = ({ isVisible, onClose, week }) => {
    const [error, setError] = useState(null);
    const [healthData, setHealthData] = useState(null);

    useEffect(() => {
        getUserHealthDataByWeek(week).then((response) => {
            if (!response || response.error) {
                setError(response.error || 'Error getting health data.');
            }
            setHealthData(response['formattedData']);
        });
    }, [week]);

    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const height = event.target.height.value;
        const weight = event.target.weight.value;
        const bodyfat = event.target.bodyfat.value;
        const muscle = event.target.muscle.value;
        const objective = event.target.objective.value;
        const exercisefrequency = event.target.exercisefrequency.value;

        if (!height || !weight || !exercisefrequency || !objective) {
            setError('Height, weight, exercise frequency and objective are required');
            return;
        }
        try {
            const response = await updateWeekData(weight, height, muscle, bodyfat, objective, exercisefrequency, fileUpload);
            if (!response || response.error) {
                setError(response.error || 'Error updating health data.');
                return;
            }
            onClose();
            clearError();
        } catch (error) {
            setError('Some error has occurred.');
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Week {week}</h2>
                <button className="close-button" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="height"><strong>Height:</strong></label>
                        <input type="text" id="height" name="height"
                               defaultValue={healthData && healthData.height ? healthData.height : null}
                               placeholder='Height in meters: 1.75 for example'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight"><strong>Weight:</strong></label>
                        <input type="text" id="weight" name="weight"
                               defaultValue={healthData && healthData.weight ? healthData.weight : null}
                               placeholder='Weight in kg: 70.3 for example'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bodyfat"><strong>Body fat percentage:</strong></label>
                        <input type="text" id="bodyfat" name="bodyfat"
                               defaultValue={healthData && healthData.bodyfat ? healthData.bodyfat : null}
                               placeholder='Body fat percentage if you know it, for example 20'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="muscle"><strong>Muscle percentage:</strong></label>
                        <input type="text" id="muscle" name="muscle"
                               defaultValue={healthData && healthData.muscle ? healthData.muscle : null}
                               placeholder='Muscle percentage if you know it, for example 15'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exercisefrequency"><strong>Exercise frequency:</strong></label>
                        <input type="text" id="exercisefrequency" name="exercisefrequency"
                               defaultValue={healthData && healthData.exerciseFrequency ? healthData.exerciseFrequency : null}
                               placeholder='Exercise frequency, for example 3 times a week, just the number'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender"><strong>Objective:</strong></label>
                        <select id="objective" name="objective">
                            <option selected={healthData && healthData.objective === 'maintainWeight'} value="maintainWeight">Maintain weight</option>
                            <option selected={healthData && healthData.objective === 'loseWeight'} value="loseWeight">Lose weight</option>
                            <option selected={healthData && healthData.objective === 'gainMuscle'} value="gainMuscle">Gain muscle</option>
                        </select>
                    </div>
                    <button type="submit" className="update-button">Update data for week {week}</button>
                </form>
                {error && (
                    <div className="error-message" onClick={clearError}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

EditHealthData.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    week: PropTypes.number.isRequired,
};

export default EditHealthData;
