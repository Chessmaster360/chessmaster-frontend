import React from "react";

interface PlayerInfoProps {
  name: string;
  elo: number;
  position: "top" | "bottom";
  avatarUrl?: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, elo, position, avatarUrl }) => {
  return (
    <div
      className={`w-full px-4 py-2 rounded-lg text-white font-semibold shadow-md border border-gray-700 bg-gray-800 ${position === "top" ? "rounded-t-lg" : "rounded-b-lg"
        }`}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Avatar and Name */}
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-8 h-8 rounded-full object-cover border border-green-500"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-base lg:text-lg font-medium truncate max-w-[150px]">
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