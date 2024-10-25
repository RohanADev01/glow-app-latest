import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { userId }: { userId: string }) {
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
      SELECT * FROM user_scan_results
      WHERE clerk_id = ${userId}
      ORDER BY created_at DESC;
    `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching scan results:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
