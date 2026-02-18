import React, { useState, useEffect } from 'react';
import { Camera, Settings, Maximize2, X, Pause, CheckCircle, Target, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SessionModeProps {
  onExit: () => void;
}

export function SessionMode({ onExit }: SessionModeProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [scores] = useState([10.9, 10.4, 9.8, 10.1, 10.5, 10.3, 10.7]);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Camera Viewfinder */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Crosshair overlay */}
          <div className="w-48 h-48 relative">
            <div className="absolute inset-0 border border-white/[0.06] rounded-full" />
            <div className="absolute inset-4 border border-white/[0.04] rounded-full" />
            <div className="absolute inset-8 border border-white/[0.03] rounded-full" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.04]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#E67E22]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 w-full z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent pt-14 pb-8 px-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#E67E22]" />
              <span className="text-[10px] text-[#E67E22] uppercase tracking-widest" style={{ fontWeight: 700 }}>Recording</span>
            </motion.div>
            <div className="text-white text-2xl tracking-wider" style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700 }}>
              {formatTime(seconds)}
            </div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onExit}
            className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Live Stats Bar */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-[12px] p-3 text-center">
            <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Shots</div>
            <div className="text-lg text-white" style={{ fontWeight: 700 }}>{scores.length}</div>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-[12px] p-3 text-center">
            <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Average</div>
            <div className="text-lg text-[#27AE60]" style={{ fontWeight: 700 }}>{avgScore}</div>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-[12px] p-3 text-center">
            <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Best</div>
            <div className="text-lg text-[#E67E22]" style={{ fontWeight: 700 }}>10.9</div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full z-10 bg-gradient-to-t from-black via-black/80 to-transparent pb-10 pt-8 px-5 space-y-5">
        {/* Score Strip */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 justify-center">
          {scores.map((score, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border ${
                score >= 10.5 
                  ? 'bg-[#27AE60]/15 border-[#27AE60]/30' 
                  : score >= 10 
                    ? 'bg-[#1A1A1A] border-[#333]' 
                    : 'bg-[#1A1A1A] border-[#333]'
              }`}
            >
              <span className={`text-sm ${
                score >= 10.5 ? 'text-[#27AE60]' : score >= 10 ? 'text-white' : 'text-gray-400'
              }`} style={{ fontWeight: 700 }}>{score}</span>
            </motion.div>
          ))}
        </div>

        {/* Control Row */}
        <div className="flex justify-between items-center px-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-full bg-white/5 backdrop-blur-md text-gray-400"
          >
            <Settings size={22} />
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRunning(!isRunning)}
            className="relative"
          >
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-white/20 flex items-center justify-center">
              <motion.div 
                animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-[58px] h-[58px] rounded-full bg-[#E67E22] shadow-[0_0_30px_rgba(230,126,34,0.4)] flex items-center justify-center"
              >
                {isRunning ? (
                  <Pause size={24} className="text-white" fill="white" />
                ) : (
                  <Target size={24} className="text-white" />
                )}
              </motion.div>
            </div>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-full bg-white/5 backdrop-blur-md text-gray-400"
          >
            <Maximize2 size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
