
// src/services/gameReportService.ts

export const fetchGamesFromBackend = async (): Promise<string[]> => {
  try {
    // Replace this mock logic with an actual API call
    const response = await fetch("/api/games");
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

export const analyzeGameInput = async (input: string, option: string): Promise<void> => {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, option }),
    });
    if (!response.ok) {
      throw new Error("Failed to analyze input");
    }
    console.log("Analysis successful");
  } catch (error) {
    console.error("Error analyzing game input:", error);
  }
};
  