import React from "react";

// Evaluation Bar Component
const EvaluationBar: React.FC = () => {
  return (
    <div className="relative w-4 h-64 sm:w-6 sm:h-[480px] lg:w-8 lg:h-[480px] bg-gray-700 mx-auto">
      {/* Green Bar (White's favor) */}
      <div
        className="absolute w-full bg-green-500"
        style={{
          height: "55%", // Ajusta dinámicamente según la evaluación
          bottom: 0,     // La barra verde comienza desde abajo
        }}
      />
      {/* Red Bar (Black's favor) */}
      <div
        className="absolute w-full bg-red-500"
        style={{
          height: "45%", // Ajusta dinámicamente según la evaluación
          top: 0,        // La barra roja comienza desde arriba
        }}
      />
    </div>
  );
};

export default EvaluationBar;
