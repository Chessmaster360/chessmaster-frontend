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

// Board orientation arrays
const rowsWhite = [8, 7, 6, 5, 4, 3, 2, 1];
const rowsBlack = [1, 2, 3, 4, 5, 6, 7, 8];
const colsWhite = ["a", "b", "c", "d", "e", "f", "g", "h"];
const colsBlack = ["h", "g", "f", "e", "d", "c", "b", "a"];

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
const squareToPosition = (square: string, flipped: boolean): { col: number; row: number } => {
  const cols = flipped ? colsBlack : colsWhite;
  const col = cols.indexOf(square[0]);
  const row = parseInt(square[1]) - 1;
  return { col, row: flipped ? row : 7 - row };
};

// Calculate arrow coordinates
const getArrowCoordinates = (from: string, to: string, squareSize: number, flipped: boolean) => {
  const fromPos = squareToPosition(from, flipped);
  const toPos = squareToPosition(to, flipped);

  return {
    x1: fromPos.col * squareSize + squareSize / 2,
    y1: fromPos.row * squareSize + squareSize / 2,
    x2: toPos.col * squareSize + squareSize / 2,
    y2: toPos.row * squareSize + squareSize / 2,
  };
};

const ChessBoard: React.FC = () => {
  const boardState = useGameStore((state) => state.boardState);
  const metadata = useGameStore((state) => state.metadata);
  const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
  const moves = useGameStore((state) => state.moves);
  const analysisResult = useGameStore((state) => state.analysisResult);
  const boardFlipped = useGameStore((state) => state.boardFlipped);

  // Board orientation based on flipped state
  const rows = boardFlipped ? rowsBlack : rowsWhite;
  const cols = boardFlipped ? colsBlack : colsWhite;

  // Get player info from metadata or defaults
  const blackPlayer = {
    name: metadata?.black || "Black Pieces",
    elo: metadata?.blackElo || 0,
  };
  const whitePlayer = {
    name: metadata?.white || "White Pieces",
    elo: metadata?.whiteElo || 0,
  };

  // Determine which player is on top/bottom based on board orientation
  const topPlayer = boardFlipped ? whitePlayer : blackPlayer;
  const bottomPlayer = boardFlipped ? blackPlayer : whitePlayer;
  const topPlayerColor = boardFlipped ? 'white' : 'black';
  const bottomPlayerColor = boardFlipped ? 'black' : 'white';

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
    <div className="flex items-start w-full justify-center gap-2">
      {/* Evaluation Bar - flip if board is flipped */}
      <EvaluationBar flipped={boardFlipped} />

      {/* Chessboard with Player Info and Coordinates */}
      <div className="relative w-full max-w-[calc(100vw-48px)] sm:max-w-[580px]">
        {/* Top Player Info */}
        <PlayerInfo
          name={topPlayer.name}
          elo={topPlayer.elo}
          position="top"
          color={topPlayerColor}
        />

        {/* Board container with rank labels */}
        <div className="flex">
          {/* Rank labels (numbers 1-8) on left */}
          <div className="flex flex-col justify-around pr-1 text-xs sm:text-sm text-gray-400 font-semibold select-none">
            {rows.map((row) => (
              <span key={row} className="h-[calc((100vw-64px)/8)] sm:h-[72.5px] flex items-center justify-center">
                {row}
              </span>
            ))}
          </div>

          {/* Board and file labels */}
          <div className="flex-1">
            {/* Chessboard - Square aspect ratio */}
            <div className="grid grid-cols-8 aspect-square w-full border border-black-200 relative">
              {rows.map((row, rowIndex) =>
                cols.map((col) => {
                  const square = `${col}${row}`;
                  const originalColIndex = colsWhite.indexOf(col); // Use original index for color calculation
                  const isDark = (row + originalColIndex) % 2 !== 0;
                  const piece = boardState[square];
                  const pieceImage = getPieceImage(piece);
                  const squareImage = isDark ? squareImages.dark : squareImages.light;

                  // Highlight last move squares
                  const isFromSquare = lastMove?.from === square;
                  const isToSquare = lastMove?.to === square;
                  const isHighlighted = isFromSquare || isToSquare;

                  // Show classification icon on the destination square
                  const showClassificationIcon = isToSquare && currentClassification && classificationIcons[currentClassification];

                  // Show file label on bottom row, rank label on rightmost column
                  const isBottomRow = rowIndex === 7;

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
                      {/* File label on bottom row */}
                      {isBottomRow && (
                        <span className={`absolute bottom-0.5 right-1 text-[10px] sm:text-xs font-bold select-none ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
                          {col}
                        </span>
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
                    const coords = getArrowCoordinates(suggestedSquares.from, suggestedSquares.to, 100, boardFlipped);

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
          </div>
        </div>

        {/* Bottom Player Info */}
        <PlayerInfo
          name={bottomPlayer.name}
          elo={bottomPlayer.elo}
          position="bottom"
          color={bottomPlayerColor}
        />
      </div>
    </div>
  );
};

export default ChessBoard;
