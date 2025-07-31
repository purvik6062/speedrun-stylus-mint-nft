import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contracts";

export const useMint = () => {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [mintedNFT, setMintedNFT] = useState<{
    transactionHash: string;
    metadataUrl: string;
    imageUrl: string;
    levelName?: string;
    level?: number;
  } | null>(null);

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: isMined } = useWaitForTransactionReceipt({ hash: txHash });

  // Store minted NFT to MongoDB
  const storeMintedNFT = async (
    transactionHash: string,
    metadataUrl: string,
    imageUrl: string,
    githubUsername?: string,
    levelName?: string,
    level?: number,
    levelKey?: string
  ) => {
    try {
      const response = await fetch("/api/minted-nft/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: address,
          transactionHash,
          metadataUrl,
          imageUrl,
          ...(githubUsername ? { githubUsername } : {}),
          ...(levelName ? { levelName } : {}),
          ...(level ? { level } : {}),
          ...(levelKey ? { levelKey } : {}),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to store minted NFT");
      }

      return await response.json();
    } catch (error) {
      console.error("Error storing minted NFT:", error);
      throw error;
    }
  };

  const handleMint = async (githubUsername?: string, levelKey?: string) => {
    if (!address) {
      alert("Please connect your wallet.");
      return;
    }
    setIsMinting(true);
    try {
      let metadataUrl = "ipfs://QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg"; // Default for backward compatibility
      let levelName = "Participation NFT";
      let level = 1;

      // If levelKey is provided, get the specific metadata for that level
      if (levelKey) {
        const response = await fetch("/api/mint-nft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userAddress: address, levelKey }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get mint data");
        }

        const mintData = await response.json();
        metadataUrl = mintData.metadataUrl;
        levelName = mintData.levelName;
        level = mintData.level;
      }

      // Mint NFT using the metadata URL
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "safeMint",
        args: [address, metadataUrl],
      });
      setTxHash(hash);

      // Store minted NFT data in MongoDB
      await storeMintedNFT(
        hash,
        "https://gateway.pinata.cloud/ipfs/QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
        "https://gateway.pinata.cloud/ipfs/QmRxjxsC6kxPSoT2ouu1RRFsmBU8hjs53TEaAiHLJWKhJg",
        githubUsername,
        levelName,
        level,
        levelKey
      );

      // Set minted NFT data for display
      setMintedNFT({
        transactionHash: hash,
        metadataUrl:
          "https://gateway.pinata.cloud/ipfs/QmfDnwK3xWmQi1jJBJdcpMspu1xfDnpzn7R8fqzpWHiDzg",
        imageUrl:
          "https://gateway.pinata.cloud/ipfs/QmRxjxsC6kxPSoT2ouu1RRFsmBU8hjs53TEaAiHLJWKhJg",
        levelName,
        level,
      });
    } catch (err) {
      console.error("Minting failed:", err);
      alert("❌ Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return { handleMint, isMinting, isMined, mintedNFT };
};
