import React from "react";
import chessboard from "../../assets/chessboard/orange-board.png";

const ChessBoard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Chessboard image */}
      <div
        className="w-full max-w-[500px] h-0 pb-[100%] bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${chessboard})`,
        }}
      />
      {/* Placeholder for future interactivity */}
      <p className="text-center mt-4 text-sm text-gray-300">
        [Interactive Board Coming Soon]
      </p>
    </div>
  );
};

export default ChessBoard;
