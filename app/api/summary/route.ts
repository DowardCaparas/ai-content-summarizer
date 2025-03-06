import { NextResponse } from "next/server";
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Provide a fallback to avoid undefined errors
});


export async function POST(req: Request) {
  try {
    
    const { article } = await req.json();
    if (!article) return NextResponse.json({ error: "No article provided" }, { status: 400 });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "system", content: `Summarize this article in key points:\n\n${article}` }],
  
    });

    return NextResponse.json({ summary: response.choices[0]?.message?.content || "No summary generated." });
  } catch (error) {
    console.error("Error summarizing article:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to summarize." }, { status: 500 });
  }
  
}
