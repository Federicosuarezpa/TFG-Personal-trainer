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
                    <a href={`/profile`}>Personal Data</a>
                </li>
                <li className={activeItem === 'health-data' ? 'selected-option' : ''}>
                    <a href={`/health-data/`}>Health Data</a>
                </li>
                <li className={activeItem === 'diet-plan' ? 'selected-option' : ''}>
                    <a href={`/diet-plan/`}>Diet Generator</a>
                </li>
                <li className={activeItem === 'training-generator' ? 'selected-option' : ''}>
                    < a href={`/training-generator/`}>Training Generator</a>
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};

export default ProfileSidebar;
