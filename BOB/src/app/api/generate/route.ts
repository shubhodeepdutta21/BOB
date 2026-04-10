import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the brand new GenAI client
// It will automatically find your GEMINI_API_KEY from your .env.local!
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { componentNames } = body;

        if (!componentNames || componentNames.length === 0) {
            return NextResponse.json({ error: "No inventory provided" }, { status: 400 });
        }

        const prompt = `
      You are an expert electronics engineering mentor. 
      A student has EXACTLY these components and nothing else: ${componentNames.join(", ")}.
      
      Invent a creative, safe, and working DIY hardware project they can build using ONLY some or all of these parts.
      
      You MUST respond with a pure, valid JSON object in this exact format (no markdown, no backticks, just the JSON):
      {
        "title": "A catchy name for the project",
        "description": "A 2-sentence explanation of what it does",
        "difficultyLevel": "Beginner, Intermediate, or Advanced",
        "estimatedTime": "e.g., 2 Hours",
        "steps": ["Step 1...", "Step 2...", "Step 3..."]
      }
    `;

        // Using the new generateContent syntax with Gemini 2.5 Flash!
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        // The new SDK makes getting the text response slightly cleaner too
        const responseText = response.text || "";

        // Clean up the response just in case the AI added markdown blocks
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const generatedProject = JSON.parse(cleanJson);

        return NextResponse.json({ project: generatedProject });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate project" }, { status: 500 });
    }
}