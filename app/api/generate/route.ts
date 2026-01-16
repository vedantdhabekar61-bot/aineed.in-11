import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from 'next/server';

// FORCE NODEJS RUNTIME for Vercel
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const apiKey = process.env.API_KEY;

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      console.error("API_KEY is missing in environment variables");
      return NextResponse.json(
        { error: "Server Configuration Error: API Key missing" },
        { status: 500 }
      );
    }

    const { query } = await request.json();

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