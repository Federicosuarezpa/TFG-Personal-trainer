import UseAuth from '../../shared/hooks/UseAuth.jsx';
import PropTypes from "prop-types";

export default function LoggedUser({ children }) {
    const { isUserLogged } = UseAuth();

    return <>{isUserLogged ? children : null}</>;
}

LoggedUser.propTypes = {
    children: PropTypes.node.isRequired,
};
