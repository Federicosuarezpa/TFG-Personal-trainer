import UseAuth from '../../shared/hooks/UseAuth.jsx';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";
export default function AuthUser({ children }) {
    const { isUserLogged } = UseAuth();

    if (!isUserLogged) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

AuthUser.propTypes = {
    children: PropTypes.node.isRequired,
};