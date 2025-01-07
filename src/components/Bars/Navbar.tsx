import React, { useState } from "react";

interface NavbarProps {
  onLoginClick: () => void; // Prop para manejar el clic en el botón Login
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  // Estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-950 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título */}
        <h1 className="text-2xl font-bold text-white flex items-center">
          ChessMaster360 <span className="ml-2 text-purple-500">♟️</span>
        </h1>

        {/* Menú en pantallas grandes */}
        <ul className="hidden md:flex space-x-12">
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">
              Analyze Games
            </button>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">
              Play
            </button>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">
              Learn
            </button>
          </li>
          <li>
            {/* Botón Login */}
            <button
              className="text-white hover:text-gray-300 transition-colors"
              onClick={onLoginClick}
            >
              Login
            </button>
          </li>
        </ul>

        {/* Hamburger button para móviles */}
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

      {/* Menú colapsable para móviles (full-screen con fondo oscuro) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
          {/* Opciones del menú */}
          <ul className="text-center space-y-8 text-lg font-semibold">
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Analyze Games
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Play
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Learn
              </button>
            </li>
            <li>
              {/* Botón Login */}
              <button
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => {
                  toggleMenu(); // Cierra el menú
                  onLoginClick(); // Abre el modal de login
                }}
              >
                Login
              </button>
            </li>
          </ul>

          {/* Botón para cerrar */}
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
