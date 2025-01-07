import React, { useState } from "react";
import Navbar from "./components/Bars/Navbar";
import AnalyzeScreen from "./pages/AnalyzeScreen";
import LoginModal from "./components/Login/LoginModal";
import RegisterModal from "./components/Login/RegisterModal";

const App: React.FC = () => {
  // Estados para controlar la visibilidad de los modales
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Función para mostrar el LoginModal
  const toggleLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false); // Asegura que el modal de registro no esté abierto
  };

  // Función para mostrar el RegisterModal
  const toggleRegisterModal = () => {
    setShowRegister(true);
    setShowLogin(false); // Asegura que el modal de login no esté abierto
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-slate-900 to-gray-900 text-gray-200">
      {/* Navbar */}
      <Navbar onLoginClick={toggleLoginModal} />

      {/* Main content */}
      <main className="flex-grow">
        <AnalyzeScreen />
      </main>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={toggleRegisterModal} // Pasa la función para cambiar al modal de registro
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={toggleLoginModal} // Pasa la función para cambiar al modal de login
        />
      )}
    </div>
  );
};

export default App;
