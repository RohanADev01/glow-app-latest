import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    console.log("logging from api endpoint");
    const { message, name, prompt } = await request.json();

    if (!message || !name || !prompt) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(message, name, prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message },
        {
          role: "system",
          content: `${prompt} Do NOT return as markdown, return as text.`,
        },
      ],
      max_tokens: 500,
    });

    const chatbotResponse = response.choices[0].message.content;

    console.log(chatbotResponse);

    return Response.json({ response: chatbotResponse }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
