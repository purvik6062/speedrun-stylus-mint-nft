"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEligibility } from "@/hooks/useEligibility";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import {
  Wallet,
  Shield,
  Zap,
  Trophy,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Loader2,
  Crown,
  Gem,
  Star,
  ChevronRight,
  Award,
  Target,
  Rocket,
} from "lucide-react";
import { useMint } from "../hooks/useMint";

const CHALLENGE_NAMES = {
  "simple-counter-example": "Simple Counter Example",
  "simple-nft-example": "Simple NFT Example",
  "vending-machine": "Vending Machine",
};

const CHALLENGE_DESCRIPTIONS = {
  "simple-counter-example":
    "Build a basic counter smart contract with increment and decrement functionality",
  "simple-nft-example": "Create an NFT contract with minting capabilities",
  "vending-machine": "Develop a vending machine contract with purchase logic",
};

export default function HomePage() {
  const { handleMint, isMinting, isMined } = useMint();
  const { ready, authenticated, login, logout, user } = usePrivy();
  const userAddress = user?.wallet?.address || null;
  const {
    data: eligibility,
    isLoading: isCheckingEligibility,
    error,
  } = useEligibility(userAddress);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />

        {/* Subtle background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative mb-8">
            <motion.div
              className="w-24 h-24 mx-auto relative"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-blue-500/80 to-indigo-500/80 rounded-full flex items-center justify-center">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 w-24 h-24 mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-full h-full border-4 border-blue-400/20 rounded-full"></div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-slate-300 bg-clip-text text-transparent mb-4">
              Speedrun Portal
            </h1>
            <motion.p
              className="text-xl text-slate-300 font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Initializing your journey...
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <FloatingParticles />

      {/* Gentle gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/8 via-indigo-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-indigo-500/8 via-blue-500/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-slate-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Enhanced Header with softer colors */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400/80 to-orange-400/80 rounded-full flex items-center justify-center relative">
                <Crown className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </motion.div>

            <div className="text-center">
              <h1 className="text-7xl font-black bg-gradient-to-r from-blue-300 via-indigo-300 to-slate-300 bg-clip-text text-transparent tracking-tight">
                Speedrun Stylus
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-400/60 via-indigo-400/60 to-slate-400/60 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>

            <motion.div
              className="relative"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400/80 to-blue-400/80 rounded-full flex items-center justify-center relative">
                <Gem className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-2">
              NFT Badge Collection
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Complete the first 3 Speedrun Stylus challenges and mint your
              exclusive{" "}
              <span className="text-amber-300 font-bold bg-amber-400/10 px-2 py-1 rounded-lg">
                Golden Achievement Badge
              </span>{" "}
              on Arbitrum Sepolia!
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!authenticated ? (
              /* Wallet Connection Section with softer colors */
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
                      Connect your wallet to check your Speedrun Stylus
                      challenge completion status and mint your achievement
                      badge
                    </p>

                    <motion.button
                      onClick={login}
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
            ) : (
              /* Authenticated User Section */
              <motion.div
                key="authenticated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* User Info with softer colors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard className="p-8 backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-emerald-400/80 via-green-500/80 to-teal-500/80 rounded-2xl flex items-center justify-center relative"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="w-10 h-10 text-white" />
                          <motion.div
                            className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-lg"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-bold text-slate-100 mb-2">
                            Wallet Connected
                          </h3>
                          <p className="text-slate-300 font-mono text-lg bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                            {userAddress
                              ? `${userAddress.slice(
                                  0,
                                  8
                                )}...${userAddress.slice(-6)}`
                              : "Loading..."}
                          </p>
                          <p className="text-sm text-slate-400 flex items-center gap-2 mt-2">
                            <Zap className="w-4 h-4" />
                            Arbitrum Sepolia Network
                          </p>
                        </div>
                      </div>

                      <motion.button
                        onClick={logout}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-8 py-4 rounded-xl transition-all duration-200 border border-red-500/30 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Disconnect
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Challenge Status */}
                <AnimatePresence mode="wait">
                  {isCheckingEligibility ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <GlassCard className="p-16 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
                        <div className="flex items-center justify-center mb-8">
                          <motion.div
                            className="relative"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Loader2 className="w-16 h-16 text-blue-400" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400/20 rounded-full animate-pulse"></div>
                          </motion.div>
                          <motion.div
                            className="ml-6"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <Target className="w-12 h-12 text-indigo-400" />
                          </motion.div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-100 mb-4">
                          Analyzing Your Achievements
                        </h3>
                        <p className="text-slate-300 text-lg">
                          Scanning blockchain for completed challenges...
                        </p>
                      </GlassCard>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <GlassCard className="p-12 border-red-500/30 backdrop-blur-xl bg-red-500/5">
                        <div className="text-center">
                          <motion.div
                            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <Clock className="w-10 h-10 text-red-400" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-red-200 mb-4">
                            Connection Error
                          </h3>
                          <p className="text-red-100 text-lg">
                            Failed to check eligibility. Please try again.
                          </p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ) : eligibility ? (
                    <motion.div
                      key="eligibility"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      {/* Overall Progress Summary with softer colors */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <GlassCard className="p-10 backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
                          <div className="flex items-center gap-6 mb-10">
                            <motion.div
                              className="w-16 h-16 bg-gradient-to-br from-blue-500/80 to-indigo-500/80 rounded-2xl flex items-center justify-center relative"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                            >
                              <Award className="w-8 h-8 text-white" />
                              <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-lg animate-pulse"></div>
                            </motion.div>
                            <div>
                              <h3 className="text-4xl font-bold text-slate-100 mb-2">
                                Your Achievement Overview
                              </h3>
                              <p className="text-slate-300 text-lg">
                                Complete challenges to unlock rewards
                              </p>
                            </div>
                          </div>

                          {/* Total Progress */}
                          <div className="bg-gradient-to-r from-blue-500/8 via-indigo-500/8 to-slate-500/8 border border-blue-400/20 rounded-3xl p-8 mb-8">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-blue-400" />
                                Total Challenges Completed
                              </h4>
                              <motion.span
                                className="text-4xl font-black text-blue-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: 0.5,
                                  type: "spring",
                                  stiffness: 200,
                                }}
                              >
                                {eligibility.totalCompletedChallenges}
                              </motion.span>
                            </div>
                            <p className="text-slate-300 text-lg">
                              Great work! You&apos;ve completed{" "}
                              {eligibility.totalCompletedChallenges} challenge
                              {eligibility.totalCompletedChallenges !== 1
                                ? "s"
                                : ""}{" "}
                              on Speedrun Stylus.
                            </p>
                          </div>

                          {/* NFT Eligibility Section */}
                          <motion.div
                            className={`border-2 rounded-3xl p-8 ${
                              eligibility.isEligible
                                ? "bg-gradient-to-r from-emerald-500/8 to-green-500/8 border-emerald-400/40"
                                : "bg-gradient-to-r from-amber-500/8 to-orange-500/8 border-amber-400/40"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                                <Gem
                                  className={`w-6 h-6 ${
                                    eligibility.isEligible
                                      ? "text-emerald-400"
                                      : "text-amber-400"
                                  }`}
                                />
                                First NFT Badge Requirements
                              </h4>
                              <div className="flex items-center gap-3">
                                <motion.span
                                  className={`text-3xl font-bold ${
                                    eligibility.isEligible
                                      ? "text-emerald-400"
                                      : "text-amber-400"
                                  }`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.7, type: "spring" }}
                                >
                                  {eligibility.completedRequiredChallenges}/
                                  {eligibility.requiredChallenges}
                                </motion.span>
                                {eligibility.isEligible && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.9, type: "spring" }}
                                  >
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                  </motion.div>
                                )}
                              </div>
                            </div>

                            <p
                              className={`mb-6 text-lg ${
                                eligibility.isEligible
                                  ? "text-emerald-200"
                                  : "text-amber-200"
                              }`}
                            >
                              {eligibility.isEligible
                                ? "🎉 Congratulations! You have completed all required challenges for your first NFT badge."
                                : `Complete ${
                                    eligibility.requiredChallenges -
                                    eligibility.completedRequiredChallenges
                                  } more required challenge${
                                    eligibility.requiredChallenges -
                                      eligibility.completedRequiredChallenges !==
                                    1
                                      ? "s"
                                      : ""
                                  } to unlock your first NFT badge.`}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-semibold text-slate-100">
                                  NFT Badge Progress
                                </span>
                                <span className="text-lg font-bold text-slate-300">
                                  {Math.round(
                                    (eligibility.completedRequiredChallenges /
                                      eligibility.requiredChallenges) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden border border-slate-600/30">
                                <motion.div
                                  className={`h-4 rounded-full ${
                                    eligibility.isEligible
                                      ? "bg-gradient-to-r from-emerald-400/80 to-green-500/80"
                                      : "bg-gradient-to-r from-amber-400/80 to-orange-500/80"
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${
                                      (eligibility.completedRequiredChallenges /
                                        eligibility.requiredChallenges) *
                                      100
                                    }%`,
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    delay: 0.5,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </GlassCard>
                      </motion.div>

                      {/* Required Challenges Detail */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <GlassCard className="p-10 backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
                          <div className="flex items-center gap-6 mb-10">
                            <motion.div
                              className="w-16 h-16 bg-gradient-to-br from-indigo-500/80 to-blue-500/80 rounded-2xl flex items-center justify-center relative"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Trophy className="w-8 h-8 text-white" />
                              <div className="absolute inset-0 bg-indigo-400/20 rounded-2xl blur-lg animate-pulse"></div>
                            </motion.div>
                            <div>
                              <h3 className="text-4xl font-bold text-slate-100 mb-2">
                                Required Challenges for First NFT
                              </h3>
                              <p className="text-slate-300 text-lg">
                                Complete these 3 specific challenges to mint
                                your badge
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-8 mb-10">
                            {eligibility.challengeDetails.map(
                              (challenge, index) => (
                                <motion.div
                                  key={challenge.id}
                                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                                    challenge.completed
                                      ? "bg-gradient-to-r from-emerald-500/8 to-green-500/8 border-emerald-400/40 shadow-lg shadow-emerald-500/10"
                                      : "bg-gradient-to-r from-slate-800/30 to-slate-700/30 border-slate-600/40"
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index }}
                                  whileHover={{ scale: 1.02, y: -5 }}
                                >
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 mr-8">
                                      {challenge.completed ? (
                                        <motion.div
                                          className="relative"
                                          whileHover={{ rotate: 360 }}
                                          transition={{ duration: 0.8 }}
                                        >
                                          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/80 to-green-500/80 rounded-2xl flex items-center justify-center relative">
                                            <CheckCircle className="w-10 h-10 text-white" />
                                            <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-lg animate-pulse"></div>
                                          </div>
                                          <motion.div
                                            className="absolute -top-2 -right-2"
                                            animate={{
                                              rotate: 360,
                                              scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                              duration: 3,
                                              repeat: Number.POSITIVE_INFINITY,
                                            }}
                                          >
                                            <Star className="w-8 h-8 text-amber-300" />
                                          </motion.div>
                                        </motion.div>
                                      ) : (
                                        <div className="w-20 h-20 border-4 border-slate-500 border-dashed rounded-2xl flex items-center justify-center">
                                          <Clock className="w-8 h-8 text-slate-400" />
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex-grow">
                                      <h4 className="text-2xl font-bold text-slate-100 mb-3">
                                        {index + 1}.{" "}
                                        {
                                          CHALLENGE_NAMES[
                                            challenge.id as keyof typeof CHALLENGE_NAMES
                                          ]
                                        }
                                      </h4>
                                      <p className="text-slate-300 mb-4 text-lg leading-relaxed">
                                        {
                                          CHALLENGE_DESCRIPTIONS[
                                            challenge.id as keyof typeof CHALLENGE_DESCRIPTIONS
                                          ]
                                        }
                                      </p>
                                      <div className="flex items-center gap-6">
                                        <span
                                          className={`px-4 py-2 rounded-full text-lg font-semibold ${
                                            challenge.completed
                                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                              : "bg-slate-600/20 text-slate-400 border border-slate-600/30"
                                          }`}
                                        >
                                          {challenge.completed
                                            ? "✓ Completed"
                                            : "○ Pending"}
                                        </span>
                                        {challenge.details && (
                                          <span className="text-sm text-slate-400 flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-lg">
                                            <Clock className="w-4 h-4" />
                                            {new Date(
                                              challenge.details.submittedAt
                                            ).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </GlassCard>
                      </motion.div>

                      {/* Mint Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <GlassCard className="p-12 text-center backdrop-blur-xl bg-slate-800/20 border border-slate-700/30">
                          {eligibility.isEligible ? (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            >
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
                                    <Star className="absolute right-0 top-1/2 w-8 h-8 text-indigo-300" />
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
                                  🎉 Congratulations! 🎉
                                </motion.h2>

                                <motion.p
                                  className="text-slate-100 text-2xl leading-relaxed max-w-3xl mx-auto"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  You&apos;ve completed all required challenges
                                  and earned the right to mint your
                                  <span className="text-amber-300 font-bold bg-amber-400/10 px-3 py-1 rounded-lg mx-2">
                                    Exclusive Achievement Badge!
                                  </span>
                                </motion.p>
                              </div>

                              <motion.button
                                onClick={handleMint}
                                disabled={isMinting}
                                className="group relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-8 px-16 rounded-3xl text-2xl transition-all duration-300 overflow-hidden shadow-2xl"
                                whileHover={{
                                  scale: 1.05,
                                  boxShadow:
                                    "0 30px 60px rgba(251, 191, 36, 0.5)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                              >
                                <span className="relative z-10 flex items-center gap-4">
                                  {isMinting ? (
                                    <>
                                      <Loader2 className="w-8 h-8 animate-spin" />
                                      Minting Your Badge...
                                    </>
                                  ) : (
                                    <>
                                      <Gem className="w-8 h-8 group-hover:animate-bounce" />
                                      Mint Your Achievement Badge
                                      <Sparkles className="w-8 h-8 group-hover:animate-pulse" />
                                    </>
                                  )}
                                </span>
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  whileHover={{ scale: 1.1 }}
                                />
                              </motion.button>
                              {isMined && (
                                <p className="text-green-500 mt-4 text-xl">
                                  🎉 NFT minted successfully! Check your wallet
                                  for your new badge!
                                </p>
                              )}

                              <motion.p
                                className="text-sm text-amber-300/70 mt-8 flex items-center justify-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                              >
                                <Shield className="w-4 h-4" />
                                Will be minted on Arbitrum Sepolia • Gas fees
                                may apply
                              </motion.p>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8 }}
                            >
                              <div className="mb-12">
                                <motion.div
                                  className="w-32 h-32 bg-gradient-to-br from-amber-500/80 to-orange-500/80 rounded-3xl flex items-center justify-center mx-auto mb-8 relative"
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                >
                                  <Clock className="w-16 h-16 text-white" />
                                  <div className="absolute inset-0 bg-amber-400/20 rounded-3xl blur-xl animate-pulse"></div>
                                </motion.div>

                                <h2 className="text-5xl font-bold text-amber-300 mb-6">
                                  Keep Going! 💪
                                </h2>
                                <p className="text-slate-100 text-2xl leading-relaxed max-w-2xl mx-auto">
                                  Complete all 3 required challenges to unlock
                                  your exclusive achievement badge
                                </p>
                              </div>

                              <div className="mb-12">
                                <motion.button
                                  disabled
                                  className="bg-slate-600/50 text-slate-400 font-bold py-8 px-16 rounded-3xl text-2xl cursor-not-allowed border-2 border-slate-600/30"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  Complete Challenges to Mint
                                </motion.button>
                              </div>

                              <motion.a
                                href="https://Speedrunstylus.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 text-blue-300 hover:text-blue-200 font-bold text-xl transition-colors group bg-blue-500/10 px-8 py-4 rounded-2xl border border-blue-500/30"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Rocket className="w-6 h-6" />
                                Visit Speedrun Stylus Platform
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                >
                                  <ExternalLink className="w-6 h-6" />
                                </motion.div>
                              </motion.a>
                            </motion.div>
                          )}
                        </GlassCard>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
