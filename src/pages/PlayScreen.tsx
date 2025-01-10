import React, { useState } from 'react';
import ChessBoard from '../components/Chess/ChessBoard';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex text-gray-200">
      {/* Contenedor central */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center rounded-lg shadow-lg p-4 md:gap-2 max-w-4xl">
        {/* Tablero de Ajedrez */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg lg:mr-6">
          <ChessBoard />
        </div>

        {/* Botón para abrir/ocultar la barra en pantallas pequeñas */}
        <button
          className="absolute top-20 right-4 z-50 bg-purple-500 text-white p-2 rounded-full md:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>

        {/* Sección de Bots */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 md:relative md:translate-x-0 w-80 bg-black-600 p-6 rounded shadow-lg flex flex-col`}
        >
          <h2 className="text-2xl font-bold mb-4">Play Against Bots</h2>
          <ul className="space-y-4">
            {bots.map((bot) => (
              <li
                key={bot.name}
                className="p-4 bg-black-200 rounded cursor-pointer hover:bg-gray-500"
                onClick={() => setSelectedBot(bot)}
              >
                {bot.name}
              </li>
            ))}
          </ul>
          {selectedBot && (
            <div className="mt-6 p-4 bg-black-200 rounded-lg">
              <img
                src={selectedBot.image}
                alt={selectedBot.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold">{selectedBot.name}</h3>
              <p className="text-gray-400">Elo: {selectedBot.elo}</p>
              <p className="mt-2 text-gray-300">{selectedBot.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;
