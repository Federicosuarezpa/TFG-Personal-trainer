import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import Login from "./components/specific/Login.jsx";
import { useState } from "react";
import Register from "./components/specific/Register.jsx";
import Profile from "./components/specific/Profile.jsx";
import { AuthProvider } from "./shared/context/AuthContext.jsx";
import LoggedUser from "./components/security/LoggedUser.jsx";
import AuthUser from "./components/security/AuthUser.jsx";
import HealthData from "./components/specific/HealthData.jsx";

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    const openModal = () => {
        setIsRegisterVisible(false);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openRegister = () => {
        setIsModalVisible(false);
        setIsRegisterVisible(true);
    };

    const closeRegister = () => {
        setIsRegisterVisible(false);
    };

    return (
        <Router>
            <AuthProvider>
                <Header onLoginClick={openModal} />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile/:userId" element={
                            <AuthUser>
                                <Profile />
                            </AuthUser>
                        } />
                        <Route path="/health-data/:userId" element={
                            <AuthUser>
                                <HealthData />
                            </AuthUser>
                        } />
                    </Routes>
                </main>
                <Footer />
                <Login isVisible={isModalVisible} onClose={closeModal} onSwitchToRegister={openRegister} />
                <Register isVisible={isRegisterVisible} onClose={closeRegister} onSwitchToLogin={openModal} />
            </AuthProvider>
        </Router>
    );
}

export default App;
