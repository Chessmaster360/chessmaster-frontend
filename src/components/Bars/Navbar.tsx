import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-gray-950 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black"> ChessMaster360 ♟️</h1>
        <ul className="flex space-x-12">
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">Analyze Games</button>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">Play</button>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">Learn</button>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 transition-colors">Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
