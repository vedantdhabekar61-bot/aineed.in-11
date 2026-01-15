import { GoogleGenAI, Type } from "@google/genai";
import { Tool } from "../types";

// NOTE: In a production app, never expose API keys on the client.
// This is for demonstration purposes using the provided environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getToolRecommendations = async (query: string): Promise<Tool[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User problem: "${query}". Recommend 5 real or realistic AI tools that solve this problem. Provide a diverse mix.`,
      config: {
        systemInstruction: "You are a helpful expert on AI tools software. Analyze the user's need and return a curated list of the best AI tools for the job.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING, description: "A concise 1-sentence value prop." },
              website: { type: Type.STRING, description: "A mock or real URL like https://toolname.ai" },
              category: { type: Type.STRING, description: "e.g., Video Editing, Writing, Coding" },
              pricing: { type: Type.STRING, description: "e.g., Freemium, Paid, Free, Open Source" }
            },
            required: ["name", "description", "website", "category", "pricing"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Tool[];
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return [];
  }
};
