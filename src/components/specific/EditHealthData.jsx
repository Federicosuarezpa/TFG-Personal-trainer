import { useState, useEffect } from 'react';
import '../../styles/LoginModal.css';
import PropTypes from "prop-types";

const EditHealthData = ({ isVisible, onClose, data, onSave }) => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        muscle: '',
        bodyfat: '',
        objective: '',
        exercisefrequency: '',
        fileUpload: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            setFormData({
                weight: data.weight || '',
                height: data.height || '',
                muscle: data.muscle || '',
                bodyfat: data.bodyFat || '',
                objective: data.objective || '',
                exercisefrequency: data.exerciseFrequency || '',
                fileUpload: null
            });
        }
    }, [data]);

    if (!isVisible) return null;

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { weight, height, muscle, bodyfat, objective, exercisefrequency, fileUpload } = formData;

        if (!weight || !height || !exercisefrequency || !objective) {
            setError('Weight, height, exercise frequency and objective are required');
            return;
        }

        try {
            await onSave({ weight, height, muscle, bodyfat, objective, exercisefrequency, fileUpload });
            onClose();
        } catch (error) {
            setError('Error saving health data');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Health Data</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height:</label>
                        <input type="text" id="height" name="height" value={formData.height} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bodyfat">Body fat percentage:</label>
                        <input type="text" id="bodyfat" name="bodyfat" value={formData.bodyfat} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="muscle">Muscle percentage:</label>
                        <input type="text" id="muscle" name="muscle" value={formData.muscle} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exercisefrequency">Exercise frequency:</label>
                        <input type="text" id="exercisefrequency" name="exercisefrequency" value={formData.exercisefrequency} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="objective">Objective:</label>
                        <select id="objective" name="objective" value={formData.objective} onChange={handleInputChange}>
                            <option value="maintainWeight">Maintain weight</option>
                            <option value="loseWeight">Lose weight</option>
                            <option value="gainMuscle">Gain muscle</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fileUpload">Upload image (optional):</label>
                        <input type="file" id="fileUpload" name="fileUpload" onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="save-button">Save</button>
                </form>
                {error && (
                    <div className="error-message">
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
    data: PropTypes.object,
    onSave: PropTypes.func.isRequired
};

export default EditHealthData;
