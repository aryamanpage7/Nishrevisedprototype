import React from 'react';
import { Play, ChevronRight, Target, Flame, Crosshair, TrendingUp, Clock, Focus } from 'lucide-react';
import { motion } from 'motion/react';

interface ShooterDashboardProps {
  onStartSession: () => void;
}

const PROFILE_IMG = 'https://images.unsplash.com/photo-1697517530015-616c6ec84fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTMyNTU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ── Activity Ring ────────────────────────────────────────── */
const ActivityRing = ({
  radius,
  stroke,
  progress,
  color,
  delay = 0,
}: {
  radius: number;
  stroke: number;
  progress: number;
  color: string;
  delay?: number;
}) => {
  const norm = radius - stroke * 2;
  const circ = norm * 2 * Math.PI;
  const offset = circ - (progress / 100) * circ;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
    >
      {/* Track */}
      <circle
        stroke={color}
        strokeWidth={stroke}
        strokeOpacity="0.15"
        fill="transparent"
        r={norm}
        cx={radius}
        cy={radius}
      />
      {/* Progress */}
      <motion.circle
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${circ} ${circ}`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        strokeLinecap="round"
        fill="transparent"
        r={norm}
        cx={radius}
        cy={radius}
        filter={`drop-shadow(0 0 6px ${color}50)`}
      />
    </svg>
  );
};

/* ── Mini Bar Chart ──────────────────────────────────────── */
const MiniBarChart = ({ color, accent }: { color: string; accent: string }) => {
  const bars = [3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, 10, 7, 5, 8, 6, 9, 7, 11, 8];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-[2px] h-[28px] mt-3">
      {bars.map((v, i) => {
        const isAccent = i === bars.length - 2 || i === bars.length - 5;
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ delay: 0.6 + i * 0.02, duration: 0.4, ease: 'easeOut' }}
            className="flex-1 rounded-[1.5px]"
            style={{ backgroundColor: isAccent ? accent : color }}
          />
        );
      })}
    </div>
  );
};

/* ── Progress Bar ────────────────────────────────────────── */
const StatBar = ({
  label,
  value,
  color,
  progress,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  progress: number;
  delay: number;
}) => (
  <div className="flex items-center gap-3">
    <span
      className="text-[10px] uppercase tracking-wider w-[52px]"
      style={{ fontWeight: 700, color }}
    >
      {label}
    </span>
    <span className="text-xs text-gray-400 w-[40px] text-right" style={{ fontWeight: 600 }}>
      {value}
    </span>
    <div className="flex-1 h-[5px] bg-[#222] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

/* ── Bullseye Decoration ─────────────────────────────────── */
const BullseyeDecor = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" className="opacity-25">
    <circle cx="45" cy="45" r="42" stroke="#666" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="32" stroke="#555" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="22" stroke="#444" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="12" stroke="#444" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="45" r="3" fill="#555" />
    {/* Crosshair lines */}
    <line x1="45" y1="0" x2="45" y2="90" stroke="#444" strokeWidth="0.5" />
    <line x1="0" y1="45" x2="90" y2="45" stroke="#444" strokeWidth="0.5" />
  </svg>
);

/* ── Main Component ──────────────────────────────────────── */
export function ShooterDashboard({ onStartSession }: ShooterDashboardProps) {
  return (
    <div className="p-5 space-y-5 pb-32 bg-[#050505] min-h-full">
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
          <p className="text-sm text-gray-500">Tuesday, 17 Feb</p>
        </div>
        <motion.div whileTap={{ scale: 0.9 }}>
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#E67E22]/40 ring-offset-2 ring-offset-[#050505]">
            <img src={PROFILE_IMG} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </motion.header>

      {/* ── Coach Assigned Card ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1A1A1A] rounded-[22px] p-5 border border-[#222] relative overflow-hidden"
      >
        {/* Bullseye decoration */}
        <div className="absolute top-2 right-2">
          <BullseyeDecor />
        </div>
        {/* Close / dismiss */}
        <button className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#222] flex items-center justify-center z-10">
          <span className="text-gray-500 text-xs">✕</span>
        </button>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#E67E22]/10 border border-[#E67E22]/20 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
            <span className="text-[10px] text-[#E67E22] uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Coach Assigned
            </span>
          </div>
        </div>

        {/* Drill info */}
        <h2 className="text-xl text-white relative z-10 max-w-[240px]" style={{ fontWeight: 700 }}>
          Wall Holding &amp; Visualization
        </h2>

        <div className="flex items-center gap-3 text-gray-500 text-xs mt-2 mb-5">
          <span className="flex items-center gap-1">
            <TrendingUp size={13} className="text-gray-500" /> 20 mins
          </span>
          <span className="text-gray-600">·</span>
          <span className="flex items-center gap-1">
            <Target size={13} className="text-gray-500" /> Focus
          </span>
        </div>

        {/* Start Session CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStartSession}
          className="w-full bg-[#E67E22] rounded-2xl py-4 flex items-center justify-center gap-2 relative z-10"
        >
          <Play size={16} className="text-[#050505]" fill="#050505" />
          <span className="text-[#050505] text-sm" style={{ fontWeight: 700 }}>
            Start Session
          </span>
        </motion.button>
      </motion.div>

      {/* ── Daily Performance ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1A1A1A] rounded-[22px] p-5 border border-[#222]"
      >
        <h3 className="text-white text-sm mb-5" style={{ fontWeight: 700 }}>
          Daily Performance
        </h3>

        <div className="flex items-center gap-5">
          {/* Activity Rings */}
          <div className="relative w-[130px] h-[130px] flex-shrink-0">
            <ActivityRing radius={65} stroke={10} progress={75} color="#E67E22" delay={0} />
            <ActivityRing radius={50} stroke={10} progress={45} color="#2E86C1" delay={0.1} />
            <ActivityRing radius={35} stroke={10} progress={85} color="#27AE60" delay={0.2} />
          </div>

          {/* Stats with bars */}
          <div className="flex-1 space-y-4">
            <StatBar label="Shots" value="45/60" color="#E67E22" progress={75} delay={0.5} />
            <StatBar label="Focus" value="27m" color="#C0862E" progress={45} delay={0.6} />
            <StatBar label="Score" value="10.4" color="#27AE60" progress={85} delay={0.7} />
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards Row ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Avg Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1A1A] rounded-[20px] p-4 border border-[#222] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Avg Score
            </span>
            <div className="w-6 h-6 rounded-full bg-[#27AE60]/10 flex items-center justify-center">
              <Target size={12} className="text-[#27AE60]" />
            </div>
          </div>
          <span className="text-3xl text-[#27AE60]" style={{ fontWeight: 800 }}>
            10.4
          </span>
          <MiniBarChart color="#1F1F1F" accent="#27AE60" />
        </motion.div>

        {/* Stability */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#1A1A1A] rounded-[20px] p-4 border border-[#222] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 700 }}>
              Stability
            </span>
            <div className="w-6 h-6 rounded-full bg-[#2E86C1]/10 flex items-center justify-center">
              <TrendingUp size={12} className="text-[#2E86C1]" />
            </div>
          </div>
          <span className="text-3xl text-[#2E86C1]" style={{ fontWeight: 800 }}>
            94<span className="text-xl">%</span>
          </span>
          <MiniBarChart color="#1F1F1F" accent="#2E86C1" />
        </motion.div>
      </div>

      {/* ── Streak Banner ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#1A1A1A] rounded-[22px] px-5 py-4 border border-[#222] flex items-center gap-4"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E67E22]/20">
          <Flame size={20} className="text-white" fill="white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white text-sm" style={{ fontWeight: 700 }}>
            7 Day Streak!
          </h4>
          <p className="text-xs text-gray-500">Precision requires consistency.</p>
        </div>
        <ChevronRight size={18} className="text-gray-600 flex-shrink-0" />
      </motion.div>
    </div>
  );
}
