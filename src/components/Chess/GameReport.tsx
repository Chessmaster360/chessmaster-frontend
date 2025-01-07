import React, { useState, useCallback } from "react";
import { FaChessKnight, FaTools, FaSearch, FaArrowRight } from "react-icons/fa";
import { Game, fetchGamesFromBackend, analyzeGameInput } from "../../api/gameApi";

const GameReport: React.FC = () => {
  const [option, setOption] = useState<string>("pgn");
  const [inputValue, setInputValue] = useState<string>("");
  const [depth, setDepth] = useState<number>(14);
  const [games, setGames] = useState<Game[]>([]);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
    setInputValue("");
    setWarning("");
  }, []);

  const handleDepthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(event.target.value));
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!inputValue.trim()) {
      setWarning("Please enter a game to analyze.");
      return;
    }
    setWarning("");
    try {
      await analyzeGameInput(inputValue, option);
    } catch (error) {
      setWarning("Error analyzing the game input. Please try again.");
    }
  }, [inputValue, option]);

  const handleSearch = useCallback(async () => {
    if (option === "chess.com" || option === "lichess.org") {
      try {
        const fetchedGames = await fetchGamesFromBackend(option, inputValue.trim());
        setGames(fetchedGames);
        setShowGames(true);
        setWarning("");
      } catch (error) {
        setWarning("User not found or there was an issue fetching the games.");
        setGames([]);
        setShowGames(false);
      }
    } else {
      setWarning("Please select a valid platform.");
    }
  }, [option, inputValue]);

  const handleGameSelect = useCallback((pgn: string) => {
    setInputValue(pgn);
    setShowGames(false);
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md border border-gray-700 w-full max-w-[90vw] lg:max-w-[800px] mx-auto">
      <header className="flex items-center mb-6 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
        <FaChessKnight className="text-3xl text-green-600 mb-2 lg:mb-0" />
        <h2 className="text-2xl font-semibold">Game Report</h2>
      </header>

      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4 mb-6 w-full">
        <div className="relative flex-grow w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              option === "chess.com" || option === "lichess.org"
                ? "Enter the username..."
                : "Enter PGN..."
            }
            className="w-full bg-gray-900 text-white px-4 py-2 rounded pr-12"
          />
          {option !== "pgn" && (
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <FaSearch aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>
          )}
        </div>

        <select
          value={option}
          onChange={handleOptionChange}
          className="bg-gray-900 text-white px-4 py-2 rounded w-full lg:w-[160px] text-center"
        >
          <option value="pgn">PGN</option>
          <option value="chess.com">Chess.com</option>
          <option value="lichess.org">Lichess.org</option>
        </select>
      </div>

      <div className="mb-6">
        <button
          onClick={handleAnalyze}
          className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
        >
          <FaArrowRight aria-hidden="true" />
          <span>Analyze</span>
        </button>
        {warning && <p className="mt-2 text-sm text-red-500 text-center">{warning}</p>}
      </div>

      <div className="space-y-4 bg-gray-700 p-4 rounded-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">Depth</h3>
            <FaTools className="text-xl text-green-500" />
          </div>
          <span className="text-sm bg-gray-600 px-3 py-1 rounded lg:hidden">{depth}</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={14}
            max={20}
            value={depth}
            onChange={handleDepthChange}
            className="w-full h-3 rounded-lg bg-gray-600 cursor-pointer"
          />
          <span className="text-sm bg-gray-600 px-3 py-1 rounded hidden lg:block">{depth}</span>
        </div>
      </div>

      {showGames && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-[600px] h-3/4 overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-4">Last Month's Games:</h3>
            <ul className="space-y-2">
              {games.map((game, index) => (
                <li
                  key={index}
                  className="border-b border-gray-700 pb-2 cursor-pointer hover:bg-gray-700 p-2"
                  onClick={() => handleGameSelect(game.pgn)}
                >
                  {game.white.username} vs {game.black.username}
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
