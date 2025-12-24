import React from "react";

interface PlayerInfoProps {
  name: string;
  elo: number;
  position: "top" | "bottom";
  avatarUrl?: string;
  color?: 'white' | 'black';
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, elo, position, avatarUrl, color = 'white' }) => {
  const isBlack = color === 'black';

  return (
    <div
      className={`w-full px-4 py-2 rounded-lg text-white font-semibold shadow-md border ${isBlack
          ? 'bg-gray-900 border-gray-700'
          : 'bg-gray-700 border-gray-500'
        } ${position === "top" ? "rounded-t-lg" : "rounded-b-lg"}`}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Color indicator, Avatar and Name */}
        <div className="flex items-center gap-3">
          {/* Color indicator */}
          <div className={`w-6 h-6 rounded-full border-2 ${isBlack ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-400'
            }`}></div>

          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-8 h-8 rounded-full object-cover border border-green-500"
            />
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isBlack ? 'bg-gray-700 text-gray-300' : 'bg-gray-600 text-white'
              }`}>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-base lg:text-lg font-medium truncate max-w-[180px]">
            {name}
          </span>
        </div>

        {/* Right side - Elo */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Elo:</span>
          <span className="text-sm lg:text-base text-green-400 font-bold">
            {elo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;