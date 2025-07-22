import { useState, useEffect } from "react";
import { MintedNFT } from "@/lib/database/mongodb";

export const useMintedStatus = (userAddress: string | null) => {
  const [mintedData, setMintedData] = useState<{
    hasMinted: boolean;
    nft: MintedNFT | null;
    isLoading: boolean;
    error: string | null;
  }>({
    hasMinted: false,
    nft: null,
    isLoading: false,
    error: null,
  });

  const checkMintedStatus = async () => {
    if (!userAddress) {
      setMintedData((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    setMintedData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `/api/minted-nft/check?address=${userAddress}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to check minted status");
      }

      setMintedData({
        hasMinted: data.hasMinted,
        nft: data.nft,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error checking minted status:", error);
      setMintedData((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  };

  useEffect(() => {
    checkMintedStatus();
  }, [userAddress]);

  return {
    ...mintedData,
    refetch: checkMintedStatus,
  };
};
