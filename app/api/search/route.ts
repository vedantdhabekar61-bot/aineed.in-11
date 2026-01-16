import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from 'next/server';

// Ensure the API key is present
const apiKey = process.env.API_KEY;

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "Server API Key not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

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
    const tools = text ? JSON.parse(text) : [];

    return NextResponse.json(tools);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}