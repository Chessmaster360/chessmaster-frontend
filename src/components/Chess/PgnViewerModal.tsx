import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGameStore, Classification } from "../../store/useGameStore";

// Classification icons from assets
const classificationIcons: Record<string, string> = {
    brilliant: "/assets/Moves/Brilliant.png",
    great: "/assets/Moves/Great.png",
    best: "/assets/Moves/Best.png",
    excellent: "/assets/Moves/Excellent.png",
    good: "/assets/Moves/Good.png",
    book: "/assets/Moves/Book.png",
    inaccuracy: "/assets/Moves/Inaccuracy.png",
    mistake: "/assets/Moves/Mistake.png",
    miss: "/assets/Moves/Miss.png",
    blunder: "/assets/Moves/Blunder.png",
};

// Classification colors for move text
const classificationColors: Record<Classification, string> = {
    brilliant: "text-cyan-400",
    great: "text-teal-400",
    best: "text-green-400",
    excellent: "text-green-300",
    good: "text-gray-300",
    book: "text-amber-400",
    inaccuracy: "text-yellow-400",
    mistake: "text-orange-400",
    miss: "text-red-400",
    blunder: "text-red-500",
    forced: "text-gray-400",
};

interface PgnViewerModalProps {
    show: boolean;
    onClose: () => void;
}

const PgnViewerModal: React.FC<PgnViewerModalProps> = ({ show, onClose }) => {
    const moves = useGameStore((state) => state.moves);
    const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
    const goToMove = useGameStore((state) => state.goToMove);
    const metadata = useGameStore((state) => state.metadata);
    const analysisResult = useGameStore((state) => state.analysisResult);

    if (!show) return null;

    // Check if analysis is available
    const hasAnalysis = analysisResult !== null;

    // Group moves into pairs (white, black)
    const movePairs: {
        number: number;
        white: { san: string; classification?: Classification };
        black?: { san: string; classification?: Classification };
    }[] = [];

    for (let i = 0; i < moves.length; i += 2) {
        movePairs.push({
            number: Math.floor(i / 2) + 1,
            white: {
                san: moves[i]?.move.san || '',
                classification: moves[i]?.classification,
            },
            black: moves[i + 1] ? {
                san: moves[i + 1].move.san,
                classification: moves[i + 1].classification,
            } : undefined,
        });
    }

    // Render move with optional classification icon
    const renderMove = (
        move: { san: string; classification?: Classification },
        moveIndex: number
    ) => {
        const colorClass = move.classification
            ? classificationColors[move.classification]
            : 'text-white';

        const isActive = currentMoveIndex === moveIndex;
        const icon = move.classification ? classificationIcons[move.classification] : null;

        return (
            <button
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${isActive
                        ? 'bg-green-600 text-white'
                        : `hover:bg-gray-700 ${colorClass}`
                    }`}
                onClick={() => goToMove(moveIndex)}
            >
                {icon && hasAnalysis && (
                    <img src={icon} alt={move.classification} className="w-4 h-4" />
                )}
                <span>{move.san}</span>
            </button>
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-[500px] max-h-[80vh] flex flex-col shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <div>
                        <h3 className="text-lg font-semibold">Move List</h3>
                        {metadata && (
                            <p className="text-sm text-gray-400">
                                {metadata.white} vs {metadata.black}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Move list */}
                <div className="flex-1 overflow-y-auto">
                    {movePairs.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-gray-900">
                                <tr className="text-gray-400">
                                    <th className="w-12 text-left py-2">#</th>
                                    <th className="text-left py-2">White</th>
                                    <th className="text-left py-2">Black</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movePairs.map((pair, pairIndex) => (
                                    <tr key={pair.number} className="hover:bg-gray-800">
                                        <td className="py-1 text-gray-500">{pair.number}.</td>
                                        <td className="py-1">
                                            {renderMove(pair.white, pairIndex * 2)}
                                        </td>
                                        <td className="py-1">
                                            {pair.black && renderMove(pair.black, pairIndex * 2 + 1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 py-8">
                            No game loaded. Select a game to view moves.
                        </p>
                    )}
                </div>

                {/* Result */}
                {metadata?.result && metadata.result !== '*' && (
                    <div className="mt-4 pt-3 border-t border-gray-700 text-center">
                        <span className="text-lg font-bold text-yellow-400">
                            Result: {metadata.result}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PgnViewerModal;
