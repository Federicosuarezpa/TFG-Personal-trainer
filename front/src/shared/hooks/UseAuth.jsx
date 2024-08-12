import {AuthContext} from '../context/AuthContext.jsx';
import {useContext} from 'react';

export default function UseAuth() {
    return useContext(AuthContext);
}