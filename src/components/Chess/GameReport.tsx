import React, { useState, useCallback } from "react";
import { FaChessKnight, FaTools, FaSearch, FaArrowRight } from "react-icons/fa";
import { getPlayerArchives, getGamesFromMonth } from "../../services/chessService";

interface Game {
  white: { username: string };
  black: { username: string };
  pgn: string;
}

const GameReport: React.FC = () => {
  const [option, setOption] = useState<string>("pgn");
  const [inputValue, setInputValue] = useState<string>("");
  const [depth, setDepth] = useState<number>(14);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [archives, setArchives] = useState<string[]>([]);
  const [currentArchiveIndex, setCurrentArchiveIndex] = useState<number>(0);

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
    setInputValue("");
    setWarning("");
  }, []);

  const handleDepthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(event.target.value));
  }, []);

  const handleSearch = useCallback(async () => {
    if (!inputValue.trim()) {
      setWarning("Please enter a username.");
      return;
    }

    if (option !== "chess.com") {
      setWarning("This feature currently only works for Chess.com.");
      return;
    }

    try {
      const playerArchives = await getPlayerArchives(inputValue.trim());
      setArchives(playerArchives);

      // Cargar juegos del archivo más reciente
      if (playerArchives.length > 0) {
        setCurrentArchiveIndex(playerArchives.length - 1);
        const [year, month] = playerArchives[playerArchives.length - 1]
          .split("/")
          .slice(-2);
        const gamesForMonth = await getGamesFromMonth(inputValue.trim(), parseInt(year), parseInt(month));
        setGames(gamesForMonth);
        setShowGames(true);
      } else {
        setWarning("No games found for this user.");
        setShowGames(false);
        setGames([]);
      }
    } catch (error) {
      setWarning("Error fetching games. Please try again.");
      setArchives([]);
      setGames([]);
      setShowGames(false);
    }
  }, [inputValue, option]);

  const handleGameSelect = useCallback((pgn: string) => {
    setInputValue(pgn);
    setShowGames(false);
  }, []);

  const handlePreviousMonth = useCallback(async () => {
    if (currentArchiveIndex > 0) {
      const newIndex = currentArchiveIndex - 1;
      setCurrentArchiveIndex(newIndex);
      const [year, month] = archives[newIndex].split("/").slice(-2);

      try {
        const gamesForMonth = await getGamesFromMonth(inputValue.trim(), parseInt(year), parseInt(month));
        setGames(gamesForMonth);
      } catch {
        setWarning("Error fetching games for previous month.");
      }
    }
  }, [currentArchiveIndex, archives, inputValue]);

  const handleNextMonth = useCallback(async () => {
    if (currentArchiveIndex < archives.length - 1) {
      const newIndex = currentArchiveIndex + 1;
      setCurrentArchiveIndex(newIndex);
      const [year, month] = archives[newIndex].split("/").slice(-2);

      try {
        const gamesForMonth = await getGamesFromMonth(inputValue.trim(), parseInt(year), parseInt(month));
        setGames(gamesForMonth);
      } catch {
        setWarning("Error fetching games for next month.");
      }
    }
  }, [currentArchiveIndex, archives, inputValue]);

  return (
    <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full max-w-[90vw] lg:max-w-[800px] mx-auto mb-8">
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
            className="w-full bg-black-200 text-white px-4 py-2 rounded pr-12"
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
          className="bg-black-200 text-white px-4 py-2 rounded w-full lg:w-[160px] text-center"
        >
          <option value="pgn">PGN</option>
          <option value="chess.com">Chess.com</option>
        </select>
      </div>

      <div className="mb-6">
        <button
          className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
        >
          <FaArrowRight aria-hidden="true" />
          <span>Analyze</span>
        </button>
        {warning && <p className="mt-2 text-sm text-red-500 text-center">{warning}</p>}
      </div>

      {showGames && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-[600px] h-3/4 overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-4">Games for {archives[currentArchiveIndex]}:</h3>
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
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousMonth}
                disabled={currentArchiveIndex === 0}
                className={`px-4 py-2 rounded ${
                  currentArchiveIndex === 0 ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Previous
              </button>
              <button
                onClick={handleNextMonth}
                disabled={currentArchiveIndex === archives.length - 1}
                className={`px-4 py-2 rounded ${
                  currentArchiveIndex === archives.length - 1
                    ? "bg-gray-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Next
              </button>
            </div>
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
