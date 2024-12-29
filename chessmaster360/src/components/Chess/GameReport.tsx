import React from "react";

const GameReport: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md space-y-4">
      <h2 className="text-lg font-semibold">Game Report</h2>
      <div>
        <label className="block mb-2 text-sm">Enter PGN:</label>
        <input
          type="text"
          placeholder="Enter PGN..."
          className="w-full bg-gray-900 text-white px-3 py-2 rounded"
        />
      </div>
      <button className="w-full bg-green-600 px-3 py-2 rounded hover:bg-green-700">
        Analyse
      </button>
      <div className="space-y-2">
        <h3 className="font-medium">Depth</h3>
        <input type="range" className="w-full" />
      </div>
    </div>
  );
};

export default GameReport;
