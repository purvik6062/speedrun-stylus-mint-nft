import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/client";
import { userChallenges } from "@/lib/database/schema";
import { ReviewAction, ChallengeId } from "@/lib/database/schema";
import { eq, and, or } from "drizzle-orm";

// Define all certification levels with their required challenges
const CERTIFICATION_LEVELS = {
  "web3-basics": {
    name: "Web3 Basics with Stylus",
    description: "Complete challenges 1-3 to earn your first NFT badge",
    requiredChallenges: [
      ChallengeId.SIMPLE_COUNTER_EXAMPLE,
      ChallengeId.SIMPLE_NFT_EXAMPLE,
      ChallengeId.VENDING_MACHINE,
    ],
    level: 1,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg", // Same image for all levels
  },
  "core-stylus": {
    name: "Core Stylus Engineering",
    description: "Complete challenges 4-5 to earn your second NFT badge",
    requiredChallenges: [ChallengeId.MULTISIG_WALLET, ChallengeId.UNISWAP_V2_STYLUS],
    level: 2,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
  "zkp-basics": {
    name: "ZKP Basics with Stylus",
    description: "Complete challenges 6-8 to earn your third NFT badge",
    requiredChallenges: [
      ChallengeId.ZKP_AGE,
      ChallengeId.ZKP_BALANCE,
      ChallengeId.ZKP_PASSWORD,
    ],
    level: 3,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
  "zkp-advanced": {
    name: "ZKP Advanced with Stylus",
    description: "Complete challenges 9-11 to earn your fourth NFT badge",
    requiredChallenges: [
      ChallengeId.ZKP_LOCATION,
      ChallengeId.ZKP_MODEL,
      ChallengeId.ZKP_PUBLIC_DOC_VERIFIER,
    ],
    level: 4,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
  "agentic-defi": {
    name: "Agentic DeFi Basics",
    description: "Complete challenge 12 to earn your fifth NFT badge",
    requiredChallenges: [ChallengeId.VIBEKIT_SETUP],
    level: 5,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
  "agentic-wallets": {
    name: "Agentic Wallets & Signals",
    description: "Complete challenges 13-14 to earn your sixth NFT badge",
    requiredChallenges: [ChallengeId.VIBEKIT_BASIC_AGENTS, ChallengeId.VIBEKIT_ADVANCED_AGENTS],
    level: 6,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
  "farcaster-miniapps": {
    name: "Farcaster Miniapps with Stylus",
    description: "Complete challenge 15 to earn your final NFT badge",
    requiredChallenges: [ChallengeId.FARCASTER_MINIAPPS],
    level: 7,
    metadataUrl: "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
  },
};

export async function POST(request: NextRequest) {
  try {
    const { userAddress, levelKey } = await request.json();

    if (!userAddress) {
      return NextResponse.json(
        { error: "User address is required" },
        { status: 400 }
      );
    }

    if (
      !levelKey ||
      !CERTIFICATION_LEVELS[levelKey as keyof typeof CERTIFICATION_LEVELS]
    ) {
      return NextResponse.json(
        { error: "Invalid certification level" },
        { status: 400 }
      );
    }

    const certificationLevel =
      CERTIFICATION_LEVELS[levelKey as keyof typeof CERTIFICATION_LEVELS];

    // Check if user has completed all required challenges for this level
    const completedChallenges = await db
      .select({
        challengeId: userChallenges.challengeId,
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

    const completedChallengeIds = completedChallenges.map((c) => c.challengeId);

    const hasAllRequiredChallenges =
      certificationLevel.requiredChallenges.every((challengeId) =>
        completedChallengeIds.includes(challengeId)
      );

    if (!hasAllRequiredChallenges) {
      return NextResponse.json(
        {
          error:
            "User has not completed all required challenges for this level",
        },
        { status: 403 }
      );
    }

    // Return the metadata URL for minting
    return NextResponse.json({
      success: true,
      metadataUrl: certificationLevel.metadataUrl,
      levelName: certificationLevel.name,
      level: certificationLevel.level,
    });
  } catch (error) {
    console.error("Error checking mint eligibility:", error);
    return NextResponse.json(
      { error: "Failed to check mint eligibility" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Use POST method with userAddress and levelKey in the body" },
    { status: 405 }
  );
}
