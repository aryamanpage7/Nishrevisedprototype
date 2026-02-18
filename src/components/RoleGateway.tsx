import React from 'react';
import { Target, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const NISH_LOGO_URL = "figma:asset/f78922ecf19e5150bd6d00984ddf008f001137e5.png";

interface RoleGatewayProps {
  onSelectRole: (role: 'shooter' | 'coach') => void;
}

export function RoleGateway({ onSelectRole }: RoleGatewayProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-[#E67E22]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-[#2E86C1]/6 rounded-full blur-[120px]" />
      
      {/* Top Section - Brand */}
      <div className="relative z-10 space-y-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 mb-6">
            <ImageWithFallback src={NISH_LOGO_URL} alt="NISH Logo" className="w-14 h-14 rounded-2xl shadow-lg shadow-[#E67E22]/20" />
          </div>
          <h1 className="text-5xl text-white tracking-tight" style={{ fontWeight: 700 }}>
            NISH
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[280px]">
            Train with precision.<br />
            Compete with confidence.
          </p>
        </motion.div>

        {/* Stats teaser */}
        
      </div>

      {/* Bottom Section - Role Selection */}
      <div className="relative z-10 space-y-4 w-full mt-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 mb-2"
          style={{ fontWeight: 500 }}
        >
          Choose your path
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectRole('shooter')}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-[#E67E22] to-[#D35400] p-5 rounded-[20px] text-left flex items-center justify-between shadow-xl shadow-[#E67E22]/15"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Target size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg text-white" style={{ fontWeight: 700 }}>I'm a Shooter</h3>
              <p className="text-white/60 text-xs mt-0.5">Track, train, and improve</p>
            </div>
          </div>
          <ChevronRight className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 20 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectRole('coach')}
          className="w-full group relative overflow-hidden bg-[#1A1A1A] border border-[#2E86C1]/30 p-5 rounded-[20px] text-left flex items-center justify-between hover:border-[#2E86C1]/60 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2E86C1]/10 flex items-center justify-center">
              <Shield size={22} className="text-[#2E86C1]" />
            </div>
            <div>
              <h3 className="text-lg text-white" style={{ fontWeight: 700 }}>I'm a Coach</h3>
              <p className="text-gray-500 text-xs mt-0.5">Guide your athletes to gold</p>
            </div>
          </div>
          <ChevronRight className="text-gray-600 group-hover:text-[#2E86C1] group-hover:translate-x-1 transition-all" size={20} />
        </motion.button>
      </div>
    </div>
  );
}