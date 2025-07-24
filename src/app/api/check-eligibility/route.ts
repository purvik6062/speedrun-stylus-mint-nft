import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/client";
import { userChallenges } from "@/lib/database/schema";
import { ReviewAction, ChallengeId } from "@/lib/database/schema";
import { eq, and, or } from "drizzle-orm";

const REQUIRED_CHALLENGES = [
  ChallengeId.SIMPLE_COUNTER_EXAMPLE,
  ChallengeId.SIMPLE_NFT_EXAMPLE,
  ChallengeId.VENDING_MACHINE,
];

export async function POST(request: NextRequest) {
  try {
    const { userAddress } = await request.json();

    if (!userAddress) {
      return NextResponse.json(
        { error: "User address is required" },
        { status: 400 }
      );
    }

    // console.log("Checking eligibility for address:", userAddress);

    // First, let's try to find any records for this user to debug
    const allUserRecords = await db
      .select()
      .from(userChallenges)
      .where(eq(userChallenges.userAddress, userAddress));

    // console.log("All records for user (exact case):", allUserRecords);

    // Also try lowercase
    const allUserRecordsLower = await db
      .select()
      .from(userChallenges)
      .where(eq(userChallenges.userAddress, userAddress.toLowerCase()));

    // console.log("All records for user (lowercase):", allUserRecordsLower);

    // Query the database to check if user has completed all required challenges
    // Try both exact case and lowercase to handle case sensitivity issues
    const completedChallenges = await db
      .select({
        challengeId: userChallenges.challengeId,
        reviewAction: userChallenges.reviewAction,
        submittedAt: userChallenges.submittedAt,
        githubUsername: userChallenges.githubUsername,
      })
      .from(userChallenges)
      .where(
        and(
          or(
            eq(userChallenges.userAddress, userAddress),
            eq(userChallenges.userAddress, userAddress.toLowerCase())
          ),
          eq(userChallenges.reviewAction, "ACCEPTED")
        )
      );

    // console.log("Completed challenges found:", completedChallenges);
    // console.log("Required challenges:", REQUIRED_CHALLENGES);

    // Check if all required challenges are completed
    const completedChallengeIds = completedChallenges.map((c) => c.challengeId);
    // console.log("Completed challenge IDs:", completedChallengeIds);

    const hasAllRequiredChallenges = REQUIRED_CHALLENGES.every((challengeId) =>
      completedChallengeIds.includes(challengeId)
    );

    console.log("Has all required challenges:", hasAllRequiredChallenges);

    // Count how many of the required challenges are completed
    const completedRequiredChallenges = REQUIRED_CHALLENGES.filter(
      (challengeId) => completedChallengeIds.includes(challengeId)
    ).length;

    // Get githubUsername from the most recent accepted challenge (if any)
    let githubUsername = null;
    if (completedChallenges.length > 0) {
      // Sort by submittedAt descending and take the first non-null githubUsername
      const sorted = [...completedChallenges].sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      githubUsername =
        sorted.find((c) => c.githubUsername)?.githubUsername || null;
    }

    const eligibilityData = {
      isEligible: hasAllRequiredChallenges,
      userAddress: userAddress,
      totalCompletedChallenges: completedChallenges.length, // All completed challenges
      completedRequiredChallenges: completedRequiredChallenges, // Only the required ones
      requiredChallenges: REQUIRED_CHALLENGES.length,
      challengeDetails: REQUIRED_CHALLENGES.map((challengeId) => ({
        id: challengeId,
        completed: completedChallengeIds.includes(challengeId),
        details:
          completedChallenges.find((c) => c.challengeId === challengeId) ||
          null,
      })),
      githubUsername,
    };

    // console.log("Final eligibility data:", eligibilityData);
    return NextResponse.json(eligibilityData);
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return NextResponse.json(
      { error: "Failed to check eligibility" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Use POST method with userAddress in the body" },
    { status: 405 }
  );
}
