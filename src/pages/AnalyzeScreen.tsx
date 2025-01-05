import React from "react";
import ChessBoard from "../components/Chess/ChessBoard";
import GameReport from "../components/Chess/GameReport";
import Controls from "../components/Chess/Controls";

const AnalyzeScreen: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center lg:space-x-6 p-4">
      {/* Chess Board */}
      <div className="flex-1 max-w-lg mx-auto lg:mx-0">
        <ChessBoard />
      </div>

      {/* Game Report */}
      <div className="flex flex-col flex-1 max-w-md space-y-4">
        <GameReport />
        <Controls />
      </div>
    </div>
  );
};

export default AnalyzeScreen;
