import React from "react";
import { useGameStore, Classification } from "../../store/useGameStore";

// Import classification icons properly for Vite
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

// Display order for classifications (including book)
const classificationOrder: Classification[] = [
    'brilliant',
    'great',
    'best',
    'excellent',
    'good',
    'book',
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

// Helper to parse game result
const getResultDisplay = (result: string, whiteName: string, blackName: string) => {
    if (result === "1-0") {
        return { text: `${whiteName} wins`, icon: "🏆", whiteWon: true, blackWon: false, draw: false };
    } else if (result === "0-1") {
        return { text: `${blackName} wins`, icon: "🏆", whiteWon: false, blackWon: true, draw: false };
    } else if (result === "1/2-1/2") {
        return { text: "Draw", icon: "🤝", whiteWon: false, blackWon: false, draw: true };
    }
    return { text: "Unknown", icon: "❓", whiteWon: false, blackWon: false, draw: false };
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
    const whiteName = metadata?.white || 'White';
    const blackName = metadata?.black || 'Black';
    const result = metadata?.result || '*';
    const resultDisplay = getResultDisplay(result, whiteName, blackName);

    return (
        <div className="bg-black-600 rounded-lg p-4 text-white mt-4">
            {/* Header with Result */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
                <div className="flex items-center gap-2">
                    <img src={classificationIcons.best} alt="Star" className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Game Review</h2>
                </div>
                {/* Game Result Badge */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${resultDisplay.draw
                        ? 'bg-gray-600 text-gray-200'
                        : resultDisplay.whiteWon
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-800 text-gray-200'
                    }`}>
                    <span>{resultDisplay.icon}</span>
                    <span>{resultDisplay.text}</span>
                </div>
            </div>

            {/* Column Headers - White and Black */}
            <div className="grid grid-cols-3 gap-2 mb-2">
                <div></div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white border border-gray-400"></div>
                        <span className="text-xs text-gray-400 font-medium">WHITE</span>
                    </div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-800 border border-gray-600"></div>
                        <span className="text-xs text-gray-400 font-medium">BLACK</span>
                    </div>
                </div>
            </div>

            {/* Players and Accuracy */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-left text-gray-400 text-sm">Accuracy</div>
                <div className="text-center">
                    <div className={`text-xl font-bold ${resultDisplay.whiteWon ? 'text-green-400' : 'text-white'}`}>
                        {accuracies.white.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{whiteName}</div>
                    {resultDisplay.whiteWon && <span className="text-xs text-green-400">Winner</span>}
                </div>
                <div className="text-center">
                    <div className={`text-xl font-bold ${resultDisplay.blackWon ? 'text-green-400' : 'text-gray-300'}`}>
                        {accuracies.black.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{blackName}</div>
                    {resultDisplay.blackWon && <span className="text-xs text-green-400">Winner</span>}
                </div>
            </div>

            {/* Classification Table */}
            <div className="space-y-1">
                {classificationOrder.map((classification) => {
                    const whiteCount = classifications.white[classification] || 0;
                    const blackCount = classifications.black[classification] || 0;

                    // Skip if both are 0
                    if (whiteCount === 0 && blackCount === 0) {
                        return null;
                    }

                    const icon = classificationIcons[classification];

                    return (
                        <div
                            key={classification}
                            className="grid grid-cols-3 items-center py-1 hover:bg-black-200 rounded px-2"
                        >
                            <div className="text-gray-400 text-sm">
                                {classificationNames[classification]}
                            </div>
                            {/* White player count WITH icon */}
                            <div className="flex items-center justify-center gap-1">
                                <span className="font-medium text-sm">
                                    {whiteCount > 0 ? whiteCount : '-'}
                                </span>
                                {whiteCount > 0 && icon && (
                                    <img src={icon} alt={classification} className="w-4 h-4" />
                                )}
                            </div>
                            {/* Black player count WITH icon */}
                            <div className="flex items-center justify-center gap-1">
                                {blackCount > 0 && icon && (
                                    <img src={icon} alt={classification} className="w-4 h-4" />
                                )}
                                <span className="font-medium text-sm">
                                    {blackCount > 0 ? blackCount : '-'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Game Rating (ELO) */}
            {metadata && (metadata.whiteElo > 0 || metadata.blackElo > 0) && (
                <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-700 mt-3">
                    <div className="text-gray-400 text-sm">ELO</div>
                    <div className="text-center">
                        <span className="bg-black-200 px-2 py-1 rounded text-sm font-bold">
                            {metadata.whiteElo}
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="bg-black-200 px-2 py-1 rounded text-sm font-bold">
                            {metadata.blackElo}
                        </span>
                    </div>
                </div>
            )}

            {/* Start Review Button */}
            {onStartReview && (
                <button
                    onClick={onStartReview}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors"
                >
                    Start Review
                </button>
            )}
        </div>
    );
};

export default GameReviewSummary;
