import { Tool } from "../types";

export const getToolRecommendations = async (query: string): Promise<Tool[]> => {
  try {
    // Call the Next.js secure API route
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Tool[];
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return [];
  }
};