"use client";

import { useParams, useRouter } from "next/navigation";
import { useMintedStatus } from "@/hooks/useMintedStatus";
import { MintedNFTDisplay } from "@/components/MintedNFTDisplay";
import { SuccessfulMint } from "@/components/SuccessfulMint";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NFTPage() {
  const { levelKey } = useParams();
  const router = useRouter();
  const { user } = usePrivy();
  const userAddress = user?.wallet?.address || null;
  const { nfts, isLoading, error } = useMintedStatus(userAddress);
  const [justMinted, setJustMinted] = useState(false);

  // Check if this is a just minted NFT (from URL params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setJustMinted(urlParams.get('justMinted') === 'true');
  }, []);

  // Find the NFT for this levelKey
  const nft = nfts?.find((n) => n.levelKey === levelKey || n.level === parseInt(levelKey as string));

  if (!userAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />
        <GlassCard className="p-12 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Wallet Not Connected</h2>
          <p className="text-slate-300 mb-6">Please connect your wallet to view your NFT.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-6 py-3 rounded-xl transition-all duration-200 border border-blue-500/30 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </GlassCard>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />
        <GlassCard className="p-12 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
          <motion.div
            className="relative flex justify-center items-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Loader2 className="w-16 h-16 text-blue-400" />
            {/* <div className="flex justify-centerabsolute inset-0 w-16 h-16 border-4 border-blue-400/20 rounded-full animate-pulse"></div> */}
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100 mt-6 mb-4">Loading NFT...</h2>
          <p className="text-slate-300">Fetching your minted NFT data...</p>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />
        <GlassCard className="p-12 text-center backdrop-blur-xl bg-red-500/5 border border-red-500/30">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-red-200 mb-4">Error Loading NFT</h2>
          <p className="text-red-100 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-6 py-3 rounded-xl transition-all duration-200 border border-blue-500/30 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </GlassCard>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />
        <GlassCard className="p-12 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
          <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-100 mb-4">NFT Not Found</h2>
          <p className="text-slate-300 mb-6">
            No NFT found for Level {levelKey}. You may need to mint this level first.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-6 py-3 rounded-xl transition-all duration-200 border border-blue-500/30 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <FloatingParticles />

      {/* Back button */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-slate-200 px-4 py-2 rounded-xl transition-all duration-200 border border-slate-600/30 font-medium backdrop-blur-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {justMinted ? (
          <SuccessfulMint mintedNFT={nft} levelKey={levelKey as string} />
        ) : (
          <MintedNFTDisplay nft={nft} levelKey={levelKey as string} />
        )}
      </div>
    </div>
  );
} 