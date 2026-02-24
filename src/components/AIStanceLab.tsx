import React from 'react';
import { Zap, Camera, ChevronRight, Play, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const drills = [
  { name: 'Balance Training', duration: '10 min', difficulty: 'Beginner', unlocked: true },
  { name: 'Breathing Pattern', duration: '8 min', difficulty: 'Intermediate', unlocked: true },
  { name: 'Stance Correction', duration: '15 min', difficulty: 'Advanced', unlocked: true },
  { name: 'Mental Imagery', duration: '12 min', difficulty: 'Expert', unlocked: false },
];

export function AIStanceLab() {
  return (
    <div className="p-5 space-y-5 pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center shadow-lg shadow-[#E67E22]/15">
            <Zap size={17} className="text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl text-white tracking-tight" style={{ fontWeight: 700 }}>Training Lab</h1>
            <p className="text-[11px] text-gray-500 -mt-0.5">AI-powered stance analysis & guided drills</p>
          </div>
        </div>
      </motion.header>

      {/* ── AI Stance Capture ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-[#1A1A1A] rounded-[22px] overflow-hidden border border-[#222]"
      >
        <div className="aspect-[16/10] flex items-center justify-center relative bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          {/* Corner brackets */}
          <div className="absolute inset-8">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E67E22]/30 rounded-tl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#E67E22]/30 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#E67E22]/30 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E67E22]/30 rounded-br" />
          </div>

          <div className="text-center space-y-3 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/20 flex items-center justify-center mx-auto"
            >
              <Camera size={28} className="text-[#E67E22]" />
            </motion.div>
            <div>
              <p className="text-gray-300 text-sm" style={{ fontWeight: 600 }}>Analyze your stance</p>
              <p className="text-gray-600 text-xs mt-1">AI will analyze your posture in real-time</p>
            </div>
          </div>
        </div>

        {/* Single prominent capture button */}
        <div className="p-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-[#E67E22] text-[#050505] rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-[#E67E22]/15"
            style={{ fontWeight: 700 }}
          >
            <Camera size={20} />
            <span className="text-sm">Start Live Capture</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Stance Score ─────────────────────────────────── */}
      

      {/* ── Drill Cards ──────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Guided Drills</h3>
          <span className="text-[10px] text-gray-500">{drills.filter(d => d.unlocked).length}/{drills.length} unlocked</span>
        </div>

        <div className="space-y-3">
          {drills.map((drill, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              whileTap={drill.unlocked ? { scale: 0.98 } : {}}
              className={`w-full flex items-center gap-4 p-4 rounded-[18px] border text-left transition-all ${
                drill.unlocked
                  ? 'bg-[#1A1A1A] border-[#222] active:bg-[#222]'
                  : 'bg-[#111] border-[#1A1A1A] opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  drill.unlocked ? 'bg-[#E67E22]/10' : 'bg-[#1A1A1A]'
                }`}
              >
                {drill.unlocked ? (
                  <Play size={18} className="text-[#E67E22] ml-0.5" fill="#E67E22" />
                ) : (
                  <Lock size={18} className="text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-white text-sm block" style={{ fontWeight: 600 }}>{drill.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500">{drill.duration}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <span
                    className={`text-[10px] ${
                      drill.difficulty === 'Beginner'
                        ? 'text-[#27AE60]'
                        : drill.difficulty === 'Intermediate'
                          ? 'text-[#2E86C1]'
                          : drill.difficulty === 'Advanced'
                            ? 'text-[#E67E22]'
                            : 'text-[#9B59B6]'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {drill.difficulty}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-600 flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
