import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const NISH_LOGO_URL = "figma:asset/f78922ecf19e5150bd6d00984ddf008f001137e5.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E67E22]/6 rounded-full blur-[100px]" />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10"
      >
        <ImageWithFallback
          src={NISH_LOGO_URL}
          alt="NISH Logo"
          className="w-24 h-24 rounded-[28px] shadow-2xl shadow-[#E67E22]/20"
        />
      </motion.div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl text-white tracking-[0.15em] mt-6 relative z-10"
        style={{ fontWeight: 700 }}
      >
        NISH
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-sm text-gray-500 mt-2 tracking-widest uppercase relative z-10"
        style={{ fontWeight: 500 }}
      >
        Precision Sports
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 w-32 h-[3px] bg-[#1A1A1A] rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.4, duration: 1.2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#E67E22] to-[#D35400] rounded-full"
        />
      </motion.div>
    </div>
  );
}
