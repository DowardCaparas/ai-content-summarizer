import { NextResponse } from "next/server";
import OpenAI from "openai";

async function getCompletion() {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": "write a haiku about AI" }
        ]
    });

    return NextResponse.json({ summary: completion.choices[0]?.message?.content || "No summary generated." });
}

getCompletion(); // Call the function
