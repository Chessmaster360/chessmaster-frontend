// components/AnalysisReport.tsx
import React from "react";
import { FaChessBoard, FaChartLine, FaRegClock } from "react-icons/fa";

interface AnalysisResult {
  accuracy: number;
  classifications: {
    excellent: number;
    good: number;
    mistake: number;
    blunder: number;
  };
}

interface AnalysisReportProps {
  result: AnalysisResult;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ result }) => {
  return (
    <div className="mt-6 bg-black-200 p-6 rounded-lg animate-fade-in">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaChessBoard className="text-green-500" />
        Game Analysis Report
      </h3>

      {/* Accuracy Section */}
      <div className="mb-6 p-4 bg-black-100 rounded">
        <div className="flex items-center gap-3 mb-2">
          <FaChartLine className="text-blue-400" />
          <span className="font-semibold">Total Accuracy:</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${result.accuracy}%` }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm text-gray-300">
          {result.accuracy.toFixed(1)}%
        </div>
      </div>

      {/* Classifications Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-900/20 rounded">
          <div className="text-green-400 font-bold">{result.classifications.excellent}</div>
          <div className="text-sm text-gray-300">Excellent Moves</div>
        </div>
        <div className="p-3 bg-blue-900/20 rounded">
          <div className="text-blue-400 font-bold">{result.classifications.good}</div>
          <div className="text-sm text-gray-300">Good Moves</div>
        </div>
        <div className="p-3 bg-yellow-900/20 rounded">
          <div className="text-yellow-400 font-bold">{result.classifications.mistake}</div>
          <div className="text-sm text-gray-300">Mistakes</div>
        </div>
        <div className="p-3 bg-red-900/20 rounded">
          <div className="text-red-400 font-bold">{result.classifications.blunder}</div>
          <div className="text-sm text-gray-300">Blunders</div>
        </div>
      </div>

      {/* Analysis Details */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-gray-400">
          <FaRegClock className="text-sm" />
          <span className="text-sm">Analysis depth: Stockfish 15+</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;