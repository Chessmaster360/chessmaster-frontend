import React from "react";
import Navbar from "../components/Bars/Navbar";
import ChessBoard from "../components/Chess/ChessBoard";
import GameReport from "../components/Chess/GameReport";
import Controls from "../components/Chess/Controls";

const AnalyzeScreen: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">

      {/* Main Content */}
      <div className="flex-1 flex p-4 space-x-4">
        {/* Chessboard Section */}
        <div className="flex-1 flex flex-col">
          <ChessBoard />
          <Controls />
        </div>

        {/* Sidebar Section */}
        <div className="w-80">
          <GameReport />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeScreen;
