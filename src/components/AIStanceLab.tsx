import React, { useState } from 'react';
import { Zap, Camera, Upload, ChevronRight, CheckCircle, AlertCircle, Sparkles, Play, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const insights = [
  { 
    title: 'Hip Alignment', 
    status: 'warning', 
    detail: 'Your hip stability decreased 15% in last 10 shots. Try widening your stance slightly.',
    score: 72,
  },
  { 
    title: 'Shoulder Position', 
    status: 'good', 
    detail: 'Excellent shoulder stability. Consistent across all sessions this week.',
    score: 94,
  },
  { 
    title: 'Trigger Discipline', 
    status: 'good', 
    detail: 'Clean trigger pull with minimal jerk. Keep it up!',
    score: 88,
  },
];

const drills = [
  { name: 'Balance Training', duration: '10 min', difficulty: 'Beginner', unlocked: true },
  { name: 'Breathing Pattern', duration: '8 min', difficulty: 'Intermediate', unlocked: true },
  { name: 'Stance Correction', duration: '15 min', difficulty: 'Advanced', unlocked: true },
  { name: 'Mental Imagery', duration: '12 min', difficulty: 'Expert', unlocked: false },
];

export function AIStanceLab() {
  const [activeSection, setActiveSection] = useState<'analyze' | 'drills'>('analyze');

  return (
    <div className="p-5 space-y-6 pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-2xl text-white tracking-tight" style={{ fontWeight: 700 }}>Training Lab</h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">AI-powered stance analysis & guided drills</p>
      </motion.header>

      {/* Section Toggle */}
      <div className="flex gap-2 bg-[#111] p-1 rounded-[14px]">
        <button
          onClick={() => setActiveSection('analyze')}
          className={`flex-1 py-2.5 rounded-[12px] text-sm transition-all ${
            activeSection === 'analyze'
              ? 'bg-[#1A1A1A] text-white shadow-sm'
              : 'text-gray-500'
          }`}
          style={{ fontWeight: activeSection === 'analyze' ? 600 : 400 }}
        >
          Analyze
        </button>
        <button
          onClick={() => setActiveSection('drills')}
          className={`flex-1 py-2.5 rounded-[12px] text-sm transition-all ${
            activeSection === 'drills'
              ? 'bg-[#1A1A1A] text-white shadow-sm'
              : 'text-gray-500'
          }`}
          style={{ fontWeight: activeSection === 'drills' ? 600 : 400 }}
        >
          Drills
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'analyze' ? (
          <motion.div
            key="analyze"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-5"
          >
            {/* Camera / Upload Area */}
            <div className="bg-[#1A1A1A] rounded-[20px] overflow-hidden border border-[#222] relative">
              <div className="aspect-[4/3] flex items-center justify-center relative bg-gradient-to-b from-[#111] to-[#0a0a0a]">
                {/* Decorative grid */}
                <div className="absolute inset-8 border border-dashed border-white/[0.04] rounded-2xl" />
                <div className="absolute inset-16 border border-dashed border-white/[0.04] rounded-xl" />
                
                <div className="text-center space-y-4 relative z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/20 flex items-center justify-center mx-auto"
                  >
                    <Camera size={28} className="text-[#E67E22]" />
                  </motion.div>
                  <div>
                    <p className="text-gray-400 text-sm" style={{ fontWeight: 500 }}>Record your stance</p>
                    <p className="text-gray-600 text-xs mt-1">AI will analyze your posture in real-time</p>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="p-4 flex gap-3">
                <button className="flex-1 py-3.5 bg-[#E67E22] text-[#050505] rounded-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#E67E22]/15" style={{ fontWeight: 700 }}>
                  <Camera size={18} />
                  <span>Live Capture</span>
                </button>
                <button className="py-3.5 px-5 bg-[#222] text-gray-300 rounded-[14px] flex items-center justify-center gap-2 border border-[#333]" style={{ fontWeight: 500 }}>
                  <Upload size={18} />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#E67E22]" />
                <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Latest Insights</h3>
              </div>
              
              <div className="space-y-3">
                {insights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {insight.status === 'good' ? (
                          <CheckCircle size={16} className="text-[#27AE60]" />
                        ) : (
                          <AlertCircle size={16} className="text-[#E67E22]" />
                        )}
                        <span className="text-white text-sm" style={{ fontWeight: 600 }}>{insight.title}</span>
                      </div>
                      <span className={`text-sm ${insight.score >= 85 ? 'text-[#27AE60]' : 'text-[#E67E22]'}`} style={{ fontWeight: 700 }}>{insight.score}%</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{insight.detail}</p>
                    
                    {/* Score bar */}
                    <div className="mt-3 h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.score}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${insight.score >= 85 ? 'bg-[#27AE60]' : 'bg-[#E67E22]'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="drills"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            {/* Overall stance score */}
            <div className="bg-gradient-to-br from-[#E67E22]/10 to-transparent rounded-[20px] p-5 border border-[#E67E22]/10 text-center">
              <span className="text-[10px] text-[#E67E22] uppercase tracking-wider" style={{ fontWeight: 700 }}>Stance Score</span>
              <div className="text-4xl text-white mt-1" style={{ fontWeight: 800 }}>84</div>
              <p className="text-xs text-gray-500 mt-1">Complete drills to improve your score</p>
            </div>

            {/* Drill Cards */}
            <div className="space-y-3">
              {drills.map((drill, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[16px] border text-left transition-all ${
                    drill.unlocked 
                      ? 'bg-[#1A1A1A] border-[#222] active:bg-[#222]' 
                      : 'bg-[#111] border-[#1A1A1A] opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    drill.unlocked ? 'bg-[#E67E22]/10' : 'bg-[#1A1A1A]'
                  }`}>
                    {drill.unlocked ? (
                      <Play size={18} className="text-[#E67E22] ml-0.5" fill="#E67E22" />
                    ) : (
                      <Lock size={18} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>{drill.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-500">{drill.duration}</span>
                      <span className="w-1 h-1 bg-gray-700 rounded-full" />
                      <span className={`text-[10px] ${
                        drill.difficulty === 'Beginner' ? 'text-[#27AE60]' :
                        drill.difficulty === 'Intermediate' ? 'text-[#2E86C1]' :
                        drill.difficulty === 'Advanced' ? 'text-[#E67E22]' :
                        'text-[#9B59B6]'
                      }`} style={{ fontWeight: 500 }}>{drill.difficulty}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-600" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
