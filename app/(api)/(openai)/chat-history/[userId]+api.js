import { neon } from "@neondatabase/serverless";

export async function GET(request) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const { userId, chatbotName } = request.query;

  if (!userId || !chatbotName) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const history = await sql`
      SELECT message, created_at
      FROM chat_history
      WHERE user_id = ${userId} AND chatbot_name = ${chatbotName}
      ORDER BY created_at ASC;
    `;

    return Response.json({ history }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
