import '../../styles/Profile.css';
import useAuth from '../../shared/hooks/UseAuth.jsx';
import { useEffect, useState } from "react";
import {
    deleteUserAccount,
    getUserData,
    getUserProfileImage,
    updateProfile,
    uploadProfileImage
} from "../../http/ApiConnection.js";
import {useNavigate} from "react-router-dom";
import ProfileHeader from "../common/ProfileHeader.jsx";
import ProfileSidebar from "../common/ProfileSidebar.jsx";
import profileIcon from "../../svg/profile-user-svgrepo-com.svg";

const Profile = () => {
    const navigate = useNavigate();
    const { userData: userId, signOut } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState();


    useEffect(() => {
        getUserData(userId.id).then((data) => {
            setUserData(data ? data["userInfo"] : {});
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, [userId]);

    useEffect(() => {
        getUserProfileImage().then((data) => {
            setImage(data ? data['fileUrl'] : null);
        }).catch(error => {
            console.error('Error fetching user profile image:', error);
        });
    }, []);

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
            await updateProfile(age, phone, address, gender);
            setSuccess('Profile updated');
            clearError();
        } catch (error) {
            setError('Error updating profile');
        }
    };

    const clearError = () => {
        setError(null);
    };

    const clearSuccess = () => {
        setSuccess(null);
    };

    const deleteAccount = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete your account?');

        if (isConfirmed) {
            try {
                await deleteUserAccount();
                signOut();
                navigate(`/`);
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        } else {
            console.log('Deletion canceled');
        }
    };

    const handleMobileFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const data = await uploadProfileImage(file);
                setImage(data ? data['fileUrl'] : null);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };


    return (
        <div className="profile-page">
            <div className="profile-container">
                <ProfileHeader title={'Profile'}/>
                <div className="profile-body">
                    <ProfileSidebar activeItem='personal-data'/>
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            <div className="profile-pic-mobile" onClick={() => document.getElementById('fileInputMobile').click()}>
                                <img src={ image || profileIcon} className="profile-pic-mobile" alt='Profile'/>
                                <input
                                    type="file"
                                    id="fileInputMobile"
                                    style={{display: 'none'}}
                                    onChange={handleMobileFileChange}
                                />
                            </div>
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
                            <p className="forgot-password" onClick={deleteAccount}>Delete account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
