import React, { useState, useCallback } from "react";
import { FaChessKnight, FaTools, FaSearch, FaArrowRight, FaCheck, FaSpinner } from "react-icons/fa";
import { getPlayerArchives, getGamesFromMonth } from "../../services/chessService";
import GameModal from "./GameModal"; // Asegúrate de importar correctamente el modal

interface Game {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  pgn: string;
}

const GameReport: React.FC = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false); // New state
  const [option, setOption] = useState<string>("pgn");
  const [inputValue, setInputValue] = useState<string>("");
  const [depth, setDepth] = useState<number>(14);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [archives, setArchives] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para la carga
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Estado para éxito

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
    setInputValue("");
    setWarning("");
  }, []);

  const handleDepthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(event.target.value));
  }, []);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setWarning("");
    
    if (!inputValue.trim()) {
      setWarning("Please enter a username.");
      setIsLoading(false);
      return;
    }

    if (option !== "chess.com") {
      setWarning("This feature currently only works for Chess.com.");
      setIsLoading(false);
      return;
    }

    try {
      const playerArchives = await getPlayerArchives(inputValue.trim());
      setArchives(playerArchives);

      if (playerArchives.length > 0) {
        setShowGames(true);
        setIsSuccess(true); // Éxito en la búsqueda
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
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  }, [inputValue, option]);

  const handleGameSelect = useCallback((pgn: string) => {
    setInputValue(pgn);
    setShowGames(false);
  }, []);

  const handleMonthSelect = useCallback(async (month: string) => {
    const [year, monthNumber] = month.split("-");
    try {
      const gamesForMonth = await getGamesFromMonth(inputValue.trim(), parseInt(year), parseInt(monthNumber));
      setGames(gamesForMonth);
    } catch {
      setWarning("Error fetching games for selected month.");
    }
  }, [inputValue]);

  return (
    <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full max-w-[90vw] lg:max-w-[800px] mx-auto mb-8">
      {/* Header with "?" button */}
      <header className="relative flex items-center mb-6 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
        <FaChessKnight className="text-3xl text-green-600 mb-2 lg:mb-0" />
        <h2 className="text-2xl font-semibold">Game Report</h2>
        <button
          onClick={() => setShowInstructionsModal(true)}
          className="absolute top-2 right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-500"
          aria-label="Show instructions"
        >
          ?
        </button>
      </header>

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded w-11/12 max-w-[500px] relative">
            <button
              onClick={() => setShowInstructionsModal(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-xl"
            >
              ×
            </button>
            <p className="text-sm">
              Enter a PGN game format to analyze manually, or find the PGN format 
              of a game played by any user by entering the USERNAME of the chess.com platform.
            </p>
          </div>
        </div>
      )}

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
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : isSuccess ? (
                <FaCheck />
              ) : (
                <FaSearch />
              )}
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

      <div className="space-y-4 bg-black-200 p-4 rounded">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">Depth</h3>
            <FaTools className="text-xl text-green-500" />
          </div>
          <span className="text-sm bg-black-100 px-3 py-1 rounded lg:hidden">{depth}</span>
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
        <GameModal
          show={showGames}
          onClose={() => setShowGames(false)}
          games={games}
          archives={archives}
          onMonthSelect={handleMonthSelect}
          onSelectGame={handleGameSelect}
        />
      )}
    </div>
  );
};

export default GameReport;
