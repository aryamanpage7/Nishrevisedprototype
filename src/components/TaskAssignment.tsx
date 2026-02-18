import React, { useState } from 'react';
import { X, Dumbbell, Brain, Crosshair, PenTool, Check, ChevronRight, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskAssignmentProps {
  studentName: string;
  onClose: () => void;
  onAssign: (task: string, category: string) => void;
}

type Category = 'Physical' | 'Mental' | 'Pre-fire' | 'Custom';

const PRESETS = {
  Physical: [
    { id: 'p1', label: 'Wall Holding', duration: '15 mins', emoji: '🧱' },
    { id: 'p2', label: 'Core Planks', duration: '3 sets', emoji: '💪' },
    { id: 'p3', label: 'Cardio Run', duration: '30 mins', emoji: '🏃' },
    { id: 'p4', label: 'Scatt Holding', duration: '20 mins', emoji: '🎯' },
  ],
  Mental: [
    { id: 'm1', label: 'Visualization', duration: '10 mins', emoji: '🧘' },
    { id: 'm2', label: 'Box Breathing', duration: '5 mins', emoji: '🌬️' },
    { id: 'm3', label: 'Match Replay', duration: '15 mins', emoji: '🎬' },
  ],
  'Pre-fire': [
    { id: 'f1', label: 'Dry Fire', duration: '20 shots', emoji: '🔫' },
    { id: 'f2', label: 'Equipment Check', duration: 'Checklist', emoji: '🔧' },
    { id: 'f3', label: 'Stance Reset', duration: 'Drill', emoji: '🦶' },
  ]
};

export function TaskAssignment({ studentName, onClose, onAssign }: TaskAssignmentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Physical');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [customTask, setCustomTask] = useState('');

  const handleAssign = () => {
    if (activeCategory === 'Custom') {
      if (customTask.trim()) onAssign(customTask, 'Custom');
    } else {
      if (selectedTask) onAssign(selectedTask, activeCategory);
    }
  };

  const categories: { id: Category; icon: any; label: string; color: string }[] = [
    { id: 'Physical', icon: Dumbbell, label: 'Physical', color: '#E67E22' },
    { id: 'Mental', icon: Brain, label: 'Mental', color: '#9B59B6' },
    { id: 'Pre-fire', icon: Crosshair, label: 'Pre-fire', color: '#2E86C1' },
    { id: 'Custom', icon: PenTool, label: 'Custom', color: '#27AE60' },
  ];

  const isReady = activeCategory === 'Custom' ? customTask.trim() : selectedTask;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 250 }}
      className="absolute inset-0 bg-[#050505] z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-5 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl text-white" style={{ fontWeight: 700 }}>Assign Drill</h2>
          <p className="text-sm text-gray-500">for {studentName}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory(cat.id); setSelectedTask(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] transition-all whitespace-nowrap border ${
                isActive
                  ? 'text-white'
                  : 'bg-[#111] border-[#222] text-gray-500 hover:border-gray-500'
              }`}
              style={isActive ? { 
                backgroundColor: `${cat.color}15`,
                borderColor: `${cat.color}30`,
                color: cat.color
              } : {}}
            >
              <cat.icon size={16} />
              <span className="text-sm" style={{ fontWeight: isActive ? 600 : 400 }}>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <AnimatePresence mode="wait">
          {activeCategory === 'Custom' ? (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <label className="text-xs text-gray-500" style={{ fontWeight: 600 }}>Describe the drill</label>
              <textarea
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                placeholder="e.g., Focus on trigger squeeze timing for 20 shots..."
                className="w-full h-40 bg-[#111] border border-[#222] rounded-[16px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#27AE60]/40 resize-none text-sm"
              />
              <div className="flex items-center gap-2 text-gray-600">
                <Zap size={14} />
                <span className="text-xs">Pro tip: Be specific about reps, duration, and goals</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {PRESETS[activeCategory as keyof typeof PRESETS]?.map((task, i) => {
                const isSelected = selectedTask === task.label;
                return (
                  <motion.button
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTask(task.label)}
                    className={`w-full text-left p-4 rounded-[16px] border transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-[#2E86C1]/8 border-[#2E86C1]/30'
                        : 'bg-[#111] border-[#1A1A1A] hover:border-[#333]'
                    }`}
                  >
                    <span className="text-2xl">{task.emoji}</span>
                    <div className="flex-1">
                      <h4 className={`text-sm ${isSelected ? 'text-[#2E86C1]' : 'text-white'}`} style={{ fontWeight: 600 }}>
                        {task.label}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-gray-600">
                        <Clock size={10} />
                        <span className="text-[10px]">{task.duration}</span>
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-[#2E86C1] flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="text-gray-700" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-5 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-10">
        <motion.button
          whileTap={isReady ? { scale: 0.97 } : {}}
          disabled={!isReady}
          onClick={handleAssign}
          className={`w-full py-4 rounded-[16px] flex items-center justify-center gap-2 transition-all ${
            isReady
              ? 'bg-[#2E86C1] text-white shadow-lg shadow-[#2E86C1]/20'
              : 'bg-[#111] text-gray-600 cursor-not-allowed'
          }`}
          style={{ fontWeight: 700 }}
        >
          <span>Assign Drill</span>
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
