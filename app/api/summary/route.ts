import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use correct environment variable
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
    return NextResponse.json({ error: `Failed to summarize. ${error}`, }, { status: 500 });
  }
}
