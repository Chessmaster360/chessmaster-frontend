import { create } from 'zustand';
import { Chess, Move } from 'chess.js';

// Types for piece representation
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

// Move classification types matching backend
export type Classification =
    | 'brilliant'
    | 'great'
    | 'best'
    | 'excellent'
    | 'good'
    | 'inaccuracy'
    | 'mistake'
    | 'blunder'
    | 'book'
    | 'forced'
    | 'miss';

export interface ChessPiece {
    type: PieceType;
    color: PieceColor;
}

export interface BoardState {
    [square: string]: ChessPiece | null;
}

export interface MoveWithAnalysis {
    move: Move;
    fen: string;
    evaluation?: number;
    bestMove?: string;
    classification?: Classification;
    suggestedMove?: { san: string; uci: string };
}

export interface GameMetadata {
    white: string;
    black: string;
    whiteElo: number;
    blackElo: number;
    result: string;
    event: string;
    date: string;
}

// Analysis result from backend
export interface AnalysisResult {
    positions: Array<{
        fen: string;
        move: { san: string; uci: string };
        evaluation: { type: 'cp' | 'mate'; value: number };
        classification: Classification;
        suggestedMove: { san: string; uci: string };
    }>;
    accuracies: {
        white: number;
        black: number;
    };
    classifications: {
        white: Record<Classification, number>;
        black: Record<Classification, number>;
    };
}

interface GameState {
    // Game data
    chess: Chess;
    pgn: string;
    moves: MoveWithAnalysis[];
    currentMoveIndex: number;
    metadata: GameMetadata | null;

    // Board state derived from current position
    boardState: BoardState;

    // Analysis state
    isAnalyzing: boolean;
    currentEvaluation: number;
    analysisResult: AnalysisResult | null;

    // Actions
    loadPGN: (pgn: string) => boolean;
    goToMove: (index: number) => void;
    nextMove: () => void;
    prevMove: () => void;
    firstMove: () => void;
    lastMove: () => void;
    reset: () => void;
    setAnalysis: (moveIndex: number, evaluation: number, bestMove?: string) => void;
    setIsAnalyzing: (analyzing: boolean) => void;
    setAnalysisResult: (result: AnalysisResult) => void;
}

// Helper to convert chess.js board to our BoardState format
const chessToBoardState = (chess: Chess): BoardState => {
    const board = chess.board();
    const state: BoardState = {};

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            const square = `${files[file]}${8 - rank}`;
            state[square] = piece ? { type: piece.type, color: piece.color } : null;
        }
    }

    return state;
};

// Parse metadata from PGN headers
const parseMetadata = (chess: Chess): GameMetadata => {
    const header = chess.header();
    return {
        white: header['White'] || 'Unknown',
        black: header['Black'] || 'Unknown',
        whiteElo: parseInt(header['WhiteElo'] || '0'),
        blackElo: parseInt(header['BlackElo'] || '0'),
        result: header['Result'] || '*',
        event: header['Event'] || '',
        date: header['Date'] || '',
    };
};

const initialChess = new Chess();

export const useGameStore = create<GameState>((set, get) => ({
    // Initial state
    chess: initialChess,
    pgn: '',
    moves: [],
    currentMoveIndex: -1, // -1 means starting position (before any moves)
    metadata: null,
    boardState: chessToBoardState(initialChess),
    isAnalyzing: false,
    currentEvaluation: 0,
    analysisResult: null,

    // Load a PGN and parse all moves
    loadPGN: (pgn: string) => {
        const chess = new Chess();

        try {
            chess.loadPgn(pgn);
        } catch (e) {
            console.error('Failed to load PGN:', e);
            return false;
        }

        // Get all moves with their resulting positions
        const history = chess.history({ verbose: true });
        const moves: MoveWithAnalysis[] = [];

        // Replay the game to get FEN at each position
        const replayChess = new Chess();
        for (const move of history) {
            replayChess.move(move.san);
            moves.push({
                move,
                fen: replayChess.fen(),
            });
        }

        const metadata = parseMetadata(chess);

        // Reset to starting position
        const startingChess = new Chess();

        set({
            chess: startingChess,
            pgn,
            moves,
            currentMoveIndex: -1,
            metadata,
            boardState: chessToBoardState(startingChess),
            currentEvaluation: 0,
        });

        return true;
    },

    // Go to a specific move
    goToMove: (index: number) => {
        const { moves } = get();

        // Clamp index to valid range
        const targetIndex = Math.max(-1, Math.min(index, moves.length - 1));

        const chess = new Chess();

        // Replay moves up to target index
        for (let i = 0; i <= targetIndex; i++) {
            chess.move(moves[i].move.san);
        }

        set({
            chess,
            currentMoveIndex: targetIndex,
            boardState: chessToBoardState(chess),
            currentEvaluation: moves[targetIndex]?.evaluation ?? 0,
        });
    },

    // Navigate one move forward
    nextMove: () => {
        const { currentMoveIndex, moves } = get();
        if (currentMoveIndex < moves.length - 1) {
            get().goToMove(currentMoveIndex + 1);
        }
    },

    // Navigate one move backward
    prevMove: () => {
        const { currentMoveIndex } = get();
        if (currentMoveIndex >= 0) {
            get().goToMove(currentMoveIndex - 1);
        }
    },

    // Go to starting position
    firstMove: () => {
        get().goToMove(-1);
    },

    // Go to final position
    lastMove: () => {
        const { moves } = get();
        get().goToMove(moves.length - 1);
    },

    // Reset the store
    reset: () => {
        const chess = new Chess();
        set({
            chess,
            pgn: '',
            moves: [],
            currentMoveIndex: -1,
            metadata: null,
            boardState: chessToBoardState(chess),
            isAnalyzing: false,
            currentEvaluation: 0,
        });
    },

    // Set analysis results for a move
    setAnalysis: (moveIndex: number, evaluation: number, bestMove?: string) => {
        const { moves, currentMoveIndex } = get();
        if (moveIndex >= 0 && moveIndex < moves.length) {
            const updatedMoves = [...moves];
            updatedMoves[moveIndex] = {
                ...updatedMoves[moveIndex],
                evaluation,
                bestMove,
            };
            set({
                moves: updatedMoves,
                currentEvaluation: moveIndex === currentMoveIndex ? evaluation : get().currentEvaluation,
            });
        }
    },

    // Set analyzing state
    setIsAnalyzing: (analyzing: boolean) => {
        set({ isAnalyzing: analyzing });
    },

    // Set full analysis result from backend
    setAnalysisResult: (result: AnalysisResult) => {
        const { moves } = get();

        // Update moves with analysis data
        const updatedMoves = moves.map((move, index) => {
            const analysisPosition = result.positions[index];
            if (analysisPosition) {
                return {
                    ...move,
                    evaluation: analysisPosition.evaluation.type === 'mate'
                        ? (analysisPosition.evaluation.value > 0 ? 10000 : -10000)
                        : analysisPosition.evaluation.value,
                    classification: analysisPosition.classification,
                    suggestedMove: analysisPosition.suggestedMove,
                };
            }
            return move;
        });

        set({
            moves: updatedMoves,
            analysisResult: result,
            isAnalyzing: false,
        });
    },
}));
