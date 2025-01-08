import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Bars/Navbar";
import AnalyzeScreen from "./pages/AnalyzeScreen";
import PlayScreen from "./pages/PlayScreen"; // Importa PlayScreen
import LoginModal from "./components/Login/LoginModal";
import RegisterModal from "./components/Login/RegisterModal";

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const toggleRegisterModal = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="h-screen flex flex-col bg-gradient-to-r text-gray-200">
        <Navbar onLoginClick={toggleLoginModal} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AnalyzeScreen />} />
            <Route path="/play" element={<PlayScreen />} />
          </Routes>
        </main>

        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={toggleRegisterModal}
          />
        )}
        {showRegister && (
          <RegisterModal
            onClose={() => setShowRegister(false)}
            onSwitchToLogin={toggleLoginModal}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
