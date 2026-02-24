import React, { useState } from 'react';
import { Play, ChevronRight, Target, Flame, TrendingUp, Clock, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShooterDashboardProps {
  onStartSession: (type: 'practice' | 'match') => void;
}

const PROFILE_IMG = 'https://images.unsplash.com/photo-1697517530015-616c6ec84fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTMyNTU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const COACH_IMG = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjb2FjaCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTMyNTU3MXww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral';

/* ── Shot data ───────────────────────────────────────────── */
const recentShots = [
  { score: 10.4, angle: 25, jitter: 0.72 },
  { score: 10.1, angle: 100, jitter: 0.65 },
  { score: 9.8, angle: 175, jitter: 0.80 },
  { score: 10.7, angle: 240, jitter: 0.60 },
  { score: 10.3, angle: 320, jitter: 0.75 },
  { score: 10.5, angle: 65, jitter: 0.68 },
  { score: 9.9, angle: 200, jitter: 0.78 },
];

/* ── Coach Feedback Popup ────────────────────────────────── */
const CoachFeedbackPopup = ({ onDismiss }: { onDismiss: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.96 }}
    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    className="relative"
  >
    {/* Subtle top notch indicator */}
    <div className="flex justify-center mb-[-1px] relative z-10">
      <div className="w-8 h-1.5 rounded-full bg-[#2E86C1]/30" />
    </div>

    <div className="bg-[#131313] rounded-[20px] border border-[#2E86C1]/20 p-4 relative overflow-hidden shadow-xl shadow-[#2E86C1]/5">
      {/* Accent glow */}
      <div className="absolute top-0 left-0 w-[120px] h-[80px] bg-[#2E86C1]/5 blur-[40px] rounded-full" />

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center z-10 hover:bg-white/[0.08] transition-colors"
      >
        <X size={12} className="text-gray-500" />
      </button>

      {/* Coach header */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="relative">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-[1.5px] ring-[#2E86C1]/40">
            <img src={COACH_IMG} alt="Coach" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2E86C1] flex items-center justify-center border-2 border-[#131313]">
            <MessageSquare size={7} className="text-white" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white" style={{ fontWeight: 700 }}>Coach Rajesh</span>
            <span className="text-[9px] text-[#2E86C1] bg-[#2E86C1]/10 px-1.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>New</span>
          </div>
          <span className="text-[10px] text-gray-600">2 hours ago</span>
        </div>
      </div>

      {/* Feedback content */}
      <p className="text-[13px] text-gray-300 leading-relaxed relative z-10">
        "Great session today! Your hold time improved by 12%. Focus on your breathing rhythm between shots — try 4-2-4 cadence before your next match."
      </p>

      {/* Quick actions */}
      <div className="flex items-center gap-2 mt-3 relative z-10">
        <button className="flex items-center gap-1.5 bg-[#2E86C1]/10 border border-[#2E86C1]/20 px-3 py-1.5 rounded-full hover:bg-[#2E86C1]/15 transition-colors">
          <span className="text-[10px] text-[#2E86C1]" style={{ fontWeight: 600 }}>Reply</span>
        </button>
        <button className="flex items-center gap-1.5 bg-white/[0.03] border border-[#222] px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
          <span className="text-[10px] text-gray-500" style={{ fontWeight: 600 }}>View All Notes</span>
        </button>
      </div>
    </div>
  </motion.div>
);

/* ── Target Score Visualization ──────────────────────────── */
const TargetScoreViz = ({ avgScore }: { avgScore: number }) => {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;

  const rings = [
    { r: 118, score: 6, fill: '#111111', stroke: '#1E1E1E' },
    { r: 100, score: 7, fill: '#131313', stroke: '#222222' },
    { r: 82, score: 8, fill: '#161616', stroke: '#262626' },
    { r: 62, score: 9, fill: '#191919', stroke: '#2A2A2A' },
    { r: 40, score: 10, fill: '#1C1C1C', stroke: '#303030' },
    { r: 15, score: 10.9, fill: '#E67E22', stroke: '#E67E22' },
  ];

  const scoreToRadius = (s: number) => {
    const clamped = Math.max(6, Math.min(10.9, s));
    const normalized = (clamped - 6) / (10.9 - 6);
    return 118 * (1 - normalized);
  };

  const getScoreColor = (s: number) =>
    s >= 10.5 ? '#27AE60' : s >= 10.0 ? '#E67E22' : '#E74C3C';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((ring, i) => (
        <circle key={i} cx={cx} cy={cy} r={ring.r} fill={ring.fill} stroke={ring.stroke} strokeWidth={1.2} />
      ))}
      {rings.slice(0, 5).map((ring, i) => (
        <text key={`label-${i}`} x={cx + ring.r - 2} y={cy - 5} fill="#444" fontSize="9" fontWeight="600" textAnchor="end" fontFamily="ui-monospace, monospace">
          {ring.score}
        </text>
      ))}
      <line x1={cx} y1={cy - 122} x2={cx} y2={cy + 122} stroke="#222" strokeWidth={0.8} />
      <line x1={cx - 122} y1={cy} x2={cx + 122} y2={cy} stroke="#222" strokeWidth={0.8} />

      {(() => {
        const avgR = scoreToRadius(avgScore);
        return (
          <>
            <motion.circle cx={cx} cy={cy} fill="none" stroke="#E67E22" strokeWidth={12} opacity={0.06}
              initial={{ r: 0 }} animate={{ r: avgR }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} />
            <motion.circle cx={cx} cy={cy} fill="none" stroke="#E67E22" strokeWidth={2} strokeDasharray="8 4" opacity={0.6}
              initial={{ r: 0 }} animate={{ r: avgR }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} />
          </>
        );
      })()}

      {recentShots.map((shot, i) => {
        const dist = scoreToRadius(shot.score);
        const radians = (shot.angle * Math.PI) / 180;
        const sx = cx + dist * Math.cos(radians) * shot.jitter;
        const sy = cy + dist * Math.sin(radians) * shot.jitter;
        const color = getScoreColor(shot.score);
        return (
          <motion.g key={i}>
            <motion.circle cx={sx} cy={sy} r={12} fill={color} opacity={0}
              initial={{ opacity: 0, r: 4 }} animate={{ opacity: 0.1, r: 12 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }} />
            <motion.circle cx={sx} cy={sy} fill={color} stroke="#050505" strokeWidth={2}
              initial={{ r: 0 }} animate={{ r: 5.5 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 }} />
            <motion.text x={sx + 9} y={sy + 3.5} fill={color} fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 1 + i * 0.1 }}>
              {shot.score.toFixed(1)}
            </motion.text>
          </motion.g>
        );
      })}

      <circle cx={cx} cy={cy} r={20} fill="#0A0A0A" stroke="#E67E22" strokeWidth={2} opacity={0.9} />
      <motion.text x={cx} y={cy + 1} fill="#E67E22" fontSize="12" fontWeight="800" textAnchor="middle" dominantBaseline="middle" fontFamily="ui-monospace, monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {avgScore.toFixed(1)}
      </motion.text>
      <motion.text x={cx} y={cy + 12} fill="#888" fontSize="5.5" fontWeight="600" textAnchor="middle" letterSpacing="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        AVG
      </motion.text>
    </svg>
  );
};

