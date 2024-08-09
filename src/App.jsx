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
import AuthUser from "./components/security/AuthUser.jsx";
import HealthData from "./components/specific/HealthData.jsx";
import DietPlan from "./components/specific/DietPlan.jsx";
import NotFound from "./components/specific/NotFound.jsx";
import TrainingGenerator from "./components/specific/TrainingGenerator.jsx";

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
    const test = 'test';
    return (
        <Router>
            <AuthProvider>
                <Header onLoginClick={openModal} />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={
                            <AuthUser>
                                <Profile />
                            </AuthUser>
                        } />
                        <Route path="/health-data" element={
                            <AuthUser>
                                <HealthData />
                            </AuthUser>
                        } />
                        <Route path="/diet-plan" element={
                            <AuthUser>
                                <DietPlan />
                            </AuthUser>
                        } />
                        <Route path="/training-generator" element={
                            <AuthUser>
                                <TrainingGenerator />
                            </AuthUser>
                        } />
                        <Route path="*" element={<NotFound />} />
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
