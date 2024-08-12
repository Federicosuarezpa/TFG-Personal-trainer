import { useState } from 'react';
import '../../styles/LoginModal.css';
import PropTypes from "prop-types";
import UseAuth from "../../shared/hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isVisible, onClose, onSwitchToRegister, onSwitchToReminder }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { signIn } = UseAuth();

    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.username.value;
        const password = event.target.password.value;

        try {
            const token = await signIn(email, password);
            if(!token || token.error) {
                setError(token.error || 'Error logging in.');
                return;
            }
            onClose();
            navigate(`/profile`);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Incorrect username or password.');
        }
    };



    const clearError = () => {
        setError(null); // Función para limpiar el mensaje de error
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Log in</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><strong>Email</strong></label>
                    <input className="input-login" type="text" id="username" name="username" placeholder='Username' required/>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input className="input-login" type="password" id="password" name="password" placeholder='Password' required/>
                    <button type="submit" className="login-button">Log in</button>
                </form>
                {error && (
                    <div className="error-message" onClick={clearError}>
                        {error}
                    </div>
                )}
                <div className="extra-options">
                    <p className="create-account" onClick={onSwitchToRegister}>Create new account</p>
                    <p className="forgot-password" onClick={onSwitchToReminder}>Can't log in?</p>
                </div>
            </div>
        </div>
    );
};

LoginModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSwitchToRegister: PropTypes.func.isRequired,
    onSwitchToReminder: PropTypes.func.isRequired,
};

export default LoginModal;
