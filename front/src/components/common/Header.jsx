import PropTypes from 'prop-types';
import '../../styles/Header.css';
import UserNotLogged from "../security/NotUserLogged.jsx";
import LoggedUser from "../security/LoggedUser.jsx";

const Header = ({ onLoginClick }) => {
    return (
        <header className="header">
            <div className="logo-header"><a href="/">PERSONAL AI TRAINER</a></div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/diet-example">Plan example</a></li>
                    <UserNotLogged>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault();
                                onLoginClick();
                            }}>
                                Log in
                            </a>
                        </li>
                    </UserNotLogged>
                    <LoggedUser>
                        <li><a href={`/profile`}>Profile</a></li>
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
