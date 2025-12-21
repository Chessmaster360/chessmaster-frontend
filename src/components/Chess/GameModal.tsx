import React, { useState } from "react";
import { FaChevronLeft, FaTimes, FaCalendarAlt, FaChess, FaBolt, FaClock, FaFire, FaTrophy, FaSkull } from "react-icons/fa";

interface Game {
  white: { username: string; rating: number; result?: string };
  black: { username: string; rating: number; result?: string };
  pgn: string;
  time_class?: string;
  end_time?: number;
  rules?: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  games: Game[];
  archives: string[];
  onMonthSelect: (month: string) => void;
  onSelectGame: (pgn: string) => void;
  username?: string;
}

// Parse result from PGN
const parseResult = (pgn: string, username: string): { won: boolean | null; result: string } => {
  const resultMatch = pgn.match(/\[Result\s+"([^"]+)"\]/);
  const whiteMatch = pgn.match(/\[White\s+"([^"]+)"\]/i);
  const blackMatch = pgn.match(/\[Black\s+"([^"]+)"\]/i);

  if (!resultMatch) return { won: null, result: "?" };

  const result = resultMatch[1];
  const isWhite = whiteMatch && whiteMatch[1].toLowerCase() === username.toLowerCase();
  const isBlack = blackMatch && blackMatch[1].toLowerCase() === username.toLowerCase();

  if (result === "1-0") {
    return { won: isWhite, result: isWhite ? "W" : "L" };
  } else if (result === "0-1") {
    return { won: isBlack, result: isBlack ? "W" : "L" };
  } else if (result === "1/2-1/2") {
    return { won: null, result: "D" };
  }
  return { won: null, result: "?" };
};

// Parse date from PGN
const parseDate = (pgn: string): string => {
  const dateMatch = pgn.match(/\[Date\s+"([^"]+)"\]/);
  if (!dateMatch) return "";
  const parts = dateMatch[1].split(".");
  if (parts.length === 3) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]}`;
  }
  return dateMatch[1];
};

// Parse time control to get game type
const parseTimeControl = (pgn: string): { type: string; icon: React.ReactNode } => {
  const tcMatch = pgn.match(/\[TimeControl\s+"([^"]+)"\]/);
  if (!tcMatch) return { type: "standard", icon: <FaChess className="text-gray-400" /> };

  const tc = tcMatch[1];
  // Parse base time (seconds)
  const baseMatch = tc.match(/^(\d+)/);
  if (!baseMatch) return { type: "standard", icon: <FaChess className="text-gray-400" /> };

  const baseTime = parseInt(baseMatch[1]);

  if (baseTime < 180) {
    return { type: "bullet", icon: <FaBolt className="text-yellow-400" title="Bullet" /> };
  } else if (baseTime < 600) {
    return { type: "blitz", icon: <FaFire className="text-orange-400" title="Blitz" /> };
  } else if (baseTime < 1800) {
    return { type: "rapid", icon: <FaClock className="text-blue-400" title="Rapid" /> };
  }
  return { type: "classical", icon: <FaChess className="text-purple-400" title="Classical" /> };
};

const GameModal: React.FC<ModalProps> = ({
  show,
  onClose,
  games,
  archives,
  onMonthSelect,
  onSelectGame,
  username = "",
}) => {
  const [viewMode, setViewMode] = useState<"months" | "games">("months");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  if (!show) return null;

  const sortedArchives = [...archives].sort((a, b) => (a > b ? -1 : 1));
  const sortedGames = [...games].reverse();

  const formatMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-black-700 rounded-xl border border-gray-700 shadow-2xl overflow-hidden mt-4">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-green-700 to-green-600">
        <div className="flex items-center gap-2">
          {viewMode === "games" && (
            <button
              onClick={() => setViewMode("months")}
              className="p-1.5 hover:bg-green-800 rounded-lg transition-colors"
              title="Back to months"
            >
              <FaChevronLeft className="text-white" />
            </button>
          )}
          <FaChess className="text-white text-lg" />
          <h3 className="text-white font-semibold">
            {viewMode === "months" ? "Select Month" : formatMonth(selectedMonth)}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-green-800 rounded-lg transition-colors"
          title="Close"
        >
          <FaTimes className="text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
        {viewMode === "months" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
            {sortedArchives.length > 0 ? (
              sortedArchives.map((archive, index) => {
                const [year, month] = archive.split("/").slice(-2);
                const formattedMonth = `${year}-${month}`;
                return (
                  <button
                    key={index}
                    className="flex items-center justify-center gap-2 p-3 bg-black-500 hover:bg-green-700 
                               rounded-lg transition-all duration-200 border border-gray-700 hover:border-green-500
                               group"
                    onClick={() => {
                      setSelectedMonth(formattedMonth);
                      setViewMode("games");
                      onMonthSelect(formattedMonth);
                    }}
                  >
                    <FaCalendarAlt className="text-gray-400 group-hover:text-white text-sm" />
                    <span className="text-sm text-gray-200 group-hover:text-white font-medium">
                      {formatMonth(formattedMonth)}
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="col-span-3 text-center text-gray-400 py-4">No months available.</p>
            )}
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {sortedGames.length > 0 ? (
              sortedGames.map((game, index) => {
                const gameResult = parseResult(game.pgn, username);
                const gameType = parseTimeControl(game.pgn);
                const gameDate = parseDate(game.pgn);

                return (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 bg-black-500 hover:bg-gray-700 
                               rounded-lg transition-all duration-200 border border-gray-700 hover:border-green-500
                               group gap-3"
                    onClick={() => onSelectGame(game.pgn)}
                  >
                    {/* Game Type Icon */}
                    <div className="flex-shrink-0 text-lg">
                      {gameType.icon}
                    </div>

                    {/* Players */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-white border border-gray-400 flex-shrink-0"></span>
                        <span className="text-sm text-gray-200 truncate">
                          {game.white.username}
                        </span>
                        <span className="text-xs text-gray-500">({game.white.rating})</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-3 h-3 rounded-full bg-gray-800 border border-gray-500 flex-shrink-0"></span>
                        <span className="text-sm text-gray-200 truncate">
                          {game.black.username}
                        </span>
                        <span className="text-xs text-gray-500">({game.black.rating})</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-gray-400 flex-shrink-0">
                      {gameDate}
                    </div>

                    {/* Result */}
                    <div className="flex-shrink-0">
                      {gameResult.won === true ? (
                        <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded">
                          <FaTrophy className="text-yellow-300 text-xs" />
                          <span className="text-xs font-bold text-white">W</span>
                        </div>
                      ) : gameResult.won === false ? (
                        <div className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded">
                          <FaSkull className="text-gray-200 text-xs" />
                          <span className="text-xs font-bold text-white">L</span>
                        </div>
                      ) : (
                        <div className="bg-gray-600 px-2 py-1 rounded">
                          <span className="text-xs font-bold text-white">D</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8">
                <FaChess className="text-4xl text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">Loading games...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-black-600 border-t border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {viewMode === "months"
            ? `${sortedArchives.length} months`
            : `${sortedGames.length} games`
          }
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaBolt className="text-yellow-400" /> Bullet
          <FaFire className="text-orange-400" /> Blitz
          <FaClock className="text-blue-400" /> Rapid
        </div>
      </div>
    </div>
  );
};

export default GameModal;
