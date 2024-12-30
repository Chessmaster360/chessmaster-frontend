import React, { useState } from "react";
import { FaChessKnight, FaTools, FaSearch, FaArrowRight } from "react-icons/fa";

const GameReport: React.FC = () => {
  const [option, setOption] = useState<string>("pgn");
  const [inputValue, setInputValue] = useState<string>("");
  const [depth, setDepth] = useState<number>(14);
  const [games, setGames] = useState<string[]>([]);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>(""); // State for warning message

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
    setInputValue(""); // Reset the input value when option changes
    setWarning(""); // Clear warning when changing options
  };

  const handleDepthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(event.target.value));
  };

  const handleAnalyze = () => {
    if (!inputValue.trim()) {
      setWarning("Please enter a game to analyze.");
    } else {
      setWarning("");
      // Add analyze functionality here
      console.log("Analyzing:", inputValue);
    }
  };

  const fetchGames = () => {
    // Simulate fetching last month's games for chess.com or lichess.org
    const mockGames = Array.from({ length: 50 }, (_, i) => `Game ${i + 1}: PlayerA vs PlayerB`);
    setGames(mockGames);
    setShowGames(true); // Show the fetched games
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md border border-gray-700">
      {/* Header with Chess Icon and Title */}
      <div className="flex items-center mb-4">
        <FaChessKnight className="text-3xl text-green-600 mr-3" />
        <h2 className="text-xl font-semibold">Game Report</h2>
      </div>

      {/* Input Row with Field, Dropdown, and Search Button */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Input Field with Search Button */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              option === "chess.com" || option === "lichess.org"
                ? "Enter the username..."
                : "Enter PGN..."
            }
            className="w-full bg-gray-900 text-white px-3 py-2 rounded pr-12"
          />
          {option !== "pgn" && (
            <button
              onClick={fetchGames}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <FaSearch />
            </button>
          )}
        </div>

        {/* Dropdown */}
        <div>
          <select
            value={option}
            onChange={handleOptionChange}
            className="bg-gray-900 text-white px-3 py-2 rounded w-[120px] text-center"
          >
            <option value="pgn">PGN</option>
            <option value="chess.com">Chess.com</option>
            <option value="lichess.org">Lichess.org</option>
          </select>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="mb-6">
        <button
          onClick={handleAnalyze}
          className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
        >
          <FaArrowRight />
          <span>Analyze</span>
        </button>
        {warning && (
          <p className="mt-2 text-sm text-red-500">{warning}</p>
        )}
      </div>

      {/* Depth Selector */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Depth</h3>
          <FaTools className="text-xl text-green-600" />
        </div>
        <div className="flex items-center space-x-4">
          {/* Depth Bar */}
          <input
            type="range"
            min={14}
            max={20}
            value={depth}
            onChange={handleDepthChange}
            className="w-full accent-green-600 h-3 rounded-lg"
          />
          {/* Depth Value */}
          <span className="text-sm bg-gray-700 px-3 py-1 rounded">{depth}</span>
        </div>
      </div>

      {/* Display Fetched Games */}
      {showGames && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-3/4 h-3/4 overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-4">Last Month's Games:</h3>
            <ul className="space-y-2">
              {games.map((game, index) => (
                <li key={index} className="border-b border-gray-700 pb-2">
                  {game}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowGames(false)}
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameReport;
