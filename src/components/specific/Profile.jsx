import '../../styles/Profile.css';
import useAuth from '../../shared/hooks/UseAuth.jsx';
import { useEffect, useState } from "react";
import { getUserData, updateProfile } from "../../http/ApiConnection.js";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate(); // Inicializa useHistory
    const { userData: userId, signOut } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData(userId.id).then((data) => {
            setUserData(data ? data["userInfo"] : {});
        });
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const phone = event.target.phone.value;
        const address = event.target.address.value;
        const age = event.target.age.value;
        const gender = event.target.gender.value;

        if (gender === '') {
            setError('Please select gender');
            return;
        }

        if (!phone || !age || !address) {
            setError('All fields are required');
            return;
        }

        try {
            await updateProfile( age, phone, address, gender);
            setSuccess('Profile updated');
            clearError();
        } catch (error) {
            setError('Error updating profile');
        }
    };

    const logout = () => {
        try {
            signOut();
            navigate(`/`);
        }catch (error) {
            setError('Error logging out');
        }

    }

    const clearError = () => {
        setError(null);
    };
    const clearSuccess = () => {
        setError(null);
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-header-left">
                        <div className="profile-pic">
                            <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile'/>
                        </div>
                    </div>
                    <div className="profile-header-right">
                        <div className="profile-title">Profile</div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-sidebar">
                        <ul>
                            <li className='selected-option'>Personal data</li>
                            <li><a href={`/health-data/`}>Health data</a></li>
                            <li>Diet plan</li>
                            <li>Training routine</li>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name"><strong>Name:</strong></label>
                                <input type="text" id="name" name="name" disabled={true} defaultValue={userData?.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname"><strong>Last Name:</strong></label>
                                <input type="text" id="lastname" name="lastname" disabled={true}
                                       defaultValue={userData?.lastname}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><strong>Email:</strong></label>
                                <input type="email" id="email" name="email" disabled={true}
                                       defaultValue={userData?.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><strong>Phone:</strong></label>
                                <input type="tel" id="phone" name="phone" defaultValue={userData?.phone}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address"><strong>Address:</strong></label>
                                <input type="text" id="address" name="address" defaultValue={userData?.address}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age"><strong>Age:</strong></label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    min="0"
                                    max="100"
                                    defaultValue={userData?.age}
                                    className="input-login"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender"><strong>Gender:</strong></label>
                                <select id="gender" name="gender" value={userData?.gender || ''}
                                        onChange={(e) => setUserData({...userData, gender: e.target.value})}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <button type="submit" className="update-button">Update</button>
                        </form>
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="success-message" onClick={clearSuccess}>
                                {success}
                            </div>
                        )}
                        <div className="extra-options">
                            <p className="forgot-password">Delete account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
