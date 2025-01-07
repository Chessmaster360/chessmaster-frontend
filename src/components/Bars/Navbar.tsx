import React from "react";

interface NavbarProps {
  onLoginClick: () => void; // Nueva prop para manejar el clic en el botón Login
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="navbar bg-gray-950 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título */}
        <h1 className="text-2xl font-bold text-white flex items-center">
          ChessMaster360 <span className="ml-2 text-purple-500">♟️</span>
        </h1>

        {/* Navegación */}
        <ul className="flex space-x-12">
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
            {/* Botón Login con la función `onLoginClick` */}
            <button
              className="text-white hover:text-gray-300 transition-colors"
              onClick={onLoginClick}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
