import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { image, regenerateAlternatives, spiceLevel } = await request.json();

  const prompt = `You are an expert in flirting and conversation analysis. 
Your task is to analyze a screenshot of a conversation and provide a flirty response to continue the conversation. The response should be based on the context of what has already been said and adjusted according to the spice level provided. 
 Here is the spice scale:
    "0-2: Innocent and playful, no sexual content",
    "3-4: Mildly suggestive, subtle innuendos",
    "5-6: Moderately flirty, more obvious hints",
    "7-8: Quite suggestive, clear sexual undertones",
    "9-10: Explicitly sexual, very direct"

Respond in JSON format with the following structure:
 
{
  "flirtyResponse": "A flirty message to continue the conversation. The spice level is ${spiceLevel}. Adjust the response based on this scale:",
 
  "alternativeResponses": ["alternative1", "alternative2", "alternative3"]
}

Ensure that the flirtyResponse and alternativeResponses are appropriate for the given spice level. 
As the spice level increases, make the responses progressively more suggestive and sexual.
Give all responses in lower case, maintain a Gen Z tone.
`;

  try {
    let messages = [
      {
        role: "system",
        content: prompt,
      },
    ];

    if (image) {
      let imageContent;
      if (image.startsWith("data:image")) {
        imageContent = image;
      } else {
        const response = await axios.get(image, {
          responseType: "arraybuffer",
        });
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        imageContent = `data:image/jpeg;base64,${base64Image}`;
      }

      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this conversation screenshot and provide a flirty response to continue the conversation.",
          },
          { type: "image_url", image_url: { url: imageContent } },
        ],
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 5000,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);

    if (result.error) {
      throw new Error(result.error);
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error in generateFlirtingTips:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
