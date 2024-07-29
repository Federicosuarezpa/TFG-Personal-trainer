import '../../LoginModal.css';
import PropTypes from "prop-types";
import UseAuth from "../../shared/hooks/UseAuth";

const LoginModal = ({isVisible, onClose, onSwitchToRegister}) => {
    if (!isVisible) {
        return null;
    }
    const {signIn} = UseAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('holasdasd')
        const email = event.target.username.value;
        const password = event.target.password.value;

        try {
            const token = await login(email, password);
            console.log('Login successful, token:', token)
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Log in</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" id="username" name="username" placeholder='Username' required/>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" id="password" name="password" placeholder='Password' required/>
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <div className="extra-options">
                    <p className="create-account" onClick={onSwitchToRegister}>Create new account</p>
                    <p className="forgot-password">Can't log in?</p>
                </div>
            </div>
        </div>
    );
};

LoginModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSwitchToRegister: PropTypes.func.isRequired,
};

export default LoginModal;
