"use client";

import { motion } from 'framer-motion';
import { RedirectCard } from '@/components/RedirectCard';
import { Sparkles, Target, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <RedirectCard
          title="Speedrun Stylus Portal"
          description="Embark on your Web3 learning journey with our comprehensive certification program. Complete challenges, earn badges, and mint exclusive NFTs on Arbitrum Sepolia."
          redirectUrl="https://inorbit-modules.vercel.app/nft"
          buttonText="Start Your Journey"
          features={[
            "7 Certification Levels",
            "Exclusive NFT Badges",
            "Blockchain Integration",
            "Interactive Challenges",
            "Arbitrum Sepolia Network",
            "Real-time Progress Tracking"
          ]}
          icon={<Target className="w-10 h-10 text-white" />}
        />
      </div>
    </main>
  );
}