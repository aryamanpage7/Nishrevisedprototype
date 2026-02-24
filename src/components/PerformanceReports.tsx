import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import {
  TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Trophy,
  Target, Flame, Star, Zap, Crosshair, CheckCircle, AlertCircle, Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

/* ── Data ────────────────────────────────────────────────── */

const weeklyData = [
  { day: 'Mon', score: 9.8, shots: 45 },
  { day: 'Tue', score: 10.1, shots: 60 },
  { day: 'Wed', score: 10.0, shots: 55 },
  { day: 'Thu', score: 10.3, shots: 60 },
  { day: 'Fri', score: 10.4, shots: 50 },
  { day: 'Sat', score: 10.2, shots: 65 },
  { day: 'Sun', score: 10.5, shots: 60 },
];

const monthlyData = [
  { day: 'Wk1', score: 9.6, shots: 280 },
  { day: 'Wk2', score: 9.9, shots: 310 },
  { day: 'Wk3', score: 10.1, shots: 350 },
  { day: 'Wk4', score: 10.3, shots: 395 },
];

const threeMonthData = [
  { day: 'Dec', score: 9.2, shots: 980 },
  { day: 'Jan', score: 9.7, shots: 1150 },
  { day: 'Feb', score: 10.3, shots: 1335 },
];

const shotVolumeData = [
  { day: 'M', shots: 45, goal: 60 },
  { day: 'T', shots: 60, goal: 60 },
  { day: 'W', shots: 55, goal: 60 },
  { day: 'T', shots: 60, goal: 60 },
  { day: 'F', shots: 50, goal: 60 },
  { day: 'S', shots: 65, goal: 60 },
  { day: 'S', shots: 60, goal: 60 },
];

const skillRadarData = [
  { skill: 'Accuracy', value: 88, fullMark: 100 },
  { skill: 'Grouping', value: 76, fullMark: 100 },
  { skill: 'Stability', value: 82, fullMark: 100 },
  { skill: 'Trigger', value: 91, fullMark: 100 },
  { skill: 'Recovery', value: 70, fullMark: 100 },
  { skill: 'Focus', value: 85, fullMark: 100 },
];

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

/* ── Custom Tooltip ──────────────────────────────────────── */

function ScoreTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value;
  const shots = payload[0]?.payload?.shots;
  return (
    <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl px-4 py-3 shadow-2xl shadow-black/40">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1" style={{ fontWeight: 600 }}>{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-lg" style={{ fontWeight: 800 }}>{score?.toFixed(1)}</span>
        <span className="text-[10px] text-gray-500">avg</span>
      </div>
      {shots != null && (
        <div className="flex items-center gap-1 mt-1">
          <Crosshair size={10} className="text-[#E67E22]" />
          <span className="text-[10px] text-gray-400">{shots} shots fired</span>
        </div>
      )}
    </div>
  );
}

/* ── Custom Active Dot ───────────────────────────────────── */

function GlowDot(props: any) {
  const { cx, cy } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill="#E67E22" opacity={0.15} />
      <circle cx={cx} cy={cy} r={6} fill="#E67E22" stroke="#050505" strokeWidth={3} />
    </g>
  );
}

/* ── Component ───────────────────────────────────────────── */

