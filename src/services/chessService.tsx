import axios from 'axios';

// Obtén la URL base desde las variables de entorno
// En producción usa la URL de producción, en desarrollo usa localhost
const BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://chessmaster-backend-nestjs.onrender.com' : 'http://localhost:3000');

// Solo mostrar advertencia si no está configurada la variable de entorno
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not defined, using fallback:', BASE_URL);
}

/**
 * Obtiene los archivos de juegos del usuario.
 * @param username - Nombre de usuario en la plataforma.
 * @returns Lista de archivos de juegos.
 */
export const getPlayerArchives = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/chess/archives/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player archives:', error);
    throw new Error('Could not fetch player archives.');
  }
};

/**
 * Obtiene las partidas de un mes específico para un usuario.
 * @param username - Nombre de usuario en la plataforma.
 * @param year - Año del cual se quieren las partidas.
 * @param month - Mes del cual se quieren las partidas (1-12).
 * @returns Lista de partidas del mes.
 */
export const getGamesFromMonth = async (
  username: string,
  year: number,
  month: number
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/chess/games/${username}/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching games from month:', error);
    throw new Error('Could not fetch games from the specified month.');
  }
};

/**
 * Obtiene el PGN de un mes específico para un usuario.
 * @param username - Nombre de usuario en la plataforma.
 * @param year - Año del cual se quiere el PGN.
 * @param month - Mes del cual se quiere el PGN (1-12).
 * @returns PGN de las partidas del mes.
 */
export const getPGN = async (
  username: string,
  year: number,
  month: number
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}api/chess/pgn/${username}/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching PGN:', error);
    throw new Error('Could not fetch PGN for the specified month.');
  }
};

// Add this new function to chessService
export const analyzeGame = async (pgn: string, depth: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chess/analyze`, {
      pgn,
      depth
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing game:', error);
    throw new Error('Could not analyze game.');
  }
};

/**
 * Obtiene el perfil de un jugador de Chess.com.
 * @param username - Nombre de usuario en Chess.com.
 * @returns Datos del perfil incluyendo avatar.
 */
export const getPlayerProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://api.chess.com/pub/player/${username}`);
    return {
      username: response.data.username,
      avatar: response.data.avatar || null,
      name: response.data.name || response.data.username,
    };
  } catch (error) {
    console.error('Error fetching player profile:', error);
    return { username, avatar: null, name: username };
  }
};
