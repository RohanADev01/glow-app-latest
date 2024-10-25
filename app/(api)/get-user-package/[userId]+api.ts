import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { userId }: { userId: string }) {
  //   const userId = params.userId;
  console.log(userId);
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql`
      SELECT paid FROM users WHERE clerk_id = ${userId};
    `;

    if (result.length === 0) {
      return Response.json({ paidStatus: false });
    }

    return Response.json({ paidStatus: result[0].paid });
  } catch (error) {
    console.error("Error fetching paid status:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
