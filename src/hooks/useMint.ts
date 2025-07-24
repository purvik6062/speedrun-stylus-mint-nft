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
  } | null>(null);

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: isMined } = useWaitForTransactionReceipt({ hash: txHash });

  // Upload file to Pinata using REST API
  const uploadFileToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    return await response.json();
  };

  // Upload JSON to Pinata using REST API
  const uploadJSONToPinata = async (jsonData: any) => {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: JSON.stringify({
          pinataContent: jsonData,
          pinataMetadata: {
            name: "Speedrun Stylus NFT Metadata",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Pinata JSON upload failed: ${response.statusText}`);
    }

    return await response.json();
  };

  // Upload image to IPFS using Pinata
  const uploadImageToIPFS = async () => {
    try {
      // Fetch the GIF from the public folder
      const response = await fetch("/speedrun-stylus-nft.png");
      if (!response.ok) {
        throw new Error("Failed to fetch GIF");
      }
      const blob = await response.blob();

      // Create a File object for Pinata upload
      const imageFile = new File([blob], "speedrun-stylus-nft.png", {
        type: blob.type,
      });

      const imageResult = await uploadFileToPinata(imageFile);

      console.log("Image uploaded to Pinata:", imageResult);

      // Return ipfs:// URL for metadata and https:// for display
      return {
        ipfsUrl: `ipfs://${imageResult.IpfsHash}`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${imageResult.IpfsHash}`,
      };
    } catch (err) {
      console.error("Error uploading image to IPFS:", err);
      throw err;
    }
  };

  // Upload metadata to IPFS using Pinata
  const uploadMetadataToIPFS = async (imageIpfsUrl: string) => {
    try {
      const metadata = {
        name: "Speedrun Stylus",
        description: "Awarded for completing first three challenges.",
        image: imageIpfsUrl, // Use ipfs:// URL in metadata
        attributes: [
          {
            trait_type: "Achievement",
            value: "First Three Challenges",
          },
          {
            trait_type: "Platform",
            value: "Speedrun Stylus",
          },
          {
            trait_type: "Network",
            value: "Arbitrum Sepolia",
          },
        ],
      };

      const metadataResult = await uploadJSONToPinata(metadata);

      console.log("Metadata uploaded to Pinata:", metadataResult);

      // Return both ipfs:// URL for contract and https:// for display
      return {
        ipfsUrl: `ipfs://${metadataResult.IpfsHash}`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${metadataResult.IpfsHash}`,
      };
    } catch (err) {
      console.error("Error uploading metadata to IPFS:", err);
      throw err;
    }
  };

  // Store minted NFT to MongoDB
  const storeMintedNFT = async (
    transactionHash: string,
    metadataUrl: string,
    imageUrl: string,
    githubUsername?: string
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

  const handleMint = async (githubUsername?: string) => {
    if (!address) {
      alert("Please connect your wallet.");
      return;
    }
    setIsMinting(true);
    try {
      // // Upload image to IPFS
      // const imageResult = await uploadImageToIPFS();
      // if (!imageResult) {
      //   throw new Error("Failed to upload image to IPFS");
      // }
      // console.log("imageIpfsUrl", imageResult.ipfsUrl);
      // console.log("imageGatewayUrl", imageResult.gatewayUrl);

      // // Upload metadata to IPFS (using ipfs:// URL for image in metadata)
      // const metadataResult = await uploadMetadataToIPFS(imageResult.ipfsUrl);
      // if (!metadataResult) {
      //   throw new Error("Failed to upload metadata to IPFS");
      // }
      // console.log("metadataIpfsUrl", metadataResult.ipfsUrl);
      // console.log("metadataGatewayUrl", metadataResult.gatewayUrl);

      // Mint NFT using the ipfs:// URL for metadata
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "safeMint",
        // args: [address, metadataResult.ipfsUrl], // Use ipfs:// URL for contract
        args: [
          address,
          "ipfs://QmcyJ5rUWMwqu62afZvTDvqcJ1jfRWdTEhuxePMnHN6LTN",
        ], // Use ipfs:// URL for contract
      });
      setTxHash(hash);

      // // Store minted NFT data in MongoDB
      // await storeMintedNFT(
      //   hash,
      //   metadataResult.gatewayUrl,
      //   imageResult.gatewayUrl
      // );

      // // Set minted NFT data for display
      // setMintedNFT({
      //   transactionHash: hash,
      //   metadataUrl: metadataResult.gatewayUrl,
      //   imageUrl: imageResult.gatewayUrl,
      // });

      // Store minted NFT data in MongoDB
      await storeMintedNFT(
        hash,
        "https://gateway.pinata.cloud/ipfs/QmcyJ5rUWMwqu62afZvTDvqcJ1jfRWdTEhuxePMnHN6LTN",
        "https://gateway.pinata.cloud/ipfs/QmWs5M9ZhuCEJTQSmiqWE6zZxW2LJH18EyDSq8HZ1AWKAh",
        githubUsername
      );

      // Set minted NFT data for display
      setMintedNFT({
        transactionHash: hash,
        metadataUrl:
          "https://gateway.pinata.cloud/ipfs/QmcyJ5rUWMwqu62afZvTDvqcJ1jfRWdTEhuxePMnHN6LTN",
        imageUrl:
          "https://gateway.pinata.cloud/ipfs/QmWs5M9ZhuCEJTQSmiqWE6zZxW2LJH18EyDSq8HZ1AWKAh",
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
