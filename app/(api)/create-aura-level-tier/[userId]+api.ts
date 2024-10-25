import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const { userId, totalPoints } = await request.json();

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Calculate new level and tier based on totalPoints
    const { level, tier } = calculateLevelAndTier(totalPoints);

    // Insert the new aura level tier into the database
    await sql`
      INSERT INTO user_aura_points (user_id, total_points, level, tier)
      VALUES (${userId}, ${totalPoints}, ${level}, ${tier});
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error creating aura level and tier:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Helper function to calculate level and tier
function calculateLevelAndTier(totalPoints: number) {
  let level = 1;
  let tier = "Novice";

  if (totalPoints >= 1000000) {
    level = 50;
    tier = "Transcendent";
  } else if (totalPoints >= 750000) {
    level = 45;
    tier = "Legendary";
  } else if (totalPoints >= 500000) {
    level = 40;
    tier = "Mythical";
  } else if (totalPoints >= 350000) {
    level = 35;
    tier = "Grandmaster";
  } else if (totalPoints >= 250000) {
    level = 30;
    tier = "Master";
  } else if (totalPoints >= 175000) {
    level = 25;
    tier = "Expert";
  } else if (totalPoints >= 120000) {
    level = 20;
    tier = "Veteran";
  } else if (totalPoints >= 80000) {
    level = 15;
    tier = "Adept";
  } else if (totalPoints >= 50000) {
    level = 10;
    tier = "Skilled";
  } else if (totalPoints >= 30000) {
    level = 9;
    tier = "Proficient";
  } else if (totalPoints >= 20000) {
    level = 8;
    tier = "Intermediate";
  } else if (totalPoints >= 12000) {
    level = 7;
    tier = "Capable";
  } else if (totalPoints >= 8000) {
    level = 6;
    tier = "Competent";
  } else if (totalPoints >= 5000) {
    level = 5;
    tier = "Novice";
  } else if (totalPoints >= 3000) {
    level = 4;
    tier = "Beginner";
  } else if (totalPoints >= 2000) {
    level = 3;
    tier = "Apprentice";
  } else if (totalPoints >= 1500) {
    level = 2;
    tier = "Initiate";
  } else if (totalPoints >= 1000) {
    level = 1;
    tier = "Newcomer";
  } else {
    level = 0;
    tier = "Unranked";
  }

  return { level, tier };
}
