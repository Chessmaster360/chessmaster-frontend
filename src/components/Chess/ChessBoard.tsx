import React from "react";
import EvaluationBar from "./EvaluationBar";
import PlayerInfo from "./PlayerInfo";
import { useGameStore, ChessPiece } from "../../store/useGameStore";

// Import classification icons
import BrilliantIcon from "../../assets/Moves/Brilliant.png";
import GreatIcon from "../../assets/Moves/Great.png";
import BestIcon from "../../assets/Moves/Best.png";
import ExcellentIcon from "../../assets/Moves/Excellent.png";
import GoodIcon from "../../assets/Moves/Good.png";
import BookIcon from "../../assets/Moves/Book.png";
import InaccuracyIcon from "../../assets/Moves/Inaccuracy.png";
import MistakeIcon from "../../assets/Moves/Mistake.png";
import MissIcon from "../../assets/Moves/Miss.png";
import BlunderIcon from "../../assets/Moves/Blunder.png";

// Classification icons mapping
const classificationIcons: Record<string, string> = {
  brilliant: BrilliantIcon,
  great: GreatIcon,
  best: BestIcon,
  excellent: ExcellentIcon,
  good: GoodIcon,
  book: BookIcon,
  inaccuracy: InaccuracyIcon,
  mistake: MistakeIcon,
  miss: MissIcon,
  blunder: BlunderIcon,
};

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

  // Get the last move for highlighting and classification
  const currentMove = currentMoveIndex >= 0 ? moves[currentMoveIndex] : null;
  const lastMove = currentMove?.move || null;
  const currentClassification = currentMove?.classification;

  return (
    <div className="flex items-start gap-4 mt-16 mb-16">
      {/* Evaluation Bar */}
      <EvaluationBar />

      {/* Chessboard with Player Info */}
      <div className="relative w-full max-w-[580px]">
        {/* Top Player Info */}
        <PlayerInfo name={blackPlayer.name} elo={blackPlayer.elo} position="top" />

        {/* Chessboard - Square aspect ratio */}
        <div className="grid grid-cols-8 aspect-square w-full sm:w-[580px] sm:h-[580px] border border-black-200 relative">
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

              // Show classification icon on the destination square
              const showClassificationIcon = isToSquare && currentClassification && classificationIcons[currentClassification];

              return (
                <div
                  key={square}
                  className={`relative aspect-square ${isHighlighted ? 'ring-2 ring-yellow-400 ring-inset' : ''}`}
                  style={{
                    backgroundImage: `url(${squareImage})`,
                    backgroundSize: "cover",
                  }}
                >
                  {pieceImage && (
                    <img
                      src={pieceImage}
                      alt={`${piece?.color === 'w' ? 'White' : 'Black'} ${piece?.type}`}
                      className="absolute inset-0 w-[90%] h-[90%] object-contain m-auto"
                    />
                  )}
                  {/* Classification badge on destination square */}
                  {showClassificationIcon && (
                    <img
                      src={classificationIcons[currentClassification]}
                      alt={currentClassification}
                      className="absolute -top-1 -right-1 w-4 h-4 lg:w-6 lg:h-6 z-10 drop-shadow-lg"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Player Info */}
        <PlayerInfo name={whitePlayer.name} elo={whitePlayer.elo} position="bottom" />
      </div>
    </div>
  );
};

export default ChessBoard;
