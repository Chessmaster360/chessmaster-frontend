import React from "react";
import ChessBoard from "../components/Chess/ChessBoard";
import GameReport from "../components/Chess/GameReport";
import Controls from "../components/Chess/Controls";

const AnalyzeScreen: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center lg:items-start justify-center gap-8 p-6 max-w-screen-lg mx-auto">
      {/* Chess Board */}
      <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg lg:mr-6">
        <ChessBoard />
      </div>

      {/* Game Report + Controls */}
      <div className="flex flex-col flex-1 w-full max-w-md space-y-0">
        <GameReport />
        <Controls />
      </div>
    </div>
  );
};


export default AnalyzeScreen;
