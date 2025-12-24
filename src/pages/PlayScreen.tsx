import React, { useState } from 'react';
import ChessBoard from '../components/Chess/ChessBoard';
import Controls from '../components/Chess/Controls';
import { FaRobot, FaChessKnight } from 'react-icons/fa';

interface Bot {
  name: string;
  elo: number;
  description: string;
  image: string;
}

const bots: Bot[] = [
  {
    name: 'Bobby Fischer',
    elo: 2785,
    description: 'American chess grandmaster and World Chess Champion.',
    image: 'https://cdn.zendalibros.com/wp-content/uploads/ajedrez-bobby-fischer.jpeg',
  },
  {
    name: 'Garry Kasparov',
    elo: 2847,
    description: 'Russian grandmaster and former World Chess Champion.',
    image: 'https://www.biografiasyvidas.com/biografia/k/fotos/kasparov.jpg',
  },
  {
    name: 'Magnus Carlsen',
    elo: 2882,
    description: 'Norwegian grandmaster and current World Chess Champion.',
    image: 'https://i.guim.co.uk/img/media/699cce4914b90ae0ba89787178bc48314d50eb89/0_215_5081_3048/master/5081.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0032559e1e2d58597a80917a287de030',
  },
  {
    name: 'Hikaru Nakamura',
    elo: 2820,
    description: 'American grandmaster and five-time US Chess Champion.',
    image: 'https://imagenes.elpais.com/resizer/v2/TVITNH2BPSJQTJ4FQQVRJH7PVU.jpg?auth=9e1d1e66de90aa9b3d6d0b71e0b161fb768ccb42daebf77322382c15432a5167&width=414',
  },
];

const PlayScreen: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black-600 overflow-hidden">
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black-600 rounded-xl shadow-2xl w-full max-w-md border border-green-600/30 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaRobot className="text-2xl text-white" />
                <h3 className="text-lg font-semibold text-white">Coming Soon!</h3>
              </div>
              <button
                onClick={() => setShowComingSoonModal(false)}
                className="text-white/80 hover:text-white text-xl transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 bg-black-600">
              <p className="text-gray-300 text-center">
                We're working hard to bring you the bot battle functionality!
                Stay tuned for updates. 🚀
              </p>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-black-700 border-t border-gray-700">
              <button
                onClick={() => setShowComingSoonModal(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Chessboard Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 lg:p-4 overflow-hidden bg-black-800">
        {/* Chessboard Container - Maximize space */}
        <div className="w-full h-full flex items-center justify-center">
          <ChessBoard />
        </div>
      </div>

      {/* Right Side - Bot Selection & Controls */}
      <div className="w-full lg:w-[530px] lg:flex-shrink-0 bg-black-700 border-l border-black-500 flex flex-col h-full z-10">
        {/* Bot Selection - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full h-full flex flex-col">
            {/* Header */}
            <header className="relative flex items-center mb-6 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
              <FaChessKnight className="text-3xl text-green-600 mb-2 lg:mb-0" />
              <h2 className="text-2xl font-semibold">Play Against Bots</h2>
            </header>

            {/* Bot List */}
            <div className="space-y-3 flex-1">
              {bots.map((bot) => (
                <div
                  key={bot.name}
                  className={`p-4 bg-black-200 rounded-lg cursor-pointer transition-all hover:bg-gray-600 border-2 ${selectedBot?.name === bot.name
                      ? 'border-green-500 bg-gray-600'
                      : 'border-transparent'
                    }`}
                  onClick={() => setSelectedBot(bot)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{bot.name}</h3>
                      <p className="text-sm text-gray-400">Elo: {bot.elo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Bot Details */}
            {selectedBot && (
              <div className="mt-4 p-4 bg-black-200 rounded-lg border border-green-600/30">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={selectedBot.image}
                    alt={selectedBot.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedBot.name}</h3>
                    <p className="text-green-400">Elo: {selectedBot.elo}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{selectedBot.description}</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Start Game vs {selectedBot.name}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls - Fixed at Bottom of Right Panel */}
        <div className="p-4 bg-black-700 border-t border-black-500">
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;
