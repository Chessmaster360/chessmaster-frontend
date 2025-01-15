import React, { useState } from "react";

interface Game {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  pgn: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  games: Game[];
  archives: string[]; // Lista de meses
  onMonthSelect: (month: string) => void; // Función para seleccionar un mes
  onSelectGame: (pgn: string) => void; // Función para seleccionar una partida
}

const GameModal: React.FC<ModalProps> = ({
  show,
  onClose,
  games,
  archives,
  onMonthSelect,
  onSelectGame,
}) => {
  const [viewMode, setViewMode] = useState<"months" | "games">("months"); // Alternar entre vista de meses y partidas
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // Mes seleccionado

  if (!show) return null;

  // Ordenar meses (más reciente primero)
  const sortedArchives = [...archives].sort((a, b) => (a > b ? -1 : 1));

  // Ordenar partidas (más reciente primero)
  const sortedGames = [...games].reverse();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded w-11/12 max-w-[600px] h-3/4 overflow-y-auto relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
          <h3 className="text-lg font-semibold">
            {viewMode === "months" ? "Select a Month" : `Games for ${selectedMonth}`}
          </h3>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>

        {/* Content */}
        {viewMode === "months" ? (
          // Mostrar lista de meses ordenada
          <ul className="space-y-2">
            {sortedArchives.length > 0 ? (
              sortedArchives.map((archive, index) => {
                const [year, month] = archive.split("/").slice(-2);
                const formattedMonth = `${year}-${month}`;
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedMonth(formattedMonth); // Guardar el mes seleccionado
                      setViewMode("games"); // Cambiar a la vista de partidas
                      onMonthSelect(formattedMonth); // Llamar a la función para cargar las partidas
                    }}
                  >
                    <span className="text-sm">{formattedMonth}</span>
                  </li>
                );
              })
            ) : (
              <p className="text-center text-gray-400">No months available.</p>
            )}
          </ul>
        ) : (
          // Mostrar lista de partidas ordenada
          <ul className="space-y-2">
            {sortedGames.length > 0 ? (
              sortedGames.map((game, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
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
        )}

        {/* Botón para volver a la lista de meses */}
        {viewMode === "games" && (
          <button
            onClick={() => setViewMode("months")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Months
          </button>
        )}
      </div>
    </div>
  );
};

export default GameModal;
