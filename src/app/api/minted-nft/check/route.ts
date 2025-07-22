import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get("address");

    if (!userAddress) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("minted-nft");

    const existingNFT = await collection.findOne({
      userAddress: userAddress.toLowerCase(),
    });

    return NextResponse.json({
      hasMinted: !!existingNFT,
      nft: existingNFT || null,
    });
  } catch (error) {
    console.error("Error checking minted NFT:", error);
    return NextResponse.json(
      { error: "Failed to check minted status" },
      { status: 500 }
    );
  }
}
