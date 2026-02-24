import React from 'react';
import { Target, Shield, ChevronRight, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const NISH_LOGO_URL = "figma:asset/f78922ecf19e5150bd6d00984ddf008f001137e5.png";

/* ── Welcome / Landing Page ─────────────────────────────────
   Shown right after onboarding slides. Has brand identity
   and prominent Sign Up / Sign In CTA buttons.
──────────────────────────────────────────────────────────── */

interface RoleGatewayProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

export function RoleGateway({ onSignUp, onSignIn }: RoleGatewayProps) {
  return (
    <div className="h-full flex flex-col justify-between p-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-[#E67E22]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-[#2E86C1]/6 rounded-full blur-[120px]" />

      {/* ── Top: Brand ── */}
      <div className="relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <ImageWithFallback
              src={NISH_LOGO_URL}
              alt="NISH Logo"
              className="w-16 h-16 rounded-2xl shadow-lg shadow-[#E67E22]/20 mb-2"
            />
          </motion.div>

          <h1 className="text-5xl text-white tracking-tight" style={{ fontWeight: 700 }}>
            NISH
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[280px]">
            Train with precision.<br />
            Compete with confidence.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 mt-8"
        >
          {[
            { label: 'Shot Tracking', icon: Target, color: '#E67E22' },
            { label: 'AI Analysis', icon: Shield, color: '#2E86C1' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-3.5 py-2 rounded-full"
            >
              <item.icon size={14} style={{ color: item.color }} />
              <span className="text-xs text-gray-400" style={{ fontWeight: 500 }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom: Auth CTAs ── */}
      <div className="relative z-10 space-y-3 pb-4">
        {/* Sign Up — primary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSignUp}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-[#E67E22] to-[#D35400] p-5 rounded-[20px] flex items-center justify-between shadow-xl shadow-[#E67E22]/15"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <UserPlus size={22} className="text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg text-white" style={{ fontWeight: 700 }}>Sign Up</h3>
              <p className="text-white/60 text-xs mt-0.5">Create your free account</p>
            </div>
          </div>
          <ArrowRight className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
        </motion.button>

        {/* Sign In — secondary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 20 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSignIn}
          className="w-full group relative overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-[20px] flex items-center justify-between hover:border-[#333] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center">
              <LogIn size={22} className="text-gray-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg text-white" style={{ fontWeight: 700 }}>Sign In</h3>
              <p className="text-gray-500 text-xs mt-0.5">Welcome back, shooter</p>
            </div>
          </div>
          <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
        </motion.button>

        {/* Legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-[10px] text-gray-700 text-center pt-2"
        >
          By continuing, you agree to our{' '}
          <span className="text-gray-500">Terms</span> &amp;{' '}
          <span className="text-gray-500">Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  );
}
