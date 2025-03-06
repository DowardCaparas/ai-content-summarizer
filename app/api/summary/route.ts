import OpenAI from "openai";

async function getCompletion() {
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": "write a haiku about AI" }
        ]
    });

    console.log(completion.choices[0].message.content); // Output response
}

getCompletion(); // Call the function
