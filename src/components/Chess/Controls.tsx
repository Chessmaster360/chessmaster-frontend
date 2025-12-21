import React, { useEffect, useCallback } from "react";
import { FaStepBackward, FaStepForward, FaRedo, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGameStore } from "../../store/useGameStore";

const Controls: React.FC = () => {
  const nextMove = useGameStore((state) => state.nextMove);
  const prevMove = useGameStore((state) => state.prevMove);
  const firstMove = useGameStore((state) => state.firstMove);
  const lastMove = useGameStore((state) => state.lastMove);
  const reset = useGameStore((state) => state.reset);
  const currentMoveIndex = useGameStore((state) => state.currentMoveIndex);
  const moves = useGameStore((state) => state.moves);

  // Check if navigation is possible
  const canGoBack = currentMoveIndex >= 0;
  const canGoForward = currentMoveIndex < moves.length - 1;
  const hasGame = moves.length > 0;

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevMove();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextMove();
        break;
      case 'ArrowUp':
        e.preventDefault();
        firstMove();
        break;
      case 'ArrowDown':
        e.preventDefault();
        lastMove();
        break;
    }
  }, [nextMove, prevMove, firstMove, lastMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Button style helper
  const getButtonClass = (enabled: boolean) => `
    ${enabled ? 'bg-black-200 hover:bg-gray-600' : 'bg-gray-700 cursor-not-allowed opacity-50'}
    text-white p-2 sm:p-3 rounded-full transition-all
  `;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Move counter */}
      {hasGame && (
        <div className="text-white text-sm mb-2">
          Move {currentMoveIndex + 1} / {moves.length}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 bg-black-600 p-3 rounded shadow-md w-full">
        <button
          className={getButtonClass(canGoBack)}
          aria-label="Go to start"
          onClick={firstMove}
          disabled={!canGoBack}
          title="Go to start (↑)"
        >
          <span className="text-lg sm:text-xl">
            <FaStepBackward />
          </span>
        </button>
        <button
          className={getButtonClass(canGoBack)}
          aria-label="Previous move"
          onClick={prevMove}
          disabled={!canGoBack}
          title="Previous move (←)"
        >
          <span className="text-lg sm:text-xl">
            <FaArrowLeft />
          </span>
        </button>
        <button
          className={getButtonClass(canGoForward)}
          aria-label="Next move"
          onClick={nextMove}
          disabled={!canGoForward}
          title="Next move (→)"
        >
          <span className="text-lg sm:text-xl">
            <FaArrowRight />
          </span>
        </button>
        <button
          className={getButtonClass(canGoForward)}
          aria-label="Go to end"
          onClick={lastMove}
          disabled={!canGoForward}
          title="Go to end (↓)"
        >
          <span className="text-lg sm:text-xl">
            <FaStepForward />
          </span>
        </button>
        <button
          className={getButtonClass(hasGame)}
          aria-label="Reset"
          onClick={reset}
          disabled={!hasGame}
          title="Reset game"
        >
          <span className="text-lg sm:text-xl">
            <FaRedo />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
