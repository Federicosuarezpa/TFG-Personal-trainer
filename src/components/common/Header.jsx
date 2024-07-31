import PropTypes from 'prop-types';
import '../../styles/Header.css';
import UserNotLogged from "../security/NotUserLogged.jsx";
import LoggedUser from "../security/LoggedUser.jsx";
import useAuth from "../../shared/hooks/UseAuth.jsx";

const Header = ({onLoginClick}) => {
    const { userData } = useAuth();

    return (
        <header className="header">
            <div className="logo-header">PERSONAL AI GENERATOR</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About us</a></li>
                    <UserNotLogged>
                        <li><a href='#login' onClick={(e) => {
                            e.preventDefault();
                            onLoginClick();
                        }}>Log in</a></li>
                    </UserNotLogged>
                    <LoggedUser>
                        <li><a href={`/profile/${userData?.id}`}>Profile</a></li>

                    </LoggedUser>
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
};


export default Header;