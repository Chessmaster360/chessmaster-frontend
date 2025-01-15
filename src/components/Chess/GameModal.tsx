import React from "react";

interface Game {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  pgn: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  games: Game[];
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
  onSelectGame: (pgn: string) => void;
}

const GameModal: React.FC<ModalProps> = ({
  show,
  onClose,
  games,
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  disablePrevious,
  disableNext,
  onSelectGame,
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-[600px] h-3/4 overflow-y-auto relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
          <h3 className="text-lg font-semibold">Games for {currentMonth}</h3>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>

        {/* Games List */}
        <ul className="space-y-2">
          {games.length > 0 ? (
            games.map((game, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
                onClick={() => onSelectGame(game.pgn)}
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  {/* White Player */}
                  <div className="flex items-center space-x-2">
                    <span
                      className="block w-4 h-4 rounded-full border"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                    <span className="text-sm">
                      {game.white.username} ({game.white.rating})
                    </span>
                  </div>
                  <span className="text-gray-400">vs</span>
                  {/* Black Player */}
                  <div className="flex items-center space-x-2">
                    <span
                      className="block w-4 h-4 rounded-full border"
                      style={{ backgroundColor: "#000" }}
                    ></span>
                    <span className="text-sm">
                      {game.black.username} ({game.black.rating})
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">No games available for this month.</p>
          )}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onPreviousMonth}
            disabled={disablePrevious}
            className={`px-4 py-2 rounded ${
              disablePrevious
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Previous
          </button>
          <button
            onClick={onNextMonth}
            disabled={disableNext}
            className={`px-4 py-2 rounded ${
              disableNext
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
