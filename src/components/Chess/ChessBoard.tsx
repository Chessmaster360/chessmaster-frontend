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

// Convert square notation to grid position (0-7 for both)
const squareToPosition = (square: string): { col: number; row: number } => {
  const col = cols.indexOf(square[0]);
  const row = 8 - parseInt(square[1]);
  return { col, row };
};

// Calculate arrow coordinates
const getArrowCoordinates = (from: string, to: string, squareSize: number) => {
  const fromPos = squareToPosition(from);
  const toPos = squareToPosition(to);

  // Center of each square
  const x1 = (fromPos.col + 0.5) * squareSize;
  const y1 = (fromPos.row + 0.5) * squareSize;
  const x2 = (toPos.col + 0.5) * squareSize;
  const y2 = (toPos.row + 0.5) * squareSize;

  return { x1, y1, x2, y2 };
};

// Main ChessBoard Component
const ChessBoard: React.FC = () => {
  const boardState = useGameStore((state) => state.boardState);
  const metadata = useGameStore((state) => state.metadata);
  const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
  const moves = useGameStore((state) => state.moves);
  const analysisResult = useGameStore((state) => state.analysisResult);

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
  const suggestedMove = currentMove?.suggestedMove;

  // Parse suggested move UCI to get from/to squares
  const getSuggestedMoveSquares = () => {
    if (!suggestedMove?.uci || suggestedMove.uci.length < 4) return null;
    const from = suggestedMove.uci.substring(0, 2);
    const to = suggestedMove.uci.substring(2, 4);
    return { from, to };
  };

  const suggestedSquares = analysisResult ? getSuggestedMoveSquares() : null;

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

          {/* Best Move Arrow Overlay */}
          {suggestedSquares && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 800 800"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M0,0 L10,5 L0,10 L2,5 Z"
                    fill="#22c55e"
                  />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {(() => {
                const coords = getArrowCoordinates(suggestedSquares.from, suggestedSquares.to, 100);

                // Calculate shorter line for arrow (don't go all the way to center)
                const dx = coords.x2 - coords.x1;
                const dy = coords.y2 - coords.y1;
                const length = Math.sqrt(dx * dx + dy * dy);
                const shortenBy = 20;
                const ratio = (length - shortenBy) / length;

                const endX = coords.x1 + dx * ratio;
                const endY = coords.y1 + dy * ratio;

                return (
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={endX}
                    y2={endY}
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                    filter="url(#glow)"
                    opacity="0.9"
                  />
                );
              })()}
            </svg>
          )}
        </div>

        {/* Bottom Player Info */}
        <PlayerInfo name={whitePlayer.name} elo={whitePlayer.elo} position="bottom" />
      </div>
    </div>
  );
};

export default ChessBoard;
