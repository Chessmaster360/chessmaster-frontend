import axios from 'axios';

// Obtén la URL base desde las variables de entorno
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL is not defined");
}

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
