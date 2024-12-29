import React from "react";

const Controls: React.FC = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
        ◀︎
      </button>
      <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
        ▶︎
      </button>
      <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
        ⏮︎
      </button>
      <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
        ⏭︎
      </button>
    </div>
  );
};

export default Controls;
