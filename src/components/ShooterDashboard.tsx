import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, ChevronRight, Target, Flame, TrendingUp, Clock, X, MessageSquare, Zap, BarChart3, Calendar, Award, ArrowRight, CheckCircle2, Circle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShooterDashboardProps {
  onStartSession: (type: 'practice' | 'match') => void;
  onNavigate?: (tab: string) => void;
  userName?: string;
}

const PROFILE_IMG = 'https://images.unsplash.com/photo-1697517530015-616c6ec84fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTMyNTU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const COACH_IMG = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjb2FjaCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTMyNTU3MXww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral';

/* ── Helpers ─────────────────────────────────────────────── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const getFormattedDate = () => {
  const d = new Date();
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
};

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

/* ── Recent sessions mock ────────────────────────────────── */
const recentSessions = [
  { type: 'Match', shots: 60, avg: 10.4, date: 'Today', status: 'Reviewed', time: '2h ago' },
  { type: 'Practice', shots: 40, avg: 10.1, date: 'Yesterday', status: 'Pending Review', time: '1d ago' },
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
    <div className="flex justify-center mb-[-1px] relative z-10">
      <div className="w-8 h-1.5 rounded-full bg-[#2E86C1]/30" />
    </div>

    <div className="bg-[#131313] rounded-[20px] border border-[#2E86C1]/20 p-4 relative overflow-hidden shadow-xl shadow-[#2E86C1]/5">
      <div className="absolute top-0 left-0 w-[120px] h-[80px] bg-[#2E86C1]/5 blur-[40px] rounded-full" />

      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center z-10 hover:bg-white/[0.08] transition-colors"
      >
        <X size={12} className="text-gray-500" />
      </button>

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

      <p className="text-[13px] text-gray-300 leading-relaxed relative z-10">
        "Great session today! Your hold time improved by 12%. Focus on your breathing rhythm — try a 4-2-4 cadence before your next match."
      </p>

      <div className="flex items-center gap-2 mt-3 relative z-10">
        <button className="flex items-center gap-1.5 bg-[#2E86C1]/10 border border-[#2E86C1]/20 px-3 py-1.5 rounded-full hover:bg-[#2E86C1]/15 transition-colors">
          <span className="text-[10px] text-[#2E86C1]" style={{ fontWeight: 600 }}>Reply</span>
        </button>
        <button className="flex items-center gap-1.5 bg-white/[0.03] border border-[#222] px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
          <span className="text-[10px] text-gray-500" style={{ fontWeight: 600 }}>View All</span>
        </button>
      </div>
    </div>
  </motion.div>
);

/* ── Target Score Visualization ──────────────────────────── */
const TargetScoreViz = ({ avgScore }: { avgScore: number }) => {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;

  const rings = [
    { r: 90, score: 6, fill: '#111111', stroke: '#1E1E1E' },
    { r: 76, score: 7, fill: '#131313', stroke: '#222222' },
    { r: 62, score: 8, fill: '#161616', stroke: '#262626' },
    { r: 48, score: 9, fill: '#191919', stroke: '#2A2A2A' },
    { r: 32, score: 10, fill: '#1C1C1C', stroke: '#303030' },
    { r: 12, score: 10.9, fill: '#E67E22', stroke: '#E67E22' },
  ];

  const scoreToRadius = (s: number) => {
    const clamped = Math.max(6, Math.min(10.9, s));
    const normalized = (clamped - 6) / (10.9 - 6);
    return 90 * (1 - normalized);
  };

  const getScoreColor = (s: number) =>
    s >= 10.5 ? '#27AE60' : s >= 10.0 ? '#E67E22' : '#E74C3C';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((ring, i) => (
        <circle key={i} cx={cx} cy={cy} r={ring.r} fill={ring.fill} stroke={ring.stroke} strokeWidth={1} />
      ))}
      <line x1={cx} y1={cy - 94} x2={cx} y2={cy + 94} stroke="#222" strokeWidth={0.6} />
      <line x1={cx - 94} y1={cy} x2={cx + 94} y2={cy} stroke="#222" strokeWidth={0.6} />

      {(() => {
        const avgR = scoreToRadius(avgScore);
        return (
          <>
            <motion.circle cx={cx} cy={cy} fill="none" stroke="#E67E22" strokeWidth={8} opacity={0.06}
              initial={{ r: 0 }} animate={{ r: avgR }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} />
            <motion.circle cx={cx} cy={cy} fill="none" stroke="#E67E22" strokeWidth={1.5} strokeDasharray="6 3" opacity={0.6}
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
            <motion.circle cx={sx} cy={sy} r={8} fill={color} opacity={0}
              initial={{ opacity: 0, r: 3 }} animate={{ opacity: 0.1, r: 8 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }} />
            <motion.circle cx={sx} cy={sy} fill={color} stroke="#050505" strokeWidth={2}
              initial={{ r: 0 }} animate={{ r: 4 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 }} />
          </motion.g>
        );
      })}

      <circle cx={cx} cy={cy} r={16} fill="#0A0A0A" stroke="#E67E22" strokeWidth={1.5} opacity={0.9} />
      <motion.text x={cx} y={cy + 1} fill="#E67E22" fontSize="10" fontWeight="800" textAnchor="middle" dominantBaseline="middle" fontFamily="ui-monospace, monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {avgScore.toFixed(1)}
      </motion.text>
      <motion.text x={cx} y={cy + 10} fill="#888" fontSize="4.5" fontWeight="600" textAnchor="middle" letterSpacing="1"
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
  const w = 56;
  const h = 18;
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
      <motion.circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / (max - min)) * h}
        r={2.5}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, type: 'spring' }}
      />
    </svg>
  );
};

/* ── Coach Assigned Tasks Data ───────────────────────────── */
interface CoachTask {
  id: string;
  name: string;
  type: 'shooting' | 'drill';
  sessionType?: 'practice' | 'match';
  duration: string;
  category: string;
  color: string;
  steps?: string[];
}

const coachTasks: CoachTask[] = [
  {
    id: 'wall-hold',
    name: 'Wall Holding & Visualization',
    type: 'drill',
    duration: '20 min',
    category: 'Focus drill',
    color: '#2E86C1',
    steps: ['Hold position 30s × 5 reps', 'Visualize target alignment', 'Deep breathing between sets'],
  },
  {
    id: 'self-led-practice',
    name: 'Self-Led Practice',
    type: 'shooting',
    sessionType: 'practice',
    duration: '~45 min',
    category: '40 shots',
    color: '#E67E22',
  },
  {
    id: 'breathing-drill',
    name: 'Breathing Pattern Drill',
    type: 'drill',
    duration: '15 min',
    category: 'Recovery',
    color: '#27AE60',
    steps: ['4-2-4 cadence × 10 cycles', 'Hold breath steady 5s × 8', 'Post-drill reflection notes'],
  },
  {
    id: 'coach-led-match',
    name: 'Coach-Led Match Sim',
    type: 'shooting',
    sessionType: 'match',
    duration: '~60 min',
    category: '60 shots',
    color: '#27AE60',
  },
  {
    id: 'balance-training',
    name: 'Balance & Core Stability',
    type: 'drill',
    duration: '12 min',
    category: 'Strength',
    color: '#9B59B6',
    steps: ['Single-leg stand 30s each side', 'Weight shift drill × 10', 'Core engagement hold 20s × 4'],
  },
];

/* ── Storage Keys ────────────────────────────────────────── */
const STORAGE_KEY_STEPS = 'nish_coach_checkedSteps';
const STORAGE_KEY_SHOOTING = 'nish_coach_shootingDone';
const STORAGE_KEY_SUBMITTED = 'nish_coach_submitted';

/* ── Main Component ──────────────────────────────────────── */
export function ShooterDashboard({ onStartSession, onNavigate, userName }: ShooterDashboardProps) {
  const avgScore = +(recentShots.reduce((a, s) => a + s.score, 0) / recentShots.length).toFixed(1);
  const bestShot = Math.max(...recentShots.map(s => s.score));
  const [showCoachNote, setShowCoachNote] = useState(true);

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEPS);
      if (saved) return JSON.parse(saved);
    } catch {}
    const init: Record<string, boolean[]> = {};
    coachTasks.forEach(t => {
      if (t.steps) init[t.id] = t.steps.map(() => false);
    });
    return init;
  });

  const [shootingDone, setShootingDone] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHOOTING);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [submitted, setSubmitted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBMITTED);
      if (saved) return JSON.parse(saved);
    } catch {}
    return false;
  });

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevCardIdx = useRef(0);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cardTransforms, setCardTransforms] = useState<{ scale: number; opacity: number; rotateY: number }[]>(
    coachTasks.map((_, i) => ({ scale: i === 0 ? 1 : 0.92, opacity: i === 0 ? 1 : 0.55, rotateY: 0 }))
  );

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STEPS, JSON.stringify(checkedSteps));
  }, [checkedSteps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SHOOTING, JSON.stringify(shootingDone));
  }, [shootingDone]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SUBMITTED, JSON.stringify(submitted));
  }, [submitted]);

  // Haptic feedback on card change
  useEffect(() => {
    if (activeCardIdx !== prevCardIdx.current) {
      prevCardIdx.current = activeCardIdx;
      if (navigator.vibrate) {
        navigator.vibrate(8);
      }
    }
  }, [activeCardIdx]);

  // Scroll-based active card tracking + per-card cylinder transforms
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const CARD_W = 260;
    const GAP = 12;
    const cardStride = CARD_W + GAP;
    const scrollLeft = el.scrollLeft;
    const idx = Math.round(scrollLeft / cardStride);
    setActiveCardIdx(Math.min(Math.max(idx, 0), coachTasks.length - 1));

    // Per-card cylinder depth transforms
    const transforms = coachTasks.map((_, i) => {
      const cardCenter = i * cardStride + CARD_W / 2;
      const viewportCenter = scrollLeft + el.clientWidth / 2;
      const dist = (cardCenter - viewportCenter) / cardStride; // normalized distance (-1, 0, 1 ...)
      const absDist = Math.abs(dist);
      const scale = Math.max(0.88, 1 - absDist * 0.1);
      const opacity = Math.max(0.4, 1 - absDist * 0.5);
      const rotateY = dist * -8; // subtle barrel rotation
      return { scale, opacity, rotateY };
    });
    setCardTransforms(transforms);

    // Debounced mechanical snap-to-detent
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      const snapIdx = Math.round(el.scrollLeft / cardStride);
      const target = snapIdx * cardStride;
      if (Math.abs(el.scrollLeft - target) > 2) {
        el.scrollTo({ left: target, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const displayName = userName || 'Aryaman';
  const firstName = displayName.split(' ')[0];

  const toggleStep = (taskId: string, stepIdx: number) => {
    setCheckedSteps(prev => {
      const copy = { ...prev, [taskId]: [...(prev[taskId] || [])] };
      copy[taskId][stepIdx] = !copy[taskId][stepIdx];
      return copy;
    });
  };

  const isTaskComplete = (task: CoachTask) => {
    if (task.type === 'shooting') return !!shootingDone[task.id];
    if (task.steps) return checkedSteps[task.id]?.every(Boolean) ?? false;
    return false;
  };

  const completedCount = coachTasks.filter(isTaskComplete).length;
  const allDone = completedCount === coachTasks.length;

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
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{getFormattedDate()}</p>
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

      {/* ── Quick Actions ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate?.('ai-lab')}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222] text-left hover:border-[#333] transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E67E22]/10 flex items-center justify-center mb-3">
            <Zap size={18} className="text-[#E67E22]" />
          </div>
          <span className="text-white text-sm block" style={{ fontWeight: 600 }}>Training Lab</span>
          <span className="text-[10px] text-gray-500 mt-0.5 block">Drills & stance analysis</span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[9px] text-[#E67E22]" style={{ fontWeight: 600 }}>Open</span>
            <ChevronRight size={10} className="text-[#E67E22]" />
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate?.('reports')}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222] text-left hover:border-[#333] transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2E86C1]/10 flex items-center justify-center mb-3">
            <BarChart3 size={18} className="text-[#2E86C1]" />
          </div>
          <span className="text-white text-sm block" style={{ fontWeight: 600 }}>Insights</span>
          <span className="text-[10px] text-gray-500 mt-0.5 block">Scores, trends & AI tips</span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[9px] text-[#2E86C1]" style={{ fontWeight: 600 }}>View</span>
            <ChevronRight size={10} className="text-[#2E86C1]" />
          </div>
        </motion.button>
      </motion.div>

      {/* ── Coach Assigned Tasks — Horizontal Scroll ──── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#2E86C1]/10 border border-[#2E86C1]/20 px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2E86C1]" />
              <span className="text-[9px] text-[#2E86C1] uppercase tracking-wider" style={{ fontWeight: 700 }}>
                Assigned by Coach
              </span>
            </div>
          </div>
          <span className="text-[10px] text-gray-500" style={{ fontWeight: 600 }}>
            {completedCount}/{coachTasks.length} done
          </span>
        </div>

        {/* Horizontal scroll container */}
        <div
          className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 snap-x snap-mandatory no-scrollbar"
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ perspective: 800 }}
        >
          {coachTasks.map((task, i) => {
            const done = isTaskComplete(task);
            const stepsChecked = checkedSteps[task.id] || [];
            const stepsCompleted = stepsChecked.filter(Boolean).length;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 + i * 0.06 }}
                className={`flex-shrink-0 w-[260px] snap-start bg-[#1A1A1A] rounded-[20px] border overflow-hidden transition-colors ${
                  done ? 'border-[#27AE60]/30' : 'border-[#222]'
                }`}
                style={{
                  transform: `scale(${cardTransforms[i].scale}) rotateY(${cardTransforms[i].rotateY}deg)`,
                  opacity: cardTransforms[i].opacity,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out',
                }}
              >
                {/* Card header */}
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        fontWeight: 700,
                        color: task.color,
                        backgroundColor: `${task.color}15`,
                      }}
                    >
                      {task.type === 'shooting' ? 'Shooting' : 'Drill'}
                    </span>
                    {done && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <CheckCircle2 size={16} className="text-[#27AE60]" />
                      </motion.div>
                    )}
                  </div>

                  <h4 className="text-white text-[14px] mb-1" style={{ fontWeight: 700 }}>
                    {task.name}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {task.duration}
                    </span>
                    <span className="text-gray-700">·</span>
                    <span>{task.category}</span>
                  </div>
                </div>

                {/* Card body — checklist or shooting CTA */}
                <div className="px-4 pb-4">
                  {task.type === 'drill' && task.steps ? (
                    <div className="space-y-2">
                      {task.steps.map((step, si) => (
                        <motion.button
                          key={si}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleStep(task.id, si)}
                          className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                            stepsChecked[si]
                              ? 'bg-[#27AE60]/5 border-[#27AE60]/20'
                              : 'bg-[#111] border-[#1E1E1E] hover:border-[#333]'
                          }`}
                        >
                          {stepsChecked[si] ? (
                            <CheckCircle2 size={16} className="text-[#27AE60] flex-shrink-0" />
                          ) : (
                            <Circle size={16} className="text-gray-600 flex-shrink-0" />
                          )}
                          <span
                            className={`text-[11px] ${
                              stepsChecked[si] ? 'text-gray-400 line-through' : 'text-gray-300'
                            }`}
                            style={{ fontWeight: 500 }}
                          >
                            {step}
                          </span>
                        </motion.button>
                      ))}
                      {/* Progress indicator */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-[#111] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#27AE60] rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${task.steps ? (stepsCompleted / task.steps.length) * 100 : 0}%`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <span className="text-[9px] text-gray-500" style={{ fontWeight: 600 }}>
                          {stepsCompleted}/{task.steps?.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Shooting session CTA */
                    <div className="space-y-2">
                      <div className="bg-[#111] rounded-xl p-3 border border-[#1E1E1E]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Target size={12} style={{ color: task.color }} />
                          <span className="text-[10px] text-gray-400" style={{ fontWeight: 600 }}>
                            {task.sessionType === 'practice' ? 'Self-Led Session' : 'Coach-Led Session'}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-600">
                          Opens shot recording with live scoring.
                        </p>
                      </div>

                      {done ? (
                        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-[#27AE60]/10 rounded-xl border border-[#27AE60]/20">
                          <CheckCircle2 size={14} className="text-[#27AE60]" />
                          <span className="text-[11px] text-[#27AE60]" style={{ fontWeight: 700 }}>
                            Session Completed
                          </span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            onStartSession(task.sessionType!);
                            setShootingDone(prev => ({ ...prev, [task.id]: true }));
                          }}
                          className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                          style={{ backgroundColor: task.color }}
                        >
                          <Play size={14} className="text-[#050505]" fill="#050505" />
                          <span className="text-[#050505] text-[12px]" style={{ fontWeight: 700 }}>
                            Start Session
                          </span>
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          {coachTasks.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: i * (260 + 12),
                  behavior: 'smooth',
                });
              }}
              className="rounded-full transition-all"
              animate={{
                width: activeCardIdx === i ? 16 : 6,
                height: 6,
                backgroundColor: activeCardIdx === i ? '#2E86C1' : '#333',
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>

        {/* Submit All to Coach */}
        <AnimatePresence>
          {!submitted ? (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSubmitted(true)}
              disabled={completedCount === 0}
              className={`w-full mt-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 border transition-all ${
                allDone
                  ? 'bg-[#2E86C1] border-[#2E86C1] shadow-lg shadow-[#2E86C1]/20'
                  : completedCount > 0
                    ? 'bg-[#2E86C1]/15 border-[#2E86C1]/30'
                    : 'bg-[#111] border-[#1E1E1E] opacity-40'
              }`}
            >
              <Send size={14} className={allDone ? 'text-white' : 'text-[#2E86C1]'} />
              <span
                className={`text-[12px] ${allDone ? 'text-white' : 'text-[#2E86C1]'}`}
                style={{ fontWeight: 700 }}
              >
                Submit All to Coach ({completedCount}/{coachTasks.length})
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full mt-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 bg-[#27AE60]/10 border border-[#27AE60]/20"
            >
              <CheckCircle2 size={14} className="text-[#27AE60]" />
              <span className="text-[12px] text-[#27AE60]" style={{ fontWeight: 700 }}>
                Submitted to Coach Rajesh
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Today's Shot Map (Compact) ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-[#1A1A1A] rounded-[22px] border border-[#222] overflow-hidden"
      >
        <div className="px-5 pt-4 pb-1 flex items-center justify-between">
          <div>
            <h3 className="text-white text-[15px]" style={{ fontWeight: 700 }}>Today's Overview</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {recentShots.length} shots logged
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#27AE60]/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={12} className="text-[#27AE60]" />
            <span className="text-[11px] text-[#27AE60]" style={{ fontWeight: 700 }}>+0.4</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-1">
          <TargetScoreViz avgScore={avgScore} />
        </div>

        {/* Compact stat strip */}
        <div className="mx-4 mb-3 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-[#1A1A1A]">
            <div className="bg-[#0F0F0F] p-3 text-center">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Avg Score</span>
              <span className="text-lg text-[#27AE60]" style={{ fontWeight: 800 }}>10.2</span>
            </div>
            <div className="bg-[#0F0F0F] p-3 text-center">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Best</span>
              <span className="text-lg text-[#27AE60]" style={{ fontWeight: 800 }}>{bestShot.toFixed(1)}</span>
            </div>
            <div className="bg-[#0F0F0F] p-3 text-center">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Consistency</span>
              <span className="text-lg text-[#2E86C1]" style={{ fontWeight: 800 }}>94%</span>
            </div>
          </div>
        </div>

        {/* View full insights CTA */}
        <button
          onClick={() => onNavigate?.('reports')}
          className="w-full px-5 py-3 border-t border-[#1E1E1E] flex items-center justify-center gap-2 hover:bg-white/[0.02] transition-colors"
        >
          <span className="text-[11px] text-gray-400" style={{ fontWeight: 600 }}>View Full Insights</span>
          <ChevronRight size={12} className="text-gray-500" />
        </button>
      </motion.div>

      {/* ── Recent Sessions ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-[15px]" style={{ fontWeight: 700 }}>Recent Sessions</h3>
        </div>

        <div className="space-y-2.5">
          {recentSessions.map((session, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                session.type === 'Match' ? 'bg-[#27AE60]/10' : 'bg-[#E67E22]/10'
              }`}>
                {session.type === 'Match'
                  ? <Play size={16} className="text-[#27AE60]" fill="#27AE60" />
                  : <Target size={16} className="text-[#E67E22]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm" style={{ fontWeight: 600 }}>{session.type}</span>
                  <span className="text-[9px] text-gray-600">{session.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-500">{session.shots} shots</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <span className="text-[10px] text-gray-500">Avg {session.avg.toFixed(1)}</span>
                </div>
              </div>
              <div className={`text-[9px] px-2 py-1 rounded-full ${
                session.status === 'Reviewed'
                  ? 'bg-[#27AE60]/10 text-[#27AE60]'
                  : 'bg-[#E67E22]/10 text-[#E67E22]'
              }`} style={{ fontWeight: 600 }}>
                {session.status === 'Reviewed' ? 'Reviewed' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Streak Banner ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-[#1A1A1A] rounded-[22px] px-5 py-4 border border-[#222] flex items-center gap-4"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E67E22]/20">
          <Flame size={20} className="text-white" fill="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm" style={{ fontWeight: 700 }}>7-Day Streak</h4>
          <p className="text-xs text-gray-500 truncate">Consistency is the key to precision.</p>
        </div>
        <ChevronRight size={18} className="text-gray-600 flex-shrink-0" />
      </motion.div>
    </div>
  );
}