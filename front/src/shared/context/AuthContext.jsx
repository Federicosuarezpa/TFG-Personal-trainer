import decodeTokenData from "../utils/DecodeTokenData.jsx";
import React, {useState} from "react";
import PropTypes from 'prop-types'; // Importa PropTypes
import {login, register} from '../../http/ApiConnection';

export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

const token = sessionStorage.getItem('token');
const tokenObject = decodeTokenData(token);


export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(tokenObject);
    const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);

    // Métodos de autenticación y gestión de usuario
    const signIn = async (email, password) => {
        const loginData = await login(email, password);
        if (!loginData.token) {
            return { error: loginData.message };
        }
        sessionStorage.setItem('token', loginData.token);
        const tokenObject = decodeTokenData(loginData.token);
        setUserData(tokenObject);
        setIsUserLogged(true);
        return tokenObject;
    };

    const signUp = async (email, password, age, username, address, phone, lastname) => {
        const response = await register(email, password, age, username, address, phone, lastname);
        if (!response || response.error) {
            return { error: response.error };
        }
        const tokenObject = decodeTokenData(response);
        setUserData(tokenObject);
        setIsUserLogged(true);
        return tokenObject;
    };

    const signOut = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUserData(null);
        setIsUserLogged(false);
    };

    return (
        <AuthContextProvider
            value={{
                token,
                userData,
                signIn,
                signOut,
                signUp,
                isUserLogged
            }}
        >
            {children}
        </AuthContextProvider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
