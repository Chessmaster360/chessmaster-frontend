import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChess } from "react-icons/fa";

interface NavbarProps {
  onLoginClick: () => void; // Prop para manejar el clic en el botón Login
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="text-white p-4 shadow-lg bg-black-600 border-b border-black-500">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <FaChess className="text-2xl text-green-500" />
          <span className="text-xl font-bold text-white">
            ChessMaster<span className="text-green-500">360</span>
          </span>
        </div>


        {/* Menú en pantallas grandes */}
        <ul className="hidden md:flex space-x-12">
          <li>
            <button
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => navigate('/')}
            >
              Analyze Games
            </button>
          </li>
          <li>
            <button
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => navigate('/play')}
            >
              Play
            </button>
          </li>
          <li>
            <button
              className="text-white hover:text-gray-300 transition-colors"
              onClick={onLoginClick}
            >
              Login
            </button>
          </li>
        </ul>

        {/* Botón para el menú móvil */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Menú colapsable para móviles */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
          <ul className="text-center space-y-8 text-lg font-semibold">
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => {
                  toggleMenu();
                  navigate('/');
                }}
              >
                Analyze Games
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => {
                  toggleMenu();
                  navigate('/play');
                }}
              >
                Play
              </button>
            </li>
            <li>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => {
                  toggleMenu();
                  onLoginClick();
                }}
              >
                Login
              </button>
            </li>
          </ul>

          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            ✖
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
