import '../../styles/ProfileHeader.css';
import pencilIcon from "../../svg/pencil-edit-button-svgrepo-com.svg";
import profileIcon from "../../svg/profile-user-svgrepo-com.svg";
import dropdownIcon from "../../svg/align-justify-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { getUserProfileImage, uploadProfileImage } from "../../http/ApiConnection.js";
import {useNavigate} from "react-router-dom";
import useAuth from "../../shared/hooks/UseAuth.jsx";
import PropTypes from "prop-types";

const ProfileHeader = ({ title }) => {
    const [image, setImage] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const checkImageURL = (url) => {
        const img = new Image();
        img.onload = () => {
            if (img.width === 0) {
                setImage(profileIcon);
            }
        };
        img.onerror = () => {
            setImage(profileIcon);
        };
        img.src = url;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadProfileImage(file).then((data) => {
                setImage(data['fileUrl']);
            });
        }
    };

    useEffect(() => {
        getUserProfileImage().then((data) => {
            const imageUrl = data ? data['fileUrl'] : null;
            if (imageUrl) {
                checkImageURL(imageUrl);
            } else {
                setImage(profileIcon);
            }
        });
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logout = () => {
        try {
            signOut();
            navigate(`/`);
        } catch (error) {
            console.log('Error logging out');
        }
    };

    return (
        <div className="profile-header">
            <div className="profile-header-left">
                <div className="profile-pic" onClick={() => document.getElementById('fileInput').click()}>
                    <img src={image || profileIcon} className="profile-pic" alt='Profile' />
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className="camera-icon">
                        <img src={pencilIcon} className="logo" alt="Edit Profile" />
                    </div>
                </div>
            </div>
            <div className="profile-header-right">
                <div className="profile-title">{title}</div>
                <div className="dropdown-option" onClick={toggleDropdown}>
                    <img className="dropdown-image" src={dropdownIcon} alt="Dropdown menu" />
                </div>
            </div>

            {isDropdownOpen && (
                <div className="fullscreen-dropdown">
                    <div className="dropdown-content">
                        <a href="/profile">Profile</a>
                        <a href="/health-data">Health Data</a>
                        <a href="/diet-plan">Diet Generator</a>
                        <a href="/training-generator">Training Generator</a>
                        <a href="/week-plan">Week plan</a>
                        <a onClick={logout}>Log out</a>
                        <a className="close-button-option" onClick={toggleDropdown}>Close menu</a>
                    </div>
                </div>
            )}
        </div>
    );
};

ProfileHeader.propTypes = {
    title: PropTypes.string,
};


export default ProfileHeader;
