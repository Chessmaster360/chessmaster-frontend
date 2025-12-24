import React, { useState, useCallback } from "react";
import { FaChessKnight, FaTools, FaSearch, FaArrowRight, FaCheck, FaSpinner, FaCopy } from "react-icons/fa";
import { getPlayerArchives, getGamesFromMonth, analyzeGame } from "../../services/chessService";
import GameModal from "./GameModal";
import GameReviewSummary from "./GameReviewSummary";
import { useGameStore } from "../../store/useGameStore";


interface Game {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  pgn: string;
}
// Add these interfaces to your chessService file
export interface AnalysisResult {
  accuracy: number;
  classifications: {
    brilliant: number;
    great: number;
    best: number;
    excellent: number;
    good: number;
    inaccuracy: number;
    mistake: number;
    blunder: number;
    book: number;
    forced: number;
  };
  positions: EvaluatedPosition[];
}

export interface EvaluatedPosition {
  fen: string;
  move: string;
  classification: 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder' | 'book' | 'forced';
  suggestedMove: { san: string; uci: string };
  evaluation: { type: 'cp' | 'mate'; value: number };
}

const GameReport: React.FC = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [option, setOption] = useState<string>("pgn");
  const [inputValue, setInputValue] = useState<string>("");
  const [depth, setDepth] = useState<number>(14);
  const [showGames, setShowGames] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [archives, setArchives] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isAnalyzingLocal, setIsAnalyzingLocal] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // New state for improved UX
  const [selectedPgn, setSelectedPgn] = useState<string>("");
  const [gameSelected, setGameSelected] = useState<boolean>(false);
  const [copiedPgn, setCopiedPgn] = useState<boolean>(false);

  // Store hooks
  const loadPGN = useGameStore((state) => state.loadPGN);
  const setAnalysisResult = useGameStore((state) => state.setAnalysisResult);
  const setIsAnalyzing = useGameStore((state) => state.setIsAnalyzing);
  const analysisResult = useGameStore((state) => state.analysisResult);
  const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
  const moves = useGameStore((state) => state.moves);
  const metadata = useGameStore((state) => state.metadata);

  // Get current move's suggested move
  const currentMove = currentMoveIndex >= 0 ? moves[currentMoveIndex] : null;
  const suggestedMove = currentMove?.suggestedMove;

  // Copy PGN to clipboard
  const handleCopyPgn = useCallback(async () => {
    const pgnToCopy = selectedPgn || inputValue;
    if (pgnToCopy) {
      await navigator.clipboard.writeText(pgnToCopy);
      setCopiedPgn(true);
      setTimeout(() => setCopiedPgn(false), 2000);
    }
  }, [selectedPgn, inputValue]);

  // Reset to search mode
  const handleSearchAnother = useCallback(() => {
    setGameSelected(false);
    setSelectedPgn("");
    setInputValue("");
    setIsSuccess(false);
  }, []);

  // Modified handleAnalyze function
  const handleAnalyze = useCallback(async () => {
    setIsAnalyzingLocal(true);
    setIsAnalyzing(true);
    setWarning("");
    setAnalysisProgress(0);

    const pgnToAnalyze = selectedPgn || inputValue.trim();

    if (option === "pgn" && !pgnToAnalyze) {
      setWarning("Please enter a PGN to analyze.");
      setIsAnalyzingLocal(false);
      setIsAnalyzing(false);
      return;
    }

    try {
      // First, load the PGN into the game store
      const pgnLoaded = loadPGN(pgnToAnalyze);
      if (!pgnLoaded) {
        setWarning("Invalid PGN format.");
        setIsAnalyzingLocal(false);
        setIsAnalyzing(false);
        return;
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + Math.random() * 10, 90));
      }, 500);

      // Call the analysis API
      const analysisData = await analyzeGame(pgnToAnalyze, depth);

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300)); // Smooth finish

      // Store the analysis result in the global store
      setAnalysisResult(analysisData);
    } catch (error) {
      setWarning("Error analyzing game. Please check the PGN format.");
      setIsAnalyzing(false);
    } finally {
      setIsAnalyzingLocal(false);
      setAnalysisProgress(0);
    }
  }, [selectedPgn, inputValue, depth, option, loadPGN, setAnalysisResult, setIsAnalyzing]);

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
    setInputValue("");
    setWarning("");
    setGameSelected(false);
    setSelectedPgn("");
  }, []);

  const handleDepthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(Number(event.target.value));
  }, []);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setWarning("");

    if (!inputValue.trim()) {
      setWarning("Please enter a username.");
      setIsLoading(false);
      return;
    }

    if (option !== "chess.com") {
      setWarning("This feature currently only works for Chess.com.");
      setIsLoading(false);
      return;
    }

    try {
      const playerArchives = await getPlayerArchives(inputValue.trim());
      setArchives(playerArchives);

      if (playerArchives.length > 0) {
        setShowGames(true);
        setIsSuccess(true); // Éxito en la búsqueda
      } else {
        setWarning("No games found for this user.");
        setShowGames(false);
        setGames([]);
      }
    } catch (error) {
      setWarning("User not found or no games available. Please check the username and try again.");
      setArchives([]);
      setGames([]);
      setShowGames(false);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  }, [inputValue, option]);

  const handleGameSelect = useCallback((pgn: string) => {
    // Store PGN internally instead of in input field
    setSelectedPgn(pgn);
    setGameSelected(true);
    setShowGames(false);
    // Load PGN into game store for visualization
    loadPGN(pgn);
  }, [loadPGN]);

  const handleMonthSelect = useCallback(async (month: string) => {
    const [year, monthNumber] = month.split("-");
    try {
      const gamesForMonth = await getGamesFromMonth(inputValue.trim(), parseInt(year), parseInt(monthNumber));
      setGames(gamesForMonth);
    } catch {
      setWarning("Could not load games for this month. Please try again.");
    }
  }, [inputValue]);

  return (
    <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full h-full flex flex-col">
      {/* Header with "?" and copy buttons */}
      <header className="relative flex items-center mb-6 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
        <FaChessKnight className="text-3xl text-green-600 mb-2 lg:mb-0" />
        <h2 className="text-2xl font-semibold">Game Report</h2>
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Copy PGN button - show when game is selected or PGN entered */}
          {(selectedPgn || (option === "pgn" && inputValue.trim())) && (
            <button
              onClick={handleCopyPgn}
              className={`text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors ${copiedPgn ? "bg-green-500" : "bg-gray-600 hover:bg-gray-500"
                }`}
              aria-label="Copy PGN"
              title="Copy PGN"
            >
              {copiedPgn ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
            </button>
          )}
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-500"
            aria-label="Show instructions"
          >
            ?
          </button>
        </div>
      </header>

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black-700 text-white rounded-xl w-full max-w-md shadow-2xl border border-green-600/50 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaChessKnight className="text-2xl text-white" />
                <h3 className="text-lg font-semibold text-white">How to Use</h3>
              </div>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="text-white/80 hover:text-white text-xl transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 space-y-4 bg-black-600">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">1.</span>
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Enter a PGN:</strong> Paste your game in PGN format to analyze it directly.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">2.</span>
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Search by Username:</strong> Enter a Chess.com username to find and import their games.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">3.</span>
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Click Analyze:</strong> Our engine will evaluate every move and provide insights.
                </p>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-black-700 border-t border-gray-700">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Selected View - show when a game has been selected from Chess.com */}
      {gameSelected && option !== "pgn" ? (
        <div className="mb-6">
          {/* Game Selected Indicator */}
          <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-400" />
                <span className="text-green-400 font-semibold">Game Selected</span>
              </div>
              <button
                onClick={handleCopyPgn}
                className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${copiedPgn
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 hover:bg-gray-500 text-white"
                  }`}
              >
                {copiedPgn ? <FaCheck /> : <FaCopy />}
                {copiedPgn ? "Copied!" : "Copy PGN"}
              </button>
            </div>
            {metadata && (
              <p className="text-sm text-gray-300">
                {metadata.white} vs {metadata.black}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              className="flex-1 bg-green-600 px-4 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 font-medium"
              disabled={isAnalyzingLocal}
            >
              {isAnalyzingLocal ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaArrowRight aria-hidden="true" />
                  <span>Analyze Now</span>
                </>
              )}
            </button>
            <button
              onClick={handleSearchAnother}
              className="px-4 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 flex items-center justify-center space-x-2"
            >
              <FaSearch />
              <span>Search Another</span>
            </button>
          </div>
        </div>
      ) : (
        /* Original Search/Input View */
        <>
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4 mb-6 w-full">
            <div className="relative flex-grow w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setWarning(""); // Clear warning when typing
                }}
                placeholder={
                  option === "chess.com" || option === "lichess.org"
                    ? "Enter the username..."
                    : "Enter PGN..."
                }
                className={`w-full bg-black-200 text-white px-4 py-2 rounded pr-12 ${warning && option === "pgn" ? "border border-red-500" : ""
                  }`}
              />
              {option !== "pgn" && (
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : isSuccess ? (
                    <FaCheck />
                  ) : (
                    <FaSearch />
                  )}
                  <span className="sr-only">Search</span>
                </button>
              )}
            </div>

            <select
              value={option}
              onChange={handleOptionChange}
              className="bg-black-200 text-white px-4 py-2 rounded w-full lg:w-[160px] text-center border border-gray-600"
            >
              <option value="pgn">PGN</option>
              <option value="chess.com">Chess.com</option>
            </select>
          </div>

          {/* Analyze Button - Only show for PGN mode or when not game selected */}
          {option === "pgn" && (
            <div className="mb-6">
              <button
                onClick={handleAnalyze}
                className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
                disabled={isAnalyzingLocal}
              >
                {isAnalyzingLocal ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaArrowRight aria-hidden="true" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {warning && <p className="mt-2 mb-4 text-sm text-red-500 text-center">{warning}</p>}

      {isAnalyzingLocal && (
        <div className="mb-4 bg-black-200 p-4 rounded">
          <div className="flex items-center gap-3 text-sm">
            <FaSpinner className="animate-spin" />
            <div className="flex-1">
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right text-xs text-gray-400">
                {Math.floor(analysisProgress)}% Analyzed
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-center text-gray-400">
            Analyzing {analysisProgress > 50 ? "critical positions" : "opening moves"}...
          </p>
        </div>
      )}

      {analysisResult && <GameReviewSummary />}

      {/* Best Move Suggestion */}
      {analysisResult && suggestedMove && suggestedMove.san && (
        <div className="bg-black-200 p-4 rounded mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-bold">Best Move:</span>
              <span className="bg-green-600 px-3 py-1 rounded font-mono text-lg">
                {suggestedMove.san}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              Move {currentMoveIndex + 1}
            </span>
          </div>
        </div>
      )}

      {/* Depth Section - Added margin for spacing from Controls */}
      <div className="space-y-4 bg-black-200 p-4 rounded mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">Depth</h3>
            <FaTools className="text-xl text-green-500" />
          </div>
          <span className="text-sm bg-black-100 px-3 py-1 rounded lg:hidden">{depth}</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={15}
            max={20}
            value={depth}
            onChange={handleDepthChange}
            className="w-full h-3 rounded-lg bg-gray-600 cursor-pointer"
          />
          <span className="text-sm bg-gray-600 px-3 py-1 rounded hidden lg:block">{depth}</span>
        </div>
      </div>

      {showGames && (
        <GameModal
          show={showGames}
          onClose={() => setShowGames(false)}
          games={games}
          archives={archives}
          onMonthSelect={handleMonthSelect}
          onSelectGame={handleGameSelect}
          username={inputValue.trim()}
        />
      )}
    </div>
  );
};

export default GameReport;
