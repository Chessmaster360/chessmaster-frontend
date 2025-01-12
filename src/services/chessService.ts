import axios from 'axios';

// Base URL del backend
const BASE_URL = 'http://localhost:3000/chess'; // Asegúrate de que esta URL sea correcta según tu configuración

/**
 * Obtiene los archivos de juegos del usuario.
 * @param username - Nombre de usuario en la plataforma.
 * @returns Lista de archivos de juegos.
 */
export const getPlayerArchives = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/archives/${username}`);
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
      `${BASE_URL}/games/${username}/${year}/${month}`
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
      `${BASE_URL}/pgn/${username}/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching PGN:', error);
    throw new Error('Could not fetch PGN for the specified month.');
  }
};
