import React from "react";
import EvaluationBar from "./EvaluationBar";
import PlayerInfo from "./PlayerInfo";
import { useGameStore, ChessPiece } from "../../store/useGameStore";

const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Map chess.js piece notation to image paths
const getPieceImage = (piece: ChessPiece | null): string | null => {
  if (!piece) return null;

  const colorName = piece.color === 'w' ? 'white' : 'black';
  const pieceNames: Record<string, string> = {
    'p': 'pawn',
    'n': 'knight',
    'b': 'bishop',
    'r': 'rook',
    'q': 'queen',
    'k': 'king',
  };

  return `/assets/board_pieces/${colorName}_${pieceNames[piece.type]}.png`;
};

// Square background images
const squareImages = {
  light: "/assets/board_pieces/square_brown_light.png",
  dark: "/assets/board_pieces/square_brown_dark.png",
};

// Main ChessBoard Component
const ChessBoard: React.FC = () => {
  const boardState = useGameStore((state) => state.boardState);
  const metadata = useGameStore((state) => state.metadata);
  const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
  const moves = useGameStore((state) => state.moves);

  // Get player info from metadata or defaults
  const blackPlayer = {
    name: metadata?.black || "Black Pieces",
    elo: metadata?.blackElo || 0,
  };
  const whitePlayer = {
    name: metadata?.white || "White Pieces",
    elo: metadata?.whiteElo || 0,
  };

  // Get the last move for highlighting
  const lastMove = currentMoveIndex >= 0 ? moves[currentMoveIndex]?.move : null;

  return (
    <div className="flex items-start gap-4 mt-16 mb-16">
      {/* Evaluation Bar */}
      <EvaluationBar />

      {/* Chessboard with Player Info */}
      <div className="relative w-full max-w-[480px]">
        {/* Player Info Components */}
        <PlayerInfo name={blackPlayer.name} elo={blackPlayer.elo} position="top" />
        <PlayerInfo name={whitePlayer.name} elo={whitePlayer.elo} position="bottom" />

        {/* Chessboard */}
        <div className="grid grid-cols-8 aspect-square w-full sm:w-[480px] sm:h-[480px] border border-black-200 relative">
          {rows.map((row) =>
            cols.map((col) => {
              const square = `${col}${row}`;
              const colIndex = cols.indexOf(col);
              const isDark = (row + colIndex) % 2 !== 0;
              const piece = boardState[square];
              const pieceImage = getPieceImage(piece);
              const squareImage = isDark ? squareImages.dark : squareImages.light;

              // Highlight last move squares
              const isFromSquare = lastMove?.from === square;
              const isToSquare = lastMove?.to === square;
              const isHighlighted = isFromSquare || isToSquare;

              return (
                <div
                  key={square}
                  className={`relative w-full h-full ${isHighlighted ? 'ring-2 ring-yellow-400 ring-inset' : ''}`}
                  style={{
                    backgroundImage: `url(${squareImage})`,
                    backgroundSize: "cover",
                  }}
                >
                  {pieceImage && (
                    <img
                      src={pieceImage}
                      alt={`${piece?.color === 'w' ? 'White' : 'Black'} ${piece?.type}`}
                      className="absolute inset-0 w-[90%] h-[90%] object-contain m-auto transition-all duration-300 ease-in-out"
                      style={{
                        // Add subtle animation when pieces change
                        animation: isToSquare ? 'pieceMove 0.3s ease-out' : undefined,
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CSS Animation for piece movement - inline style injection */}
      <style>{`
        @keyframes pieceMove {
          0% {
            transform: scale(1.15);
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
          }
          100% {
            transform: scale(1);
            filter: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ChessBoard;
