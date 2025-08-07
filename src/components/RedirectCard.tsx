"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles, Target } from "lucide-react";

interface RedirectCardProps {
  title: string;
  description: string;
  redirectUrl: string;
  buttonText: string;
  features?: string[];
  icon?: React.ReactNode;
}

export function RedirectCard({
  title,
  description,
  redirectUrl,
  buttonText,
  features = [],
  icon
}: RedirectCardProps) {
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for the button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleRedirect = () => {
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="relative max-w-2xl w-full bg-slate-800/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Decorative Gradient Border */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-blue-600/30 opacity-50"></div>

      {/* Card Content */}
      <div className="relative p-10 text-center">
        {/* Icon */}
        {icon && (
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-500/80 to-indigo-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 relative"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
            <motion.div
              className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl font-black text-slate-100 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-slate-300 mb-8 text-lg leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {description}
        </motion.p>

        {/* Features */}
        {features.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Redirect Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleRedirect}
        >
          <span>{buttonText}</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {/* External Link Indicator */}
        <motion.p
          className="text-slate-400 text-sm mt-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ExternalLink className="w-4 h-4" />
          Opens in new tab
        </motion.p>
      </div>
    </motion.div>
  );
}
