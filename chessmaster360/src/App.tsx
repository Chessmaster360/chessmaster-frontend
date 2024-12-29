import React from "react";
import Navbar from "./components/Bars/Navbar";
import ChessBoard from "./components/Chess/ChessBoard";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row lg:space-x-8 p-4">
        {/* Chessboard Section */}
        <section className="flex-1 flex justify-center items-center">
          <ChessBoard />
        </section>

        {/* Sidebar Section */}
        <section className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Game Report</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Enter PGN:</label>
              <input
                type="text"
                placeholder="Enter PGN..."
                className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded transition"
            >
              Analyse
            </button>
          </form>
          <div className="mt-6">
            <label className="block text-sm mb-2">Depth:</label>
            <input
              type="range"
              className="w-full accent-green-600"
              min="1"
              max="20"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
