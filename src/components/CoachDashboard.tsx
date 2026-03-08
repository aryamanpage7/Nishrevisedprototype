import React from 'react';
import { Copy, Users, Clock, Target, Bell, ChevronRight, Trophy, TrendingUp, ArrowUpRight, User, Flame } from 'lucide-react';
import { motion } from 'motion/react';

const recentActivity = [
  { name: 'Arjun S.', action: 'Completed session', score: 10.4, time: '2h ago', avatar: 'A' },
  { name: 'Priya M.', action: 'New personal best!', score: 10.6, time: '4h ago', avatar: 'P', isPB: true },
  { name: 'Rahul K.', action: 'Completed drill', score: null, time: '5h ago', avatar: 'R' },
];

const topPerformers = [
  { name: 'Priya M.', avg: 10.4, streak: 12, trend: 'up' },
  { name: 'Arjun S.', avg: 10.2, streak: 7, trend: 'up' },
  { name: 'Rahul K.', avg: 9.8, streak: 3, trend: 'down' },
];

export function CoachDashboard() {
  return (
    <div className="p-5 space-y-6 pb-32">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center pt-2"
      >
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="text-2xl text-white tracking-tight" style={{ fontWeight: 700 }}>Coach Rajesh</h1>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="relative p-2.5"
        >
          <Bell size={22} className="text-gray-300" />
          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E67E22] text-[9px] flex items-center justify-center text-white border-2 border-[#050505]" style={{ fontWeight: 700 }}>2</div>
        </motion.button>
      </motion.header>

      {/* Coach ID Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#2E86C1]/10 to-[#2E86C1]/5 rounded-[20px] p-5 border border-[#2E86C1]/15 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E86C1]/5 rounded-full blur-[60px]" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] text-[#2E86C1] uppercase tracking-wider" style={{ fontWeight: 700 }}>Your Coach ID</span>
            <h2 className="text-xl text-white tracking-wide mt-1" style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700 }}>COACH-ZPIS6G4A</h2>
            <span className="text-xs text-gray-500">Share with students to connect</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full bg-[#2E86C1]/15 flex items-center justify-center text-[#2E86C1] hover:bg-[#2E86C1] hover:text-white transition-colors"
          >
            <Copy size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center"
        >
          <div className="w-8 h-8 rounded-full bg-[#2E86C1]/10 flex items-center justify-center mx-auto mb-2">
            <Users size={14} className="text-[#2E86C1]" />
          </div>
          <div className="text-xl text-white" style={{ fontWeight: 700 }}>3</div>
          <div className="text-[10px] text-gray-500" style={{ fontWeight: 500 }}>Athletes</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center"
        >
          <div className="w-8 h-8 rounded-full bg-[#E67E22]/10 flex items-center justify-center mx-auto mb-2">
            <Clock size={14} className="text-[#E67E22]" />
          </div>
          <div className="text-xl text-white" style={{ fontWeight: 700 }}>1</div>
          <div className="text-[10px] text-gray-500" style={{ fontWeight: 500 }}>Pending</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center"
        >
          <div className="w-8 h-8 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-2">
            <Target size={14} className="text-[#27AE60]" />
          </div>
          <div className="text-xl text-white" style={{ fontWeight: 700 }}>16</div>
          <div className="text-[10px] text-gray-500" style={{ fontWeight: 500 }}>Sessions</div>
        </motion.div>
      </div>

      {/* Team Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-[#F1C40F]" />
            <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Squad Leaderboard</h3>
          </div>
          <button className="text-xs text-[#2E86C1] flex items-center gap-1" style={{ fontWeight: 600 }}>
            Details <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-[#1A1A1A] rounded-[20px] border border-[#222] overflow-hidden">
          {topPerformers.map((athlete, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className={`flex items-center gap-4 p-4 ${i < topPerformers.length - 1 ? 'border-b border-[#222]' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                i === 0 ? 'bg-[#F1C40F]/15 text-[#F1C40F]' :
                i === 1 ? 'bg-gray-500/15 text-gray-400' :
                'bg-[#E67E22]/15 text-[#E67E22]'
              }`} style={{ fontWeight: 700 }}>
                {i + 1}
              </div>
              <div className="w-9 h-9 rounded-full bg-[#222] border border-[#333] flex items-center justify-center">
                <span className="text-xs text-gray-400" style={{ fontWeight: 600 }}>{athlete.name[0]}</span>
              </div>
              <div className="flex-1">
                <span className="text-white text-sm" style={{ fontWeight: 600 }}>{athlete.name}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-500">Avg {athlete.avg}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                    <Flame size={10} className="text-[#E67E22]" /> {athlete.streak}d
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-0.5 ${athlete.trend === 'up' ? 'text-[#27AE60]' : 'text-red-400'}`}>
                {athlete.trend === 'up' ? <ArrowUpRight size={14} /> : <TrendingUp size={14} className="rotate-180" />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Recent Activity</h3>
          <button className="text-xs text-[#2E86C1] flex items-center gap-1" style={{ fontWeight: 600 }}>
            All <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              className="flex items-center gap-3 bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222]"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.isPB ? 'bg-gradient-to-br from-[#F1C40F] to-[#E67E22]' : 'bg-[#222] border border-[#333]'
              }`}>
                {activity.isPB ? (
                  <Trophy size={16} className="text-white" />
                ) : (
                  <span className="text-xs text-gray-400" style={{ fontWeight: 600 }}>{activity.avatar}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-sm" style={{ fontWeight: 600 }}>{activity.name}</span>
                  {activity.isPB && (
                    <span className="text-[8px] bg-[#E67E22]/15 text-[#E67E22] px-1.5 py-0.5 rounded-full" style={{ fontWeight: 700 }}>PB!</span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{activity.action}</span>
              </div>
              <div className="text-right">
                {activity.score && (
                  <div className={`text-sm ${activity.score >= 10.5 ? 'text-[#27AE60]' : 'text-white'}`} style={{ fontWeight: 700 }}>
                    {activity.score.toFixed(1)}
                  </div>
                )}
                <div className="text-[10px] text-gray-600">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center py-4"
      >
        <p className="text-sm text-gray-600 italic">"Champions are made in training."</p>
      </motion.div>
    </div>
  );
}