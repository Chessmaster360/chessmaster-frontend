import React from "react";
import { FaStepBackward, FaStepForward, FaRedo, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Controls: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 bg-black-600 p-4 rounded shadow-md">
      <button
        className="bg-black-200 text-white p-2 sm:p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Backward"
      >
        <span className="text-lg sm:text-xl">
          <FaStepBackward />
        </span>
      </button>
      <button
        className="bg-black-200 text-white p-2 sm:p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Left"
      >
        <span className="text-lg sm:text-xl">
          <FaArrowLeft />
        </span>
      </button>
      <button
        className="bg-black-200 text-white p-2 sm:p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Arrow Right"
      >
        <span className="text-lg sm:text-xl">
          <FaArrowRight />
        </span>
      </button>
      <button
        className="bg-black-200 text-white p-2 sm:p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Step Forward"
      >
        <span className="text-lg sm:text-xl">
          <FaStepForward />
        </span>
      </button>
      <button
        className="bg-black-200 text-white p-2 sm:p-3 rounded-full hover:bg-gray-600 transition-all"
        aria-label="Redo"
      >
        <span className="text-lg sm:text-xl">
          <FaRedo />
        </span>
      </button>
    </div>
  );
};

export default Controls;
