import React from "react";
import { FaStepBackward, FaStepForward, FaRedo, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Controls: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Backward"
      >
        <span className="text-xl">
          <FaStepBackward />
        </span>
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Left"
      >
        <span className="text-xl">
          <FaArrowLeft />
        </span>
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Right"
      >
        <span className="text-xl">
          <FaArrowRight />
        </span>
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Forward"
      >
        <span className="text-xl">
          <FaStepForward />
        </span>
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Redo"
      >
        <span className="text-xl">
          <FaRedo />
        </span>
      </button>
    </div>
  );
};

export default Controls;
