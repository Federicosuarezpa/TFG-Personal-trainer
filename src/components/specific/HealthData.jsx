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
                        <div className="profile-title">Health data input</div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-sidebar">
                        <ul>
                            <li><a href={`/profile/${userData?.id}`}>Personal data </a></li>
                            <li className='selected-option'>Health data</li>
                            <li>Diet plan</li>
                            <li>Training routine</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="height"><strong>Height:</strong></label>
                                <input type="text" id="height" name="height"
                                       placeholder='Height in meters: 1.75 for example'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><strong>Weight:</strong></label>
                                <input type="email" id="weight" name="weight"
                                       placeholder='Weight in kg: 70.3 for example'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyfat"><strong>Body fat percentage:</strong></label>
                                <input type="tel" id="bodyfat" name="bodyfat"
                                       placeholder='Body fat percentage if you know it, for example 20'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="muscle"><strong>Muscle percentage:</strong></label>
                                <input type="text" id="muscle" name="muscle"
                                       placeholder='Muscle percentage if you know it, for example 15'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exercisefrequency"><strong>Exercise frequency:</strong></label>
                                <input type="text" id="exercisefrequency" name="exercisefrequency"
                                       placeholder='Exercise frequency, for example 3 times a week'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="objective"><strong>Objective:</strong></label>
                                <input type="text" id="objective" name="objective"
                                       placeholder='Objective, for example weight loss'/>
                            </div>
                            <button type="submit" className="update-button">Create data for week 1</button>
                        </form>

                        {/* Nueva sección para la información */}
                        <div className="info-grid">
                            <div className="info-box">
                                <div className="info-title">Week 1 data</div>
                                <div className="info-content">
                                    <div className="info-item">
                                        <div className="info-label">Weight:</div>
                                        <div className="info-text">70 kg</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Text:</div>
                                        <div className="info-text">Some additional information</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Special:</div>
                                        <div className="info-text">Details about special conditions</div>
                                    </div>
                                </div>
                                <div className="info-footer">
                                    <button className="edit-button">Edit</button>
                                </div>
                            </div>
                            {/* Repite el mismo bloque para otro cuadro */}
                            <div className="info-box">
                                <div className="info-title">Week 2 data</div>
                                <div className="info-content">
                                    <div className="info-item">
                                        <div className="info-label">Weight:</div>
                                        <div className="info-text">75 kg</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Text:</div>
                                        <div className="info-text">Some additional information</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Special:</div>
                                        <div className="info-text">Details about special conditions</div>
                                    </div>
                                </div>
                                <div className="info-footer">
                                    <button className="edit-button">Edit</button>
                                </div>
                            </div>
                            {/* Añade más cuadros si es necesario */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
