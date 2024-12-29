import React from "react";
import chessboard from "../../assets/chessboard/orange-board.png";

const ChessBoard: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center p-6 md:p-10 lg:p-16">
      <div
        className="w-full max-w-md h-auto bg-center bg-no-repeat bg-contain rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${chessboard})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          aspectRatio: "1 / 1",
        }}
      />
      <p className="text-center mt-4">[Interactive Board Coming Soon]</p>
    </div>
  );
};

export default ChessBoard;
