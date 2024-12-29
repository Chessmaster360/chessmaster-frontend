import React from "react";

const Controls: React.FC = () => {
  return (
    <div className="flex justify-between bg-gray-800 p-3 rounded shadow-md">
      <button className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">◀︎</button>
      <button className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">▶︎</button>
      <button className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">⏮︎</button>
      <button className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">⏭︎</button>
    </div>
  );
};

export default Controls;
