import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { Wallet, Shield, Sparkles, ChevronRight } from "lucide-react";

interface WalletConnectionProps {
  onLogin: () => void;
}

export const WalletConnection = ({ onLogin }: WalletConnectionProps) => {
  return (
    <motion.div
      key="connect"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-16 text-center max-w-3xl mx-auto backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
        <motion.div
          className="mb-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-slate-500/80 rounded-3xl flex items-center justify-center mx-auto mb-8 relative"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.2)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Wallet className="w-16 h-16 text-white" />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Sparkles className="w-12 h-12 text-amber-300" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4"
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Shield className="w-10 h-10 text-emerald-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold text-slate-100 mb-6">
            Connect Your Wallet
          </h2>
          <p className="text-slate-300 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Connect your wallet to check your Speedrun Stylus challenge
            completion status and mint your achievement badge
          </p>

          <motion.button
            onClick={onLogin}
            className="group relative bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-slate-500/90 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 overflow-hidden shadow-2xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-4">
              <Shield className="w-7 h-7" />
              Connect Wallet
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <ChevronRight className="w-7 h-7" />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            />
          </motion.button>

          <motion.p
            className="text-sm text-slate-400 mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Shield className="w-4 h-4" />
            Secured by Privy • Arbitrum Sepolia Network
          </motion.p>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};
