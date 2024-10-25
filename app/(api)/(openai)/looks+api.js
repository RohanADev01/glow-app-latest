import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { image } = await request.json();
    const prompt = `You are an AI image analysis assistant specialized in facial evaluation. When presented with an image of a face, analyze it objectively and provide scores from 50 to 100 for the following qualities: Overall Impression, Potential, Masculinity, Skin Quality, Hairstyle, and Jawline. For each quality, provide a brief explanation (1-2 sentences) justifying the score. Be objective, respectful, and constructive in your analysis. Avoid harsh criticism and focus on positive aspects and potential improvements. After the individual scores, provide a short overall summary (2-3 sentences) of the face's strongest features and any general recommendations for enhancement. Respond in JSON format with the following structure:
    {
      "overallImpression": { "score": number, "explanation": "string" },
      "potential": { "score": number, "explanation": "string" },
      "masculinity": { "score": number, "explanation": "string" },
      "skinQuality": { "score": number, "explanation": "string" },
      "hairstyle": { "score": number, "explanation": "string" },
      "jawline": { "score": number, "explanation": "string" },
      "summary": "string"
    }`;

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
            text: "Analyze this facial image and provide scores and explanations for each quality, along with an overall summary.",
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

    return Response.json({
      overallImpression: {
        score: Math.round(result.overallImpression?.score || 0),
        explanation: result.overallImpression?.explanation || "",
      },
      potential: {
        score: Math.round(result.potential?.score || 0),
        explanation: result.potential?.explanation || "",
      },
      masculinity: {
        score: Math.round(result.masculinity?.score || 0),
        explanation: result.masculinity?.explanation || "",
      },
      skinQuality: {
        score: Math.round(result.skinQuality?.score || 0),
        explanation: result.skinQuality?.explanation || "",
      },
      hairstyle: {
        score: Math.round(result.hairstyle?.score || 0),
        explanation: result.hairstyle?.explanation || "",
      },
      jawline: {
        score: Math.round(result.jawline?.score || 0),
        explanation: result.jawline?.explanation || "",
      },
      summary: result.summary || "",
    });
  } catch (error) {
    console.error("Error in checkFaceAura API:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
