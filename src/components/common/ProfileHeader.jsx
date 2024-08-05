import '../../styles/ProfileHeader.css';
import pencilIcon from "../../svg/pencil-edit-button-svgrepo-com.svg";
import profileIcon from "../../svg/profile-user-svgrepo-com.svg";
const ProfileHeader = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];  // Obtén el archivo seleccionado
        if (file) {
            // Puedes hacer algo con el archivo aquí, como cargarlo en el servidor
            console.log('Selected file:', file);

            // Ejemplo de cómo podrías subir el archivo
            // const formData = new FormData();
            // formData.append('fileUpload', file);

            // fetch('/upload-endpoint', {
            //     method: 'POST',
            //     body: formData,
            // })
            // .then(response => response.json())
            // .then(data => console.log('Upload successful:', data))
            // .catch(error => console.error('Upload error:', error));
        }
    };
    return (
        <div className="profile-header">
            <div className="profile-header-left">
                <div className="profile-pic" onClick={() => document.getElementById('fileInput').click()}>
                    <img src={profileIcon} className="profile-pic"
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