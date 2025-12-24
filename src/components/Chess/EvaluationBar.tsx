import React from "react";
import { useGameStore } from "../../store/useGameStore";

interface EvaluationBarProps {
  flipped?: boolean;
}

// Convert centipawn evaluation to percentage (clamped between 5% and 95%)
const evaluationToPercent = (evaluation: number): number => {
  const maxEval = 500;
  const normalized = Math.max(-maxEval, Math.min(maxEval, evaluation));
  const percent = 50 + (normalized / maxEval) * 45;
  return Math.max(5, Math.min(95, percent));
};

// Format evaluation for display
const formatEvaluation = (evaluation: number): string => {
  const pawns = evaluation / 100;
  if (pawns >= 0) {
    return `+${pawns.toFixed(1)}`;
  }
  return pawns.toFixed(1);
};

// Evaluation Bar Component
const EvaluationBar: React.FC<EvaluationBarProps> = ({ flipped = false }) => {
  const currentEvaluation = useGameStore((state) => state.currentEvaluation);
  const isAnalyzing = useGameStore((state) => state.isAnalyzing);
  const moves = useGameStore((state) => state.moves);

  const hasAnalysis = moves.some(m => m.evaluation !== undefined);
  const whitePercent = hasAnalysis ? evaluationToPercent(currentEvaluation) : 50;
  const blackPercent = 100 - whitePercent;

  // When flipped, swap the bar positions
  const topPercent = flipped ? whitePercent : blackPercent;
  const bottomPercent = flipped ? blackPercent : whitePercent;
  const topColor = flipped ? "bg-gradient-to-b from-green-400 to-green-500" : "bg-gradient-to-b from-red-600 to-red-500";
  const bottomColor = flipped ? "bg-gradient-to-b from-red-600 to-red-500" : "bg-gradient-to-b from-green-400 to-green-500";

  return (
    <div className="relative w-6 flex-shrink-0 self-stretch flex flex-col bg-gray-700">
      {/* Evaluation display */}
      {hasAnalysis && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 px-1 py-0.5 rounded text-xs font-mono text-white whitespace-nowrap">
          {formatEvaluation(currentEvaluation)}
        </div>
      )}

      {/* Top Bar */}
      <div
        className={`w-full ${topColor} transition-all duration-300`}
        style={{ height: `${topPercent}%` }}
      />

      {/* Bottom Bar */}
      <div
        className={`w-full ${bottomColor} transition-all duration-300`}
        style={{ height: `${bottomPercent}%` }}
      />

      {/* Loading indicator */}
      {isAnalyzing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
};

export default EvaluationBar;
