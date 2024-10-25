import { neon } from "@neondatabase/serverless";

export async function PATCH(request: Request, { userId }: { userId: string }) {
  const { totalPoints } = await request.json();

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Calculate new level and tier based on totalPoints
    const { level, tier } = calculateLevelAndTier(totalPoints);

    // Upsert the total points, level, and tier in the database
    await sql`
      INSERT INTO user_aura_points (user_id, total_points, level, tier)
      VALUES (${userId}, ${totalPoints}, ${level}, ${tier})
      ON CONFLICT (user_id) DO UPDATE SET 
        total_points = ${totalPoints}, 
        level = ${level}, 
        tier = ${tier};
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating aura level and tier:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Helper function to calculate level and tier
function calculateLevelAndTier(totalPoints: number) {
  let level = 1;
  let tier = "Novice";

  // Updated level and tier calculation logic
  if (totalPoints >= 200000) {
    level = 20;
    tier = "Transcendent";
  } else if (totalPoints >= 190000) {
    level = 19;
    tier = "Legendary";
  } else if (totalPoints >= 180000) {
    level = 18;
    tier = "Master";
  } else if (totalPoints >= 170000) {
    level = 17;
    tier = "Expert";
  } else if (totalPoints >= 160000) {
    level = 16;
    tier = "Veteran";
  } else if (totalPoints >= 150000) {
    level = 15;
    tier = "Adept";
  } else if (totalPoints >= 140000) {
    level = 14;
    tier = "Skilled";
  } else if (totalPoints >= 130000) {
    level = 13;
    tier = "Intermediate";
  } else if (totalPoints >= 120000) {
    level = 12;
    tier = "Novice";
  } else if (totalPoints >= 110000) {
    level = 11;
    tier = "Beginner";
  } else if (totalPoints >= 100000) {
    level = 10;
    tier = "Apprentice";
  } else if (totalPoints >= 90000) {
    level = 9;
    tier = "Trainee";
  } else if (totalPoints >= 80000) {
    level = 8;
    tier = "Rookie";
  } else if (totalPoints >= 70000) {
    level = 7;
    tier = "Newcomer";
  } else if (totalPoints >= 60000) {
    level = 6;
    tier = "Learner";
  } else if (totalPoints >= 50000) {
    level = 5;
    tier = "Novice";
  } else if (totalPoints >= 40000) {
    level = 4;
    tier = "Amateur";
  } else if (totalPoints >= 30000) {
    level = 3;
    tier = "Aspiring";
  } else if (totalPoints >= 20000) {
    level = 2;
    tier = "Fresher";
  } else {
    level = 1;
    tier = "Novice";
  }

  return { level, tier };
}
