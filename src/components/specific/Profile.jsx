import '../../styles/Profile.css';
import useAuth from '../../shared/hooks/UseAuth.jsx';

const Profile = () => {
    const { userData } = useAuth();

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
                        <form>
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
                                    value={userData?.age}
                                    className="input-login"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender"><strong>Gender:</strong></label>
                                <input type="text" id="gender" name="gender" placeholder='Gender'/>
                            </div>
                            <button type="submit" className="update-button">Update</button>
                            <div className="extra-options">
                                <p className="forgot-password">Delete account</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
