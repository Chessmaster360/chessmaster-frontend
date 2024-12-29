import React from "react";
import Navbar from "./components/Bars/Navbar";
import AnalyzeScreen from "./pages/AnalyzeScreen";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* Navbar */}
      <Navbar />
      {/* Main content */}
      <main className="h-screen flex flex-col">
        <AnalyzeScreen />
      </main>
    </div>
  );
};

export default App;
