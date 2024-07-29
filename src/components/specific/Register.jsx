import '../../styles/RegisterModal.css';
import PropTypes from "prop-types";

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const email = event.target.email.value;

        try {
            console.log('Register successful:', { username, email });
        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Register</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" id="username" name="username" placeholder='Username' required />
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" id="password" name="password" placeholder='Password' required />
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" id="email" name="email" placeholder='Email' required />
                    <button type="submit" className="register-button">Register</button>
                </form>
                <div className="extra-options">
                    <p className="create-account" onClick={onSwitchToLogin}>Do you already have an account? Log in</p>
                </div>
            </div>
        </div>
    );
};

RegisterModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSwitchToLogin: PropTypes.func.isRequired,
};

export default RegisterModal;
