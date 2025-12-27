import React, { useState } from 'react';
import ChessBoard from '../components/Chess/ChessBoard';
import Controls from '../components/Chess/Controls';
import { FaRobot, FaChessKnight, FaHistory, FaChartLine } from 'react-icons/fa';

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

type ModalType = 'bots' | 'historic' | null;

const PlayScreen: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState<ModalType>('bots');

  const getModalContent = () => {
    if (showComingSoonModal === 'bots') {
      return {
        icon: <FaRobot className="text-2xl text-white" />,
        title: 'Coming Soon!',
        message: "We're working hard to bring you the bot battle functionality! Stay tuned for updates. 🚀",
      };
    } else if (showComingSoonModal === 'historic') {
      return {
        icon: <FaHistory className="text-2xl text-white" />,
        title: 'Coming Soon!',
        message: "The historic games analysis feature is coming soon! You'll be able to explore and analyze famous chess games from history. 📜",
      };
    }
    return null;
  };

  const modalContent = getModalContent();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black-600">
      {/* Coming Soon Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black-600 rounded-xl shadow-2xl w-full max-w-md border border-green-600/30 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {modalContent.icon}
                <h3 className="text-lg font-semibold text-white">{modalContent.title}</h3>
              </div>
              <button
                onClick={() => setShowComingSoonModal(null)}
                className="text-white/80 hover:text-white text-xl transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 bg-black-600">
              <p className="text-gray-300 text-center">
                {modalContent.message}
              </p>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-black-700 border-t border-gray-700">
              <button
                onClick={() => setShowComingSoonModal(null)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Chessboard Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-2 lg:p-4 bg-black-800">
        {/* Chessboard Container */}
        <div className="w-full flex items-center justify-center">
          <ChessBoard />
        </div>
      </div>

      {/* Right Side - Bot Selection & Controls */}
      <div className="w-full lg:w-[530px] lg:flex-shrink-0 bg-black-700 border-t lg:border-t-0 lg:border-l border-black-500 flex flex-col lg:h-screen">
        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Play Against Bots Section */}
          <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full mb-4">
            {/* Header */}
            <header className="relative flex items-center mb-4 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
              <FaChessKnight className="text-3xl text-green-600 mb-2 lg:mb-0" />
              <h2 className="text-xl font-semibold">Play Against Bots</h2>
            </header>

            {/* Bot List */}
            <div className="space-y-3">
              {bots.map((bot) => (
                <div
                  key={bot.name}
                  className={`p-3 bg-black-200 rounded-lg cursor-pointer transition-all hover:bg-gray-600 border-2 ${selectedBot?.name === bot.name
                    ? 'border-green-500 bg-gray-600'
                    : 'border-transparent'
                    }`}
                  onClick={() => setSelectedBot(bot)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white text-sm">{bot.name}</h3>
                      <p className="text-xs text-gray-400">Elo: {bot.elo}</p>
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
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedBot.name}</h3>
                    <p className="text-green-400 text-sm">Elo: {selectedBot.elo}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{selectedBot.description}</p>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setShowComingSoonModal('bots')}
                >
                  Start Game vs {selectedBot.name}
                </button>
              </div>
            )}
          </div>

          {/* Analyze Historic Games Section */}
          <div className="bg-black-600 text-white p-4 rounded shadow-md border border-black-600 w-full">
            {/* Header */}
            <header className="relative flex items-center mb-4 flex-col lg:flex-row lg:space-x-3 text-center lg:text-left">
              <FaHistory className="text-3xl text-amber-500 mb-2 lg:mb-0" />
              <h2 className="text-xl font-semibold">Analyze Historic Games</h2>
            </header>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 text-center lg:text-left">
              Explore and analyze famous chess games from history. Learn from the masters!
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black-200 p-3 rounded-lg text-center">
                <FaChartLine className="text-2xl text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Deep Analysis</p>
              </div>
              <div className="bg-black-200 p-3 rounded-lg text-center">
                <FaHistory className="text-2xl text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Famous Games</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              onClick={() => setShowComingSoonModal('historic')}
            >
              <FaHistory />
              Explore Historic Games
            </button>
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
