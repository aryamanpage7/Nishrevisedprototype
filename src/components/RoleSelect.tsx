import React from 'react';
import { Target, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RoleSelectProps {
  userName: string;
  onSelectRole: (role: 'shooter' | 'coach') => void;
}

export function RoleSelect({ userName, onSelectRole }: RoleSelectProps) {
  const firstName = userName?.split(' ')[0] || 'there';

  return (
    <div className="h-full flex flex-col justify-center p-8 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-[-60px] right-[-40px] w-[250px] h-[250px] bg-[#E67E22]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[280px] h-[280px] bg-[#2E86C1]/4 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-14 h-14 rounded-2xl bg-[#E67E22]/10 border border-[#E67E22]/20 flex items-center justify-center mb-5"
          >
            <span className="text-2xl">👋</span>
          </motion.div>

          <h1 className="text-3xl text-white tracking-tight" style={{ fontWeight: 700 }}>
            Hey {firstName}!
          </h1>
          <p className="text-lg text-gray-500 mt-2 leading-relaxed">
            How will you use NISH?
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] text-gray-600 uppercase tracking-widest mb-1"
            style={{ fontWeight: 700 }}
          >
            Choose your path
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
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
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
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

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[10px] text-gray-700 text-center mt-8"
        >
          You can switch roles anytime from Settings
        </motion.p>
      </div>
    </div>
  );
}
