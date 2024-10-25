import { neon } from "@neondatabase/serverless";

export async function PATCH(request: Request, { userId }: { userId: string }) {
  console.log("PATCH /user API route called");
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { paid } = await request.json();

    console.log("calling from update user package api", userId, paid);

    if (!userId || !paid) {
      console.log("Missing required fields");
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      UPDATE users
      SET paid = TRUE
      WHERE clerk_id = ${userId};
    `;

    console.log("Successfully updated user paid status into neondb.", response);
    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
