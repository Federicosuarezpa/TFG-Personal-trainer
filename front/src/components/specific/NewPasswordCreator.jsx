import { useState } from 'react';
import '../../styles/LoginModal.css';
import PropTypes from "prop-types";
import UseAuth from "../../shared/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import {changePassword} from "../../http/ApiConnection.js";

const NewPasswordCreator = ({ isVisible, onClose, onSwitchToLogin, onSwitchToReminder }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { signIn } = UseAuth();

    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = event.target.token.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await changePassword(token, password);
            if(!response || response.error) {
                setError(response.error || 'Error logging in.');
                return;
            }
            onClose();
            onSwitchToLogin();
        } catch (error) {
            setError('Something went wrong.');
        }
    };



    const clearError = () => {
        setError(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Generate new password</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token"><strong>Token</strong></label>
                    <input className="input-login" type="text" id="token" name="token" placeholder='Token'
                           required/>
                    <label htmlFor="password"><strong>New password</strong></label>
                    <input className="password" type="password" id="password" name="password" placeholder='Password'
                           required/>
                    <label htmlFor="confirmPassword"><strong>Confirm password</strong></label>
                    <input className="password" type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password'
                           required/>
                    <button type="submit" className="login-button">Create new password</button>

                </form>
                {error && (
                    <div className="error-message" onClick={clearError}>
                        {error}
                    </div>
                )}
                <div className="extra-options">
                    <p className="create-account" onClick={onSwitchToLogin}>Log in</p>
                    <p className="forgot-password" onClick={onSwitchToReminder}>Go to generate new token</p>
                </div>
            </div>
        </div>
    );
};

NewPasswordCreator.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSwitchToLogin: PropTypes.func.isRequired,
    onSwitchToReminder: PropTypes.func.isRequired,
};

export default NewPasswordCreator;
