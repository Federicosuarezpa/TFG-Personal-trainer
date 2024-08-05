import { useNavigate } from "react-router-dom";
import useAuth from "../../shared/hooks/UseAuth.jsx";

const ProfileSidebar = ({ activeItem }) => {
    const navigate = useNavigate();
    const { signOut, userData } = useAuth();

    const logout = () => {
        try {
            signOut();
            navigate(`/`);
        } catch (error) {
            console.log('Error logging out');
        }
    };

    return (
        <div className="profile-sidebar">
            <ul>
                <li className={activeItem === 'personal-data' ? 'selected-option' : ''}>
                    <a href={`/profile/${userData.id}`}>Personal data</a>
                </li>
                <li className={activeItem === 'health-data' ? 'selected-option' : ''}>
                    <a href={`/health-data/`}>Health data</a>
                </li>
                <li className={activeItem === 'diet-plan' ? 'selected-option' : ''}>
                    Diet plan
                </li>
                <li className={activeItem === 'training-routine' ? 'selected-option' : ''}>
                    Training routine
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};

export default ProfileSidebar;