/* ── Mini Spark Line ─────────────────────────────────────── */
const MiniSparkLine = ({ color }: { color: string }) => {
  const points = [3, 5, 4, 7, 6, 8, 5, 9, 7, 8, 10, 9];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 80;
  const h = 24;
  const stepX = w / (points.length - 1);

  const pathD = points
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L${w},${h} L0,${h} Z`} fill={`url(#spark-${color.replace('#', '')})`} />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
      />
      {/* Latest dot */}
      <motion.circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / (max - min)) * h}
        r={3}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, type: 'spring' }}
      />
    </svg>
  );
};

/* ── Bullseye Decoration ─────────────────────────────────── */
const BullseyeDecor = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" className="opacity-20">
    <circle cx="45" cy="45" r="42" stroke="#666" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="32" stroke="#555" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="22" stroke="#444" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="12" stroke="#444" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="3" fill="#555" />
    <line x1="45" y1="0" x2="45" y2="90" stroke="#444" strokeWidth="0.5" />
    <line x1="0" y1="45" x2="90" y2="45" stroke="#444" strokeWidth="0.5" />
  </svg>
);

/* ── Main Component ──────────────────────────────────────── */
export function ShooterDashboard({ onStartSession }: ShooterDashboardProps) {
  const avgScore = +(recentShots.reduce((a, s) => a + s.score, 0) / recentShots.length).toFixed(1);
  const bestShot = Math.max(...recentShots.map(s => s.score));
  const worstShot = Math.min(...recentShots.map(s => s.score));
  const [showCoachNote, setShowCoachNote] = useState(true);

  return (
    <div className="p-5 space-y-4 pb-32 bg-[#050505] min-h-full">
      {/* ── Header ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center pt-2"
      >
        <div>
          <h1 className="text-2xl text-white tracking-tight" style={{ fontWeight: 700 }}>
            Hello, Aryaman
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Tuesday, 17 Feb</p>
        </div>
        <motion.div whileTap={{ scale: 0.9 }}>
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#E67E22]/40 ring-offset-2 ring-offset-[#050505]">
            <img src={PROFILE_IMG} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </motion.header>

      {/* ── Coach Feedback Popup ────────────────────────── */}
      <AnimatePresence>
        {showCoachNote && (
          <CoachFeedbackPopup onDismiss={() => setShowCoachNote(false)} />
        )}
      </AnimatePresence>

      {/* ── Coach Assigned Card ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1A1A1A] rounded-[22px] p-5 border border-[#222] relative overflow-hidden"
      >
        <div className="absolute top-2 right-2">
          <BullseyeDecor />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#E67E22]/10 border border-[#E67E22]/20 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
            <span className="text-[10px] text-[#E67E22] uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Coach Assigned
            </span>
          </div>
        </div>

        <h2 className="text-xl text-white relative z-10 max-w-[240px]" style={{ fontWeight: 700 }}>
          Wall Holding &amp; Visualization
        </h2>
        <div className="flex items-center gap-3 text-gray-500 text-xs mt-2 mb-5">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-gray-500" /> 20 mins
          </span>
          <span className="text-gray-600">·</span>
          <span className="flex items-center gap-1">
            <Target size={13} className="text-gray-500" /> Focus
          </span>
        </div>

        <div className="flex gap-3 relative z-10">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onStartSession('practice')}
            className="flex-1 bg-[#E67E22] rounded-2xl py-3.5 flex flex-col items-center justify-center gap-0.5"
          >
            <div className="flex items-center gap-1.5">
              <Target size={14} className="text-[#050505]" />
              <span className="text-[#050505] text-sm" style={{ fontWeight: 700 }}>Practice</span>
            </div>
            <span className="text-[#050505]/60 text-[10px]" style={{ fontWeight: 600 }}>40 Shots</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onStartSession('match')}
            className="flex-1 bg-[#27AE60] rounded-2xl py-3.5 flex flex-col items-center justify-center gap-0.5"
          >
            <div className="flex items-center gap-1.5">
              <Play size={14} className="text-[#050505]" fill="#050505" />
              <span className="text-[#050505] text-sm" style={{ fontWeight: 700 }}>Match</span>
            </div>
            <span className="text-[#050505]/60 text-[10px]" style={{ fontWeight: 600 }}>60 Shots</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Unified Shot Map + Stats Card ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1A1A1A] rounded-[22px] border border-[#222] overflow-hidden"
      >
        {/* Section header */}
        <div className="px-5 pt-5 pb-1 flex items-center justify-between">
          <div>
            <h3 className="text-white text-[15px]" style={{ fontWeight: 700 }}>Today's Shot Map</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {recentShots.length} shots · Each dot = 1 shot on target
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#27AE60]/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={12} className="text-[#27AE60]" />
            <span className="text-[11px] text-[#27AE60]" style={{ fontWeight: 700 }}>+0.4</span>
          </div>
        </div>

        {/* Target visualization */}
        <div className="flex items-center justify-center py-2">
          <TargetScoreViz avgScore={avgScore} />
        </div>

        {/* Integrated stat strip — Avg Score | Consistency | Best | Lowest */}
        <div className="mx-4 mb-2 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] overflow-hidden">
          <div className="grid grid-cols-2 gap-px bg-[#1A1A1A]">
            {/* Avg Score */}
            <div className="bg-[#0F0F0F] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#27AE60]/8 flex items-center justify-center flex-shrink-0">
                <Target size={18} className="text-[#27AE60]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Avg Score</span>
                <div className="flex items-end gap-1.5">
                  <span className="text-xl text-[#27AE60]" style={{ fontWeight: 800 }}>10.2</span>
                  <MiniSparkLine color="#27AE60" />
                </div>
              </div>
            </div>

            {/* Consistency */}
            <div className="bg-[#0F0F0F] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E86C1]/8 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-[#2E86C1]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Consistency</span>
                <div className="flex items-end gap-1.5">
                  <span className="text-xl text-[#2E86C1]" style={{ fontWeight: 800 }}>94<span className="text-sm">%</span></span>
                  <MiniSparkLine color="#2E86C1" />
                </div>
              </div>
            </div>

            {/* Best Shot */}
            <div className="bg-[#0F0F0F] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#27AE60]/5 flex items-center justify-center flex-shrink-0 border border-[#27AE60]/10">
                <span className="text-sm">🎯</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Best Shot</span>
                <span className="text-xl text-[#27AE60]" style={{ fontWeight: 800 }}>{bestShot.toFixed(1)}</span>
              </div>
            </div>

            {/* Lowest Shot */}
            <div className="bg-[#0F0F0F] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E74C3C]/5 flex items-center justify-center flex-shrink-0 border border-[#E74C3C]/10">
                <span className="text-sm">📉</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Lowest</span>
                <span className="text-xl text-[#E74C3C]" style={{ fontWeight: 800 }}>{worstShot.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 flex items-center gap-5 border-t border-[#1E1E1E]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#27AE60]" />
            <span className="text-[10px] text-gray-400" style={{ fontWeight: 600 }}>≥ 10.2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E67E22]" />
            <span className="text-[10px] text-gray-400" style={{ fontWeight: 600 }}>10.0–10.1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E74C3C]" />
            <span className="text-[10px] text-gray-400" style={{ fontWeight: 600 }}>&lt; 10.0</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-4 border-t-2 border-dashed border-[#E67E22]/60" />
            <span className="text-[10px] text-gray-400" style={{ fontWeight: 600 }}>Avg</span>
          </div>
        </div>
      </motion.div>

      {/* ── Streak Banner ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1A1A1A] rounded-[22px] px-5 py-4 border border-[#222] flex items-center gap-4"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E67E22]/20">
          <Flame size={20} className="text-white" fill="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm" style={{ fontWeight: 700 }}>7 Day Streak!</h4>
          <p className="text-xs text-gray-500 truncate">Precision requires consistency.</p>
        </div>
        <ChevronRight size={18} className="text-gray-600 flex-shrink-0" />
      </motion.div>
    </div>
  );
}