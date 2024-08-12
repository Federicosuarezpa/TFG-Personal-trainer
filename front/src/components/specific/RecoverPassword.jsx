import { useState } from 'react';
import '../../styles/LoginModal.css';
import PropTypes from "prop-types";
import {recoverPassword} from "../../http/ApiConnection.js";

const RecoverPassword = ({ isVisible, onClose, onSwitchToRegenerate, onSwitchToLogin }) => {
    const [error, setError] = useState(null);

    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;

        try {
            const response = await recoverPassword(email);
            if(!response || response.error) {
                setError(response.error || 'Error recovering password.');
                return;
            }
            onSwitchToRegenerate();
        } catch (error) {
            setError('An error has ocurred.');
        }
    };



    const clearError = () => {
        setError(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Token generator</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input className="email" type="email" id="email" name="email" placeholder='Email' required/>
                    <button type="submit" className="login-button">Send new token</button>
                </form>
                {error && (
                    <div className="error-message" onClick={clearError}>
                        {error}
                    </div>
                )}
                <div className="extra-options">
                    <p className="create-account" onClick={onSwitchToLogin}>Log in</p>
                    <p className="forgot-password" onClick={onSwitchToRegenerate}>I already have token</p>
                </div>
            </div>
        </div>
    );
};

RecoverPassword.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSwitchToRegenerate: PropTypes.func.isRequired,
    onSwitchToLogin: PropTypes.func.isRequired,
};

export default RecoverPassword;
