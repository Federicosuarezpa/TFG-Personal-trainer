import '../../styles/ProfileHeader.css';
import pencilIcon from "../../svg/pencil-edit-button-svgrepo-com.svg";
import profileIcon from "../../svg/profile-user-svgrepo-com.svg";
import {useEffect, useState} from "react";
import {getUserProfileImage, uploadProfileImage} from "../../http/ApiConnection.js";
const ProfileHeader = () => {
    const [image, setImage] = useState(null);

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
            setImage(data ? data['fileUrl'] : profileIcon);
        });
    }, []);
    return (
        <div className="profile-header">
            <div className="profile-header-left">
                <div className="profile-pic" onClick={() => document.getElementById('fileInput').click()}>
                    <img src={image ? image : profileIcon} className="profile-pic"
                         alt='Profile'/>
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <div className="camera-icon">
                        <img src={pencilIcon}
                             className="logo" alt="Healthy Food Logo"/>
                    </div>
                </div>
            </div>
            <div className="profile-header-right">
                <div className="profile-title">Profile</div>
            </div>
        </div>
    );
};

export default ProfileHeader;