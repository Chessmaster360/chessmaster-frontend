import React from "react";
import { FaStepBackward, FaStepForward, FaRedo, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Controls: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Backward"
      >
        <FaStepBackward className="text-xl" />
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Left"
      >
        <FaArrowLeft className="text-xl" />
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Right"
      >
        <FaArrowRight className="text-xl" />
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Forward"
      >
        <FaStepForward className="text-xl" />
      </button>
      <button
        className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Redo"
      >
        <FaRedo className="text-xl" />
      </button>
    </div>
  );
};

export default Controls;
