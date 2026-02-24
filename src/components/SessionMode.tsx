import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, X, Pause, Play, Square, Target, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SessionModeProps {
  sessionType: 'practice' | 'match';
  onExit: () => void;
}

/* ── Score color helper ──────────────────────────────────── */
const getScoreColor = (s: number) =>
  s >= 10.5 ? '#27AE60' : s >= 10.0 ? '#E67E22' : s >= 9.0 ? '#2E86C1' : '#E74C3C';

/* ── Inline Score Picker ─────────────────────────────────── */
function InlineScorePicker({ shotNumber, onScore, onCancel }: {
  shotNumber: number;
  onScore: (score: number) => void;
  onCancel: () => void;
}) {
  const [wholeNum, setWholeNum] = useState<number | null>(null);
  const wholeOptions = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const decimalOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleDecimal = useCallback((d: number) => {
    if (wholeNum === null) return;
    // 10 can only go up to 10.9
    const score = +(wholeNum + d / 10).toFixed(1);
    onScore(score);
  }, [wholeNum, onScore]);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="px-4 pt-3 pb-8"
    >
      {/* Shot label + back/cancel */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {wholeNum !== null ? (
            <motion.button
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setWholeNum(null)}
              className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center"
            >
              <ChevronLeft size={14} className="text-gray-400" />
            </motion.button>
          ) : null}
          <span className="text-xs text-gray-500" style={{ fontWeight: 600 }}>
            Shot #{shotNumber}
          </span>
        </div>
        <button onClick={onCancel} className="text-[10px] text-gray-600 uppercase tracking-wider" style={{ fontWeight: 600 }}>
          Skip
        </button>
      </div>

      <AnimatePresence mode="wait">
        {wholeNum === null ? (
          /* ── Step 1: Whole number ───────────────────── */
          <motion.div
            key="whole"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2.5 text-center" style={{ fontWeight: 600 }}>
              Select score
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {wholeOptions.map((n) => {
                const color = getScoreColor(n);
                return (
                  <motion.button
                    key={n}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setWholeNum(n)}
                    className="w-[60px] h-[52px] rounded-2xl flex items-center justify-center border transition-colors"
                    style={{
                      backgroundColor: `${color}10`,
                      borderColor: `${color}20`,
                    }}
                  >
                    <span className="text-lg" style={{ fontWeight: 800, color, fontFamily: 'ui-monospace, monospace' }}>
                      {n}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ── Step 2: Decimal ────────────────────────── */
          <motion.div
            key="decimal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Preview of selected whole */}
            <div className="text-center mb-3">
              <span className="text-2xl text-white" style={{ fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>
                {wholeNum}.
              </span>
              <span className="text-2xl text-gray-600" style={{ fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>
                _
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {decimalOptions.map((d) => {
                const score = +(wholeNum + d / 10).toFixed(1);
                const color = getScoreColor(score);
                return (
                  <motion.button
                    key={d}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleDecimal(d)}
                    className="w-[60px] h-[52px] rounded-2xl flex flex-col items-center justify-center border transition-colors"
                    style={{
                      backgroundColor: `${color}10`,
                      borderColor: `${color}20`,
                    }}
                  >
                    <span className="text-xs text-gray-500" style={{ fontWeight: 500, fontFamily: 'ui-monospace, monospace' }}>
                      .{d}
                    </span>
                    <span className="text-sm -mt-0.5" style={{ fontWeight: 800, color, fontFamily: 'ui-monospace, monospace' }}>
                      {score.toFixed(1)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main SessionMode Component ──────────────────────────── */
export function SessionMode({ sessionType, onExit }: SessionModeProps) {
  const totalShots = sessionType === 'practice' ? 40 : 60;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [scores, setScores] = useState<number[]>([]);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [flashScore, setFlashScore] = useState<number | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);

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

  const handleCapture = () => {
    if (scores.length >= totalShots) return;
    setIsScoring(true);
  };

  const handleScoreConfirm = useCallback((score: number) => {
    setScores(prev => [...prev, score]);
    setIsScoring(false);
    setFlashScore(score);
    // Brief flash, then clear
    setTimeout(() => setFlashScore(null), 1200);
    // Scroll history to end
    setTimeout(() => {
      historyRef.current?.scrollTo({ left: historyRef.current.scrollWidth, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleScoreCancel = () => {
    setIsScoring(false);
  };

  const progress = totalShots > 0 ? (scores.length / totalShots) * 100 : 0;
  const accentColor = sessionType === 'practice' ? '#E67E22' : '#27AE60';

  return (
    <div className="h-full w-full bg-[#050505] relative flex flex-col">

      {/* ── Camera Viewfinder ─────────────────────────── */}
      <div className="flex-1 relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#080808] to-[#0D0D0D]" />

        {/* Viewfinder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-52 h-52 relative">
            <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-[#E67E22]/50 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-[#E67E22]/50 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-[#E67E22]/50 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[#E67E22]/50 rounded-br-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full border border-white/[0.04]" />
              <div className="absolute w-14 h-14 rounded-full border border-white/[0.04]" />
              <div className="absolute w-5 h-5 rounded-full border border-white/[0.06]" />
              <div className="absolute w-full h-[1px] bg-white/[0.04]" />
              <div className="absolute h-full w-[1px] bg-white/[0.04]" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-2 h-2 rounded-full bg-[#E67E22]/50"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] text-gray-600 tracking-wider uppercase" style={{ fontWeight: 500 }}>
                Point camera at target
              </span>
            </div>
          </div>
        </div>

        {/* Score flash overlay — brief confirmation */}
        <AnimatePresence>
          {flashScore !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${getScoreColor(flashScore)}18`, border: `2px solid ${getScoreColor(flashScore)}30` }}
                >
                  <span
                    className="text-3xl"
                    style={{
                      fontWeight: 800,
                      fontFamily: 'ui-monospace, monospace',
                      color: getScoreColor(flashScore),
                    }}
                  >
                    {flashScore.toFixed(1)}
                  </span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[10px] text-gray-500 uppercase tracking-wider"
                  style={{ fontWeight: 600 }}
                >
                  Shot #{scores.length} logged
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top HUD ─────────────────────────────────── */}
        <div className="absolute top-0 w-full z-20 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent pt-14 pb-8 px-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#E74C3C]"
                />
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ fontWeight: 700, color: accentColor }}
                >
                  {sessionType === 'practice' ? 'Practice' : 'Match'}
                </span>
              </div>
              <div className="text-white text-2xl tracking-wider" style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700 }}>
                {formatTime(seconds)}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setShowEndConfirm(true)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10"
            >
              <X size={20} className="text-white" />
            </motion.button>
          </div>

          {/* Shot counter */}
          <div className="mt-4">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-white text-3xl" style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 800 }}>
                {scores.length}
              </span>
              <span className="text-gray-500 text-lg" style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 500 }}>
                /{totalShots}
              </span>
              <span className="text-[10px] text-gray-600 ml-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                shots
              </span>
            </div>
            <div className="h-[5px] bg-[#1A1A1A] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Panel — transforms between controls & score picker ── */}
      <div className="bg-[#0A0A0A] border-t border-[#1A1A1A] relative z-30">

        {/* Shot history strip */}
        {scores.length > 0 && !isScoring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 pt-3 pb-0"
          >
            <div ref={historyRef} className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {scores.map((score, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.015, type: 'spring', stiffness: 350 }}
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center border"
                  style={{
                    backgroundColor: `${getScoreColor(score)}10`,
                    borderColor: `${getScoreColor(score)}25`,
                  }}
                >
                  <span className="text-[11px]" style={{ fontWeight: 700, color: getScoreColor(score) }}>
                    {score.toFixed(1)}
                  </span>
                  <span className="text-[7px] text-gray-600" style={{ fontWeight: 500 }}>#{i + 1}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isScoring ? (
            /* ── Inline Score Picker (replaces action buttons) ── */
            <InlineScorePicker
              key="scoring"
              shotNumber={scores.length + 1}
              onScore={handleScoreConfirm}
              onCancel={handleScoreCancel}
            />
          ) : (
            /* ── Normal Action Buttons ── */
            <motion.div
              key="controls"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="px-5 pt-3 pb-10"
            >
              <div className="flex items-center justify-center gap-6">
                {/* End Session */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEndConfirm(true)}
                  className="w-14 h-14 rounded-full bg-[#E74C3C]/12 border-2 border-[#E74C3C]/25 flex items-center justify-center"
                >
                  <Square size={20} className="text-[#E74C3C]" fill="#E74C3C" />
                </motion.button>

                {/* CAPTURE */}
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleCapture}
                  disabled={scores.length >= totalShots}
                  className="relative"
                  style={{ opacity: scores.length >= totalShots ? 0.4 : 1 }}
                >
                  <div className="w-[80px] h-[80px] rounded-full border-[3px] border-[#E67E22]/40 flex items-center justify-center">
                    <motion.div
                      animate={isRunning ? { boxShadow: ['0 0 0px rgba(230,126,34,0.3)', '0 0 20px rgba(230,126,34,0.3)', '0 0 0px rgba(230,126,34,0.3)'] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-[66px] h-[66px] rounded-full bg-[#E67E22] flex items-center justify-center"
                    >
                      <Camera size={26} className="text-[#050505]" />
                    </motion.div>
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#E67E22] uppercase tracking-wider whitespace-nowrap" style={{ fontWeight: 700 }}>
                    Capture
                  </span>
                </motion.button>

                {/* Pause / Resume */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-14 h-14 rounded-full bg-white/[0.06] border-2 border-white/10 flex items-center justify-center"
                >
                  {isRunning ? (
                    <Pause size={20} className="text-white" fill="white" />
                  ) : (
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── End Session Confirmation ──────────────────── */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1A1A1A] rounded-[24px] p-6 w-full max-w-[320px] border border-[#2A2A2A]"
            >
              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#E67E22]/10 flex items-center justify-center mx-auto mb-3">
                  <Target size={26} className="text-[#E67E22]" />
                </div>
                <h3 className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>End Session?</h3>
                <p className="text-sm text-gray-500">
                  {scores.length}/{totalShots} shots recorded
                </p>
              </div>
              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onExit}
                  className="w-full py-4 bg-[#E67E22] text-[#050505] rounded-2xl text-sm"
                  style={{ fontWeight: 700 }}
                >
                  Save &amp; End Session
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowEndConfirm(false)}
                  className="w-full py-4 bg-[#222] text-gray-300 rounded-2xl text-sm border border-[#333]"
                  style={{ fontWeight: 600 }}
                >
                  Continue Shooting
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
