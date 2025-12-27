import React from "react";
import ChessBoard from "../components/Chess/ChessBoard";
import GameReport from "../components/Chess/GameReport";
import Controls from "../components/Chess/Controls";

const AnalyzeScreen: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black-600 pb-20 lg:pb-0">
      {/* Left Side - Chessboard Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-2 lg:p-4 bg-black-800">
        {/* Chessboard Container */}
        <div className="w-full flex items-center justify-center">
          <ChessBoard />
        </div>
      </div>

      {/* Right Side - Game Report & Controls */}
      <div className="w-full lg:w-[530px] lg:flex-shrink-0 bg-black-700 border-t lg:border-t-0 lg:border-l border-black-500 flex flex-col lg:h-screen">
        {/* Game Report - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <GameReport />
        </div>

        {/* Controls - Fixed at Bottom on Mobile, Normal on Desktop */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black-600 border-t border-black-500 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] lg:static lg:shadow-none">
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeScreen;
