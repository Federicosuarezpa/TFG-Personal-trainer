import '../../styles/Profile.css';
import useAuth from '../../shared/hooks/UseAuth.jsx';
import {useState} from "react";

const Profile = () => {
    const { userData } = useAuth();
    const [error, setError] = useState(null); // Estado para el mensaje de error
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const phone = event.target.phone.value;
        const address = event.target.address.value;
        const age = event.target.age.value;
        const gender = event.target.gender.value;
        console.log(gender)
        if (gender === '') {
            setError('Please select gender');
            return;
        }

        if (!phone || !age || !address) {
            setError('All fields are required');
            return;
        }

        try {

        } catch (error) {
            setError('Incorrect username or password.'); // Establece el mensaje de error
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-header-left">
                        <div className="profile-pic">
                            <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'
                                 alt='Profile'/>
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
                            <li><a href={`/health-data/${userData?.id}`}>Health data </a></li>
                            <li>Diet plan</li>
                            <li>Training routine</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name"><strong>Name:</strong></label>
                                <input type="text" id="name" name="name" disabled={true} defaultValue={userData?.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname"><strong>Name:</strong></label>
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
                                <select id="gender" name="gender">
                                    <option value="">Select Gender</option>
                                    <option value="male" selected={male}>Male</option>
                                    <option value="female" selected={female}>Female</option>
                                </select>
                            </div>
                            <button type="submit" className="update-button">Update</button>
                        </form>
                        {error && (
                            <div className="error-message" onClick={clearError}>
                                {error}
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
