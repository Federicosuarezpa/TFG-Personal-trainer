import decodeTokenData from "../utils/DecodeTokenData.jsx";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import PropTypes from 'prop-types'; // Importa PropTypes
import { login } from '../../http/ApiConnection';

export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

let token = localStorage.getItem('token');
console.log('hola')
let tokenObject = decodeTokenData(token);
if (!token) {
    token = sessionStorage.getItem('token');
    tokenObject = decodeTokenData(token);
}

export function AuthProvider({ children }) {
    // Estado local para gestionar datos de usuario y estado de autenticación
    const [userData, setUserData] = useState(tokenObject);
    const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);
    const navigate = useNavigate();

    // Métodos de autenticación y gestión de usuario
    const signIn = async (email, password) => {
        const loginData = await login(email, password);
        sessionStorage.setItem('token', loginData);
        const tokenObject = decodeTokenData(loginData);
        setUserData(tokenObject);
        setIsUserLogged(true);
        navigate('/')
    };

    const signUp = async (name, email, password, confirmPassword) => {
        const message = ''
        return message;
    };

    const signOut = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        history.push('/login');
        setUserData(null);
        setIsUserLogged(false);
    };

    const recoverPass = async (email) => {
        const message = ''
        return message;
    };

    const resetPassword = async (recovertoken, password, confirmPassword) => {
        const message = ''
        return message;
    };

    const updateInfoUser = async (data) => {
        const message = ''
        return message;
    };

    return (
        <AuthContextProvider
            value={{
                token,
                updateInfoUser,
                userData,
                signIn,
                signOut,
                signUp,
                isUserLogged,
                recoverPass,
                resetPassword,
            }}
        >
            {children}
        </AuthContextProvider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
