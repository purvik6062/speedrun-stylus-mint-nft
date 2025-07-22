import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, MintedNFT } from "@/lib/database/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userAddress, transactionHash, metadataUrl, imageUrl } = body;

    if (!userAddress || !transactionHash || !metadataUrl || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("minted-nft");

    // Check if user has already minted
    const existingNFT = await collection.findOne({
      userAddress: userAddress.toLowerCase(),
    });

    if (existingNFT) {
      return NextResponse.json(
        { error: "User has already minted an NFT" },
        { status: 409 }
      );
    }

    const mintedNFT: MintedNFT = {
      userAddress: userAddress.toLowerCase(),
      transactionHash,
      metadataUrl,
      imageUrl,
      mintedAt: new Date(),
      network: "arbitrum-sepolia",
    };

    const result = await collection.insertOne(mintedNFT);

    return NextResponse.json({
      success: true,
      nft: { ...mintedNFT, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error storing minted NFT:", error);
    return NextResponse.json(
      { error: "Failed to store minted NFT" },
      { status: 500 }
    );
  }
}
