import React from "react";

// Player Info Component
const PlayerInfo: React.FC<{ name: string; elo: number; position: "top" | "bottom" }> = ({ name, elo, position }) => {
    return (
      <div
        className={`absolute w-full p-3 rounded text-center ${
          position === "top" ? "top-0 transform -translate-y-full" : "bottom-0 translate-y-full"
        } bg-black-600 text-white font-semibold shadow-md`}
      >
        <p className="text-lg">{name}</p>
        <p className="text-sm text-gray-400">Elo: {elo}</p>
      </div>
    );
  };
  

  export default PlayerInfo;