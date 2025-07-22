import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import {
  Trophy,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Crown,
  Gem,
} from "lucide-react";

interface SuccessfulMintProps {
  mintedNFT: {
    transactionHash: string;
    metadataUrl: string;
    imageUrl: string;
  };
}

export const SuccessfulMint = ({ mintedNFT }: SuccessfulMintProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <GlassCard className="p-12 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
        <div className="mb-12">
          <motion.div
            className="relative inline-block mb-8"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400/80 via-orange-500/80 to-red-500/80 rounded-3xl flex items-center justify-center relative">
              <Trophy className="w-16 h-16 text-white" />
              <div className="absolute inset-0 bg-amber-400/30 rounded-3xl blur-2xl animate-pulse"></div>
            </div>

            <motion.div
              className="absolute -inset-8"
              animate={{ rotate: 360 }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="absolute top-0 left-1/2 w-8 h-8 text-amber-300" />
              <CheckCircle className="absolute right-0 top-1/2 w-8 h-8 text-indigo-300" />
              <Gem className="absolute bottom-0 left-1/2 w-8 h-8 text-blue-300" />
              <Crown className="absolute left-0 top-1/2 w-8 h-8 text-slate-300" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-5xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🎉 Mint Successful! 🎉
          </motion.h2>

          <motion.p
            className="text-slate-100 text-2xl leading-relaxed max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your
            <span className="text-amber-300 font-bold bg-amber-400/10 px-3 py-1 rounded-lg mx-2">
              Speedrun Stylus Achievement Badge
            </span>
            has been minted successfully!
          </motion.p>
        </div>

        {/* NFT Display */}
        <motion.div
          className="bg-slate-700/30 rounded-2xl p-6 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <img
            src={mintedNFT.imageUrl}
            alt="Speedrun Stylus NFT"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-slate-100 mb-2">
            Speedrun Stylus
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Awarded for completing first three challenges
          </p>
          <p className="text-xs text-slate-400">Just minted! 🚀</p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href={`https://sepolia.arbiscan.io/tx/${mintedNFT.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-6 py-3 rounded-xl transition-all duration-200 border border-blue-500/30 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <ExternalLink className="w-5 h-5" />
            View on Arbiscan
          </motion.a>

          <motion.a
            href={mintedNFT.metadataUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 px-6 py-3 rounded-xl transition-all duration-200 border border-purple-500/30 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ExternalLink className="w-5 h-5" />
            View Metadata
          </motion.a>
        </div>

        <motion.p
          className="text-sm text-emerald-300/70 mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <CheckCircle className="w-4 h-4" />
          NFT will appear in your wallet and on OpenSea shortly
        </motion.p>
      </GlassCard>
    </motion.div>
  );
};
