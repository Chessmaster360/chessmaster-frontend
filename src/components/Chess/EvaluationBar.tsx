import React from "react";
import { useGameStore } from "../../store/useGameStore";

// Convert centipawn evaluation to percentage (clamped between 5% and 95%)
const evaluationToPercent = (evaluation: number): number => {
  // evaluation is in centipawns, where positive = white advantage
  // Convert to a percentage where 50% = equal, 95% = decisive white advantage
  const maxEval = 500; // 5 pawns = decisive advantage
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
const EvaluationBar: React.FC = () => {
  const currentEvaluation = useGameStore((state) => state.currentEvaluation);
  const isAnalyzing = useGameStore((state) => state.isAnalyzing);
  const moves = useGameStore((state) => state.moves);

  // If no game loaded or no analysis, show neutral
  const hasAnalysis = moves.some(m => m.evaluation !== undefined);
  const whitePercent = hasAnalysis ? evaluationToPercent(currentEvaluation) : 50;
  const blackPercent = 100 - whitePercent;

  return (
    <div className="relative w-4 h-[318px] sm:w-6 sm:h-[480px] lg:w-8 lg:h-[480px] bg-gray-700 mx-auto flex flex-col">
      {/* Evaluation display */}
      {hasAnalysis && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 px-1 py-0.5 rounded text-xs font-mono text-white whitespace-nowrap">
          {formatEvaluation(currentEvaluation)}
        </div>
      )}

      {/* Red Bar (Black's favor) - top */}
      <div
        className="w-full bg-gradient-to-b from-red-600 to-red-500 transition-all duration-300 ease-out"
        style={{
          height: `${blackPercent}%`,
        }}
      />

      {/* Green Bar (White's favor) - bottom */}
      <div
        className="w-full bg-gradient-to-b from-green-400 to-green-500 transition-all duration-300 ease-out"
        style={{
          height: `${whitePercent}%`,
        }}
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
