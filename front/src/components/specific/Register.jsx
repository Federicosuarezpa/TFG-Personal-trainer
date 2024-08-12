import '../../styles/RegisterModal.css';
import PropTypes from "prop-types";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../shared/hooks/UseAuth.jsx";

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    if (!isVisible) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const lastname = event.target.lastname.value;
        const password = event.target.password.value;
        const confirm = event.target.confirmpassword.value;
        const age = event.target.age.value;
        const address = event.target.address.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;

        try {
            if (password !== confirm) {
                setError('Passwords do not match.');
                return;
            }
            const response = await signUp(email, password, age, username, address, phone, lastname);
            if (!response || response.error) {
                setError(response.error || 'Error creating account.');
            } else {
                console.log('Register successful:', { email, response });
                onClose();
                navigate(`/profile`);
            }
        } catch (error) {
            console.error('Register failed:', error);
            setError('Incorrect username or password.');
        }
    };
    const clearError = () => {
        setError(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Register</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><strong>Name</strong></label>
                    <input type="text" id="username" name="username" placeholder='Name' required/>
                    <label htmlFor="lastname"><strong>Lastname</strong></label>
                    <input type="text" id="lastname" name="lastname" placeholder='Lastname' required/>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" id="password" name="password" placeholder='Password' required/>
                    <label htmlFor="confirmpassword"><strong>Confirm password</strong></label>
                    <input type="password" id="confirmpassword" name="confirmpassword" placeholder='Confirm password'
                           required/>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" id="email" name="email" placeholder='Email' required/>
                    <label htmlFor="age"><strong>Age</strong></label>
                    <input type="number" min='1' max='100' id="age" name="age" placeholder='Age' required/>
                    <label htmlFor="address"><strong>Address</strong></label>
                    <input type="text" id="address" name="address" placeholder='Address' required/>
                    <label htmlFor="phone"><strong>Phone</strong></label>
                    <input type="text" id="phone" name="phone" placeholder='Phone' required/>
                    <button type="submit" className="register-button">Register</button>
                    {error && (
                        <div className="error-message" onClick={clearError}>
                            {error}
                        </div>
                    )}
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
