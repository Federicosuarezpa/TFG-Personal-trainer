import UseAuth from '../../shared/hooks/UseAuth.jsx';
import PropTypes from "prop-types";
export default function UserNotLogged({ children }) {
    const { isUserLogged } = UseAuth();

    return <>{!isUserLogged ? children : null}</>;
}

UserNotLogged.propTypes = {
    children: PropTypes.func.isRequired,
};