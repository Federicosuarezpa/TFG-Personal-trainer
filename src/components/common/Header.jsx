import PropTypes from 'prop-types';
import '../../styles/Header.css';

const Header = ({ onLoginClick }) => {
    return (
        <header className="header">
            <div className="logo-header">PERSONAL AI GENERATOR</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About us</a></li>
                    <li><a href="#login" onClick={(e) => {
                        e.preventDefault();
                        onLoginClick();
                    }}>Log in</a></li>
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
};


export default Header;