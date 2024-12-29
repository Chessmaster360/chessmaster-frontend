import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ChessMaster</h1>
        <ul className="flex space-x-6">
          <li>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">Play</button>
          </li>
          <li>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">Analyze Games</button>
          </li>
          <li>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">Learn</button>
          </li>
          <li>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
