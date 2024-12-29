import React from "react";

// Evaluation Bar Component
const EvaluationBar: React.FC = () => {
  return (
    <div className="h-[480px] w-4 bg-gray-700 relative">
      {/* Evaluation bar visualization */}
      <div
        className="absolute w-full bg-green-500"
        style={{
          height: "55%", // Example: Adjust dynamically for evaluation
          bottom: 0, // Green bar starts from the bottom (White's favor)
        }}
      />
      <div
        className="absolute w-full bg-red-500"
        style={{
          height: "45%", // Red bar starts from the top (Black's favor)
          top: 0,
        }}
      />
    </div>
  );
};

export default EvaluationBar;
