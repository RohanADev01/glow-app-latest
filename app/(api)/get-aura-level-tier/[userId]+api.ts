import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { userId }: { userId: string }) {
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql`
      SELECT total_points, level, tier FROM user_aura_points WHERE user_id = ${userId};
    `;

    if (result.length === 0) {
      return Response.json({ totalPoints: 0, level: 1, tier: "Novice" });
    }

    return Response.json({
      totalPoints: result[0].total_points,
      level: result[0].level,
      tier: result[0].tier,
    });
  } catch (error) {
    console.error("Error fetching aura level and tier:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
