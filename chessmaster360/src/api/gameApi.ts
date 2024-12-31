// src/api/gameApi.ts
import axios from "axios";

// Define the structure of the game object
export interface Game {
  white: {
    username: string;
    rating: number;
    result: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
  };
  pgn: string;
  url: string;
}

// Axios instance
const apiClient = axios.create({
  baseURL: "http://your-backend-api.com", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch games for a player from the backend
export const fetchGamesFromBackend = async (
  platform: string,
  username: string
): Promise<Game[]> => {
  try {
    const response = await apiClient.get("/games", {
      params: { platform, username },
    });
    return response.data.games; // Expecting { games: [...] } structure
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Failed to fetch games.");
  }
};

// Analyze a game input (PGN) with a chosen platform
export const analyzeGameInput = async (
  pgn: string,
  platform: string
): Promise<any> => {
  try {
    const response = await apiClient.post("/analyze", {
      pgn,
      platform,
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing game:", error);
    throw new Error("Failed to analyze game.");
  }
};
