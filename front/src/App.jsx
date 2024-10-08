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
import DietPlanExample from "./components/specific/DietPlanExample.jsx";
import RecoverPassword from "./components/specific/RecoverPassword.jsx";
import NewPasswordCreator from "./components/specific/NewPasswordCreator.jsx";
import WeekPlan from "./components/specific/WeekPlan.jsx";

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [isRemindPasswordVisible, setIsRemindPasswordVisible] = useState(false);
    const [isRegeneratePasswordVisible, setIsRegeneratePasswordVisible] = useState(false);

    const openModal = () => {
        setIsRegisterVisible(false);
        setIsRegeneratePasswordVisible(false);
        setIsRemindPasswordVisible(false);
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

    const openRemindPassword = () => {
        setIsModalVisible(false);
        setIsRegeneratePasswordVisible(false);
        setIsRemindPasswordVisible(true);
    };

    const closeOpenReminder = () => {
        setIsRemindPasswordVisible(false);
    };

    const openRegeneratePassword = () => {
        setIsRemindPasswordVisible(false);
        setIsRegeneratePasswordVisible(true);
    }

    const closeRegeneratePassword = () => {
        setIsRegeneratePasswordVisible(false);
    }

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
                        <Route path="/week-plan/:id" element={
                            <AuthUser>
                                <WeekPlan />
                            </AuthUser>
                        } />
                        <Route path="/diet-example" element={<DietPlanExample />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <Login isVisible={isModalVisible} onClose={closeModal} onSwitchToRegister={openRegister} onSwitchToReminder={openRemindPassword} />
                <Register isVisible={isRegisterVisible} onClose={closeRegister} onSwitchToLogin={openModal} />
                <RecoverPassword isVisible={isRemindPasswordVisible} onClose={closeOpenReminder} onSwitchToRegenerate={openRegeneratePassword} onSwitchToLogin={openModal} />
                <NewPasswordCreator onSwitchToReminder={openRemindPassword} onClose={closeRegeneratePassword} onSwitchToLogin={openModal} isVisible={isRegeneratePasswordVisible} />
            </AuthProvider>
        </Router>
    );
}

export default App;