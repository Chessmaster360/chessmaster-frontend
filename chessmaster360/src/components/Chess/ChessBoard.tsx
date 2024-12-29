import React from "react";
import EvaluationBar from "./EvaluationBar";
import PlayerInfo from "./PlayerInfo";

// Define the initial position of the pieces
const initialBoard: Record<string, string> = {
  A1: "whiteRook", B1: "whiteKnight", C1: "whiteBishop", D1: "whiteQueen",
  E1: "whiteKing", F1: "whiteBishop", G1: "whiteKnight", H1: "whiteRook",
  A2: "whitePawn", B2: "whitePawn", C2: "whitePawn", D2: "whitePawn",
  E2: "whitePawn", F2: "whitePawn", G2: "whitePawn", H2: "whitePawn",
  A7: "blackPawn", B7: "blackPawn", C7: "blackPawn", D7: "blackPawn",
  E7: "blackPawn", F7: "blackPawn", G7: "blackPawn", H7: "blackPawn",
  A8: "blackRook", B8: "blackKnight", C8: "blackBishop", D8: "blackQueen",
  E8: "blackKing", F8: "blackBishop", G8: "blackKnight", H8: "blackRook",
};

const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Paths to the piece images
const pieceImages: Record<string, string> = {
  whitePawn: "/assets/board_pieces/white_pawn.png",
  whiteRook: "/assets/board_pieces/white_rook.png",
  whiteKnight: "/assets/board_pieces/white_knight.png",
  whiteBishop: "/assets/board_pieces/white_bishop.png",
  whiteQueen: "/assets/board_pieces/white_queen.png",
  whiteKing: "/assets/board_pieces/white_king.png",
  blackPawn: "/assets/board_pieces/black_pawn.png",
  blackRook: "/assets/board_pieces/black_rook.png",
  blackKnight: "/assets/board_pieces/black_knight.png",
  blackBishop: "/assets/board_pieces/black_bishop.png",
  blackQueen: "/assets/board_pieces/black_queen.png",
  blackKing: "/assets/board_pieces/black_king.png",
};

// Paths to square images
const squareImages = {
  light: "/assets/board_pieces/square_brown_light.png",
  dark: "/assets/board_pieces/square_brown_dark.png",
};

// Main ChessBoard Component
const ChessBoard: React.FC = () => {
  const blackPlayer = { name: "Hikaru Nakamura", elo: 2804 };
  const whitePlayer = { name: "Magnus Carlsen", elo: 2834 };

  return (
    <div className="flex items-center justify-center space-x-4 mt-16">
      {/* Evaluation Bar */}
      <EvaluationBar />

      {/* Chessboard with Player Info */}
      <div className="relative w-[480px]">
        {/* Player Info Components */}
        <PlayerInfo name={blackPlayer.name} elo={blackPlayer.elo} position="top" />
        <PlayerInfo name={whitePlayer.name} elo={whitePlayer.elo} position="bottom" />

        {/* Chessboard */}
        <div className="grid grid-cols-8 gap-0 w-[480px] h-[480px] border-2 border-gray-600 relative">
          {rows.map((row) =>
            cols.map((col) => {
              const square = `${col}${row}`;
              const isDark = (row + cols.indexOf(col)) % 2 !== 0; // Alternate square colors
              const piece = initialBoard[square];
              const squareImage = isDark ? squareImages.dark : squareImages.light;

              return (
                <div
                  key={square}
                  className="relative w-full h-full"
                  style={{
                    backgroundImage: `url(${squareImage})`,
                    backgroundSize: "cover",
                  }}
                >
                  {piece && (
                    <img
                      src={pieceImages[piece]}
                      alt={piece}
                      className="absolute inset-0 w-[90%] h-[90%] object-contain m-auto"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};


export default ChessBoard;