export function PerformanceReports() {
  const [timeRange, setTimeRange] = useState<'W' | 'M' | '3M'>('W');

  const chartData = timeRange === 'W' ? weeklyData : timeRange === 'M' ? monthlyData : threeMonthData;
  const domainMin = timeRange === 'W' ? 9.5 : timeRange === 'M' ? 9.3 : 8.9;

  return (
    <div className="p-5 space-y-6 pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl text-white tracking-tight" style={{ fontWeight: 700 }}>Your Progress</h1>
        <p className="text-[11px] text-gray-500 mt-0.5">Track your journey to precision</p>
      </motion.header>

      {/* Progress Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#27AE60]/15 to-[#27AE60]/5 rounded-[20px] p-5 border border-[#27AE60]/15"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#27AE60]/20 flex items-center justify-center">
            <TrendingUp size={18} className="text-[#27AE60]" />
          </div>
          <div>
            <span className="text-[10px] text-[#27AE60] uppercase tracking-wider" style={{ fontWeight: 700 }}>This Week's Trend</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-white" style={{ fontWeight: 800 }}>+0.4</span>
              <div className="flex items-center text-[#27AE60]">
                <ArrowUpRight size={16} />
                <span className="text-xs" style={{ fontWeight: 600 }}>12%</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Your average score improved from 10.0 to 10.4 this week. You're in the top 15% of shooters at this level!
        </p>
      </motion.div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(['W', 'M', '3M'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-5 py-2 rounded-full text-xs transition-all ${
              timeRange === range
                ? 'bg-[#E67E22] text-[#050505]'
                : 'bg-[#1A1A1A] text-gray-500 hover:text-gray-300'
            }`}
            style={{ fontWeight: timeRange === range ? 700 : 500 }}
          >
            {range === 'W' ? 'Week' : range === 'M' ? 'Month' : '3 Months'}
          </button>
        ))}
      </div>

      {/* ── Score Trend Chart ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1A1A1A] rounded-[20px] p-5 border border-[#222] overflow-hidden"
      >
        <div className="flex justify-between items-center mb-1">
          <div>
            <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Score Trend</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Average shot score per {timeRange === 'W' ? 'day' : timeRange === 'M' ? 'week' : 'month'}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#27AE60]/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={12} className="text-[#27AE60]" />
            <span className="text-[10px] text-[#27AE60]" style={{ fontWeight: 700 }}>Improving</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-[#E67E22] rounded-full" />
            <span className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Avg Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-[#27AE60]/60 rounded-full" style={{ borderTop: '2px dashed' }} />
            <span className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Target (10.2)</span>
          </div>
        </div>

        <div className="flex justify-center -mx-2">
          <AreaChart width={370} height={180} data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E67E22" stopOpacity={0.25} />
                <stop offset="50%" stopColor="#E67E22" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#E67E22" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#555', fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              domain={[domainMin, 11]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#444', fontSize: 9, fontWeight: 500 }}
              tickFormatter={(v: number) => v.toFixed(1)}
              width={36}
            />
            <Tooltip content={<ScoreTooltip />} cursor={false} />
            <ReferenceLine
              y={10.2}
              stroke="#27AE60"
              strokeDasharray="6 4"
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#E67E22"
              strokeWidth={2.5}
              fill="url(#scoreGradient)"
              dot={{ r: 3, fill: '#E67E22', stroke: '#1A1A1A', strokeWidth: 2 }}
              activeDot={<GlowDot />}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </div>
      </motion.div>

      {/* ── Shot Volume Chart ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-[#1A1A1A] rounded-[20px] p-5 border border-[#222] overflow-hidden"
      >
        <div className="flex justify-between items-center mb-1">
          <div>
            <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Shot Volume</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Daily shots vs 60-shot goal</p>
          </div>
          <div className="text-right">
            <span className="text-white text-lg" style={{ fontWeight: 800 }}>395</span>
            <span className="text-gray-500 text-[10px] ml-1">/420</span>
          </div>
        </div>

        <div className="flex justify-center -mx-2 mt-2">
          <BarChart width={370} height={140} data={shotVolumeData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }} barCategoryGap="30%">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E86C1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2E86C1" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#555', fontSize: 10, fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#444', fontSize: 9, fontWeight: 500 }}
              domain={[0, 80]}
              width={30}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const shots = payload[0]?.value;
                return (
                  <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl px-4 py-2.5 shadow-2xl shadow-black/40">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-white text-sm" style={{ fontWeight: 800 }}>{shots}</span>
                      <span className="text-[10px] text-gray-500">shots</span>
                    </div>
                  </div>
                );
              }}
            />
            <ReferenceLine y={60} stroke="#E67E22" strokeDasharray="6 4" strokeOpacity={0.3} strokeWidth={1.5} />
            <Bar
              dataKey="shots"
              fill="url(#barGrad)"
              radius={[6, 6, 0, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </BarChart>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#2E86C1]" />
            <span className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Shots fired</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-[#E67E22]/50 rounded-full" />
            <span className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Daily goal (60)</span>
          </div>
        </div>
      </motion.div>

      {/* ── Skill Breakdown Radar ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1A1A1A] rounded-[20px] p-5 border border-[#222] overflow-hidden"
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Skill Breakdown</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Shooting fundamentals analysis</p>
          </div>
          <div className="flex items-center gap-1 bg-[#E67E22]/10 px-3 py-1.5 rounded-full">
            <Star size={11} className="text-[#E67E22]" />
            <span className="text-[10px] text-[#E67E22]" style={{ fontWeight: 700 }}>82 avg</span>
          </div>
        </div>

        <div className="flex justify-center">
          <RadarChart width={320} height={220} data={skillRadarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="#222" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: '#666', fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#E67E22"
              strokeWidth={2}
              fill="#E67E22"
              fillOpacity={0.12}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </RadarChart>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {skillRadarData.map((s) => {
            const color = s.value >= 85 ? '#27AE60' : s.value >= 75 ? '#E67E22' : '#E74C3C';
            return (
              <div
                key={s.skill}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${color}12`, border: `1px solid ${color}22` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[9px] text-gray-400" style={{ fontWeight: 600 }}>{s.skill}</span>
                <span className="text-[9px]" style={{ fontWeight: 800, color }}>{s.value}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#27AE60]/10 flex items-center justify-center">
              <Target size={13} className="text-[#27AE60]" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>Best Score</span>
          </div>
          <div className="text-2xl text-white" style={{ fontWeight: 800 }}>10.6</div>
          <div className="flex items-center gap-1 mt-1 text-[#27AE60]">
            <ArrowUpRight size={12} />
            <span className="text-[10px]" style={{ fontWeight: 600 }}>New PB this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#2E86C1]/10 flex items-center justify-center">
              <Zap size={13} className="text-[#2E86C1]" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>Total Shots</span>
          </div>
          <div className="text-2xl text-white" style={{ fontWeight: 800 }}>395</div>
          <div className="flex items-center gap-1 mt-1 text-gray-500">
            <span className="text-[10px]" style={{ fontWeight: 500 }}>105 to weekly goal</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
              <Flame size={13} className="text-[#E67E22]" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>Sessions</span>
          </div>
          <div className="text-2xl text-white" style={{ fontWeight: 800 }}>6</div>
          <div className="flex items-center gap-1 mt-1 text-[#E67E22]">
            <span className="text-[10px]" style={{ fontWeight: 500 }}>1 more to beat last week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#9B59B6]/10 flex items-center justify-center">
              <Calendar size={13} className="text-[#9B59B6]" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>Consistency</span>
          </div>
          <div className="text-2xl text-white" style={{ fontWeight: 800 }}>86%</div>
          <div className="flex items-center gap-1 mt-1 text-[#9B59B6]">
            <ArrowUpRight size={12} />
            <span className="text-[10px]" style={{ fontWeight: 600 }}>+8% vs last week</span>
          </div>
        </motion.div>
      </div>

      {/* ── Latest AI Insights ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
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
              transition={{ delay: 0.6 + i * 0.08 }}
              className="bg-[#1A1A1A] rounded-[18px] p-4 border border-[#222]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: insight.status === 'good' ? 'rgba(39,174,96,0.1)' : 'rgba(230,126,34,0.1)',
                    }}
                  >
                    {insight.status === 'good' ? (
                      <CheckCircle size={14} className="text-[#27AE60]" />
                    ) : (
                      <AlertCircle size={14} className="text-[#E67E22]" />
                    )}
                  </div>
                  <span className="text-white text-sm" style={{ fontWeight: 600 }}>{insight.title}</span>
                </div>
                <span
                  className={`text-sm ${insight.score >= 85 ? 'text-[#27AE60]' : 'text-[#E67E22]'}`}
                  style={{ fontWeight: 800 }}
                >
                  {insight.score}%
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed ml-9">{insight.detail}</p>

              <div className="mt-3 ml-9 h-[5px] bg-[#222] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${insight.score}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${insight.score >= 85 ? 'bg-[#27AE60]' : 'bg-[#E67E22]'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}