import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contracts";
import lighthouse from "@lighthouse-web3/sdk";

export const useMint = () => {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: isMined } = useWaitForTransactionReceipt({ hash: txHash });

  // Upload image to IPFS using Lighthouse
  const uploadImageToIPFS = async () => {
    try {
      // Fetch the GIF from the public folder
      const response = await fetch("/nft-speedrun.gif");
      if (!response.ok) {
        throw new Error("Failed to fetch GIF");
      }
      const blob = await response.blob();

      // Create a File object for Lighthouse upload
      const imageFile = new File([blob], "nft-speedrun.gif", {
        type: blob.type,
      });

      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
      if (!apiKey) {
        throw new Error("Lighthouse API key not found");
      }

      const imageResult = await lighthouse.upload([imageFile], apiKey);
      const imageIpfsUrl = `https://gateway.lighthouse.storage/ipfs/${imageResult.data.Hash}`;

      return imageIpfsUrl;
    } catch (err) {
      console.error("Error uploading image to IPFS:", err);
      throw err;
    }
  };

  // Upload metadata to IPFS using Lighthouse
  const uploadMetadataToIPFS = async (imageIpfsUrl: string) => {
    try {
      const metadata = {
        name: "Speedrun Stylus",
        description: "Awarded for completing first three challenges.",
        image: imageIpfsUrl,
      };

      // Create a Blob and File for metadata upload
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([metadataBlob], "metadata.json", {
        type: "application/json",
      });

      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
      if (!apiKey) {
        throw new Error("Lighthouse API key not found");
      }

      const metadataResult = await lighthouse.upload([metadataFile], apiKey);
      const metadataIpfsUrl = `https://gateway.lighthouse.storage/ipfs/${metadataResult.data.Hash}`;

      return metadataIpfsUrl;
    } catch (err) {
      console.error("Error uploading metadata to IPFS:", err);
      throw err;
    }
  };

  const handleMint = async () => {
    if (!address) {
      alert("Please connect your wallet.");
      return;
    }
    setIsMinting(true);
    try {
      // Upload image to IPFS
      const imageIpfsUrl = await uploadImageToIPFS();
      if (!imageIpfsUrl) {
        throw new Error("Failed to upload image to IPFS");
      }
      console.log("imageIpfsUrl", imageIpfsUrl);
      // Upload metadata to IPFS
      const metadataIpfsUrl = await uploadMetadataToIPFS(imageIpfsUrl);
      if (!metadataIpfsUrl) {
        throw new Error("Failed to upload metadata to IPFS");
      }
      console.log("metadataIpfsUrl", metadataIpfsUrl);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "safeMint",
        args: [address, metadataIpfsUrl],
      });
      setTxHash(hash);
    } catch (err) {
      console.error("Minting failed:", err);
      alert("❌ Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return { handleMint, isMinting, isMined };
};
