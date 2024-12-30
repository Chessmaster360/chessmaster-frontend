import React from "react";
import Navbar from "./components/Bars/Navbar";
import AnalyzeScreen from "./pages/AnalyzeScreen";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-zinc-950 bg-gradient-to-r text-gray-200">
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
