import React from "react";
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

// Display order for classifications
const classificationOrder: Classification[] = [
    'brilliant',
    'great',
    'best',
    'excellent',
    'good',
    'inaccuracy',
    'mistake',
    'miss',
    'blunder',
];

// Classification display names
const classificationNames: Record<Classification, string> = {
    brilliant: "Brilliant",
    great: "Great",
    best: "Best",
    excellent: "Excellent",
    good: "Good",
    book: "Book",
    inaccuracy: "Inaccuracy",
    mistake: "Mistake",
    miss: "Miss",
    blunder: "Blunder",
    forced: "Forced",
};

interface GameReviewSummaryProps {
    onStartReview?: () => void;
}

const GameReviewSummary: React.FC<GameReviewSummaryProps> = ({ onStartReview }) => {
    const analysisResult = useGameStore((state) => state.analysisResult);
    const metadata = useGameStore((state) => state.metadata);

    if (!analysisResult) {
        return null;
    }

    const { accuracies, classifications } = analysisResult;

    return (
        <div className="bg-gray-900 rounded-lg p-6 text-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <img src={classificationIcons.best} alt="Star" className="w-6 h-6" />
                <h2 className="text-xl font-bold">Game Review</h2>
            </div>

            {/* Players and Accuracy */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-left text-gray-400">Accuracy</div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                        {accuracies.white.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400">{metadata?.white || 'White'}</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-300">
                        {accuracies.black.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400">{metadata?.black || 'Black'}</div>
                </div>
            </div>

            {/* Classification Table */}
            <div className="space-y-2 mb-6">
                {classificationOrder.map((classification) => {
                    const whiteCount = classifications.white[classification] || 0;
                    const blackCount = classifications.black[classification] || 0;

                    // Skip if both are 0
                    if (whiteCount === 0 && blackCount === 0) {
                        return null;
                    }

                    return (
                        <div
                            key={classification}
                            className="grid grid-cols-3 items-center py-1 hover:bg-gray-800 rounded px-2"
                        >
                            <div className="text-gray-400 text-sm">
                                {classificationNames[classification]}
                            </div>
                            <div className="text-center font-medium">
                                {whiteCount > 0 ? whiteCount : '-'}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <img
                                    src={classificationIcons[classification]}
                                    alt={classification}
                                    className="w-5 h-5"
                                />
                                <span className="font-medium">
                                    {blackCount > 0 ? blackCount : '-'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Game Rating (ELO) */}
            {metadata && (metadata.whiteElo > 0 || metadata.blackElo > 0) && (
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-700">
                    <div className="text-gray-400 text-sm">Game Rating</div>
                    <div className="text-center">
                        <span className="bg-gray-800 px-3 py-1 rounded font-bold">
                            {metadata.whiteElo}
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="bg-gray-800 px-3 py-1 rounded font-bold">
                            {metadata.blackElo}
                        </span>
                    </div>
                </div>
            )}

            {/* Start Review Button */}
            {onStartReview && (
                <button
                    onClick={onStartReview}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                    Start Review
                </button>
            )}
        </div>
    );
};

export default GameReviewSummary;
