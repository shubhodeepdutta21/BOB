import { NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";


export async function POST(request: Request) {
    const client = new Cerebras({ apiKey: process.env.CEREBRAS_API_KEY });
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

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b",  // or "llama3.1-8b" 
            messages: [{ role: "user", content: prompt }],
            max_completion_tokens: 500,
            response_format: { type: "json_object" },
        });

        const content = response.choices?.[0]?.message?.content;
        const generatedProject = JSON.parse(content || "{}");

        return NextResponse.json({ project: generatedProject });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate project" }, { status: 500 });
    }
}