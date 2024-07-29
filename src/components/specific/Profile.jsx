import '../../styles/Profile.css';
const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-header-left">
                        <div className="profile-pic"></div>
                    </div>
                    <div className="profile-header-right">
                        <div className="profile-title">Profile</div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-sidebar">
                        <ul>
                            <li>Personal data</li>
                            <li>Diet plan</li>
                            <li>Training routine</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name"><strong>Name:</strong></label>
                                <input type="text" id="name" name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><strong>Email:</strong></label>
                                <input type="email" id="email" name="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><strong>Phone:</strong></label>
                                <input type="tel" id="phone" name="phone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address"><strong>Address:</strong></label>
                                <input type="text" id="address" name="address"/>
                            </div>
                            <button type="submit" className="update-button">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
