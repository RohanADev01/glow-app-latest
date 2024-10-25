import { neon } from "@neondatabase/serverless";

export async function POST(request: Request, { userId }: { userId: string }) {
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { scanResults } = await request.json();
    const sql = neon(`${process.env.DATABASE_URL}`);

    console.log(scanResults);

    const response = await sql` 
      INSERT INTO user_scan_results (clerk_id, scan_results, created_at)
      VALUES (${userId}, ${scanResults}, NOW())
      RETURNING *;
    `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Error inserting scan results:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
