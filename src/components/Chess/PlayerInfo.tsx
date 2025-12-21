import React from "react";

// Player Info Component
const PlayerInfo: React.FC<{ name: string; elo: number; position: "top" | "bottom" }> = ({ name, elo, position }) => {
  return (
    <div
      className={`w-full p-2 rounded text-center bg-gray-800 text-white font-semibold shadow-md border border-gray-700 ${position === "top" ? "flex justify-end" : "flex justify-start"}`}
    >
      <div className="flex items-center justify-between px-4">
        <p className="text-base lg:text-lg">{name}</p>
        <p className="text-xs lg:text-sm text-gray-400">Elo: {elo}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;