import React from 'react';
import { User, Settings, ChevronRight, Trophy, Target, Flame, Calendar, Clock, Shield, Star, LogOut, Bell, Globe, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import exampleImage from 'figma:asset/958ef1d4893422032759752829bb61342a64daca.png';

interface ProfilePageProps {
  role?: 'shooter' | 'coach' | null;
}

const achievements = [
  { icon: '🎯', label: '10+ Club', desc: 'Score 10+ avg in a session', unlocked: true },
  { icon: '🔥', label: 'On Fire', desc: '7-day training streak', unlocked: true },
  { icon: '💎', label: 'Diamond Hands', desc: '94% hold stability', unlocked: true },
  { icon: '🏆', label: 'Match Ready', desc: 'Complete all pre-match drills', unlocked: false },
  { icon: '⭐', label: 'Top 10%', desc: 'Reach top 10% score ranking', unlocked: false },
];

const menuItems = [
  { icon: Bell, label: 'Notifications', value: 'On' },
  { icon: Globe, label: 'Language', value: 'English' },
  { icon: Smartphone, label: 'Connected Devices', value: '1' },
  { icon: Shield, label: 'Privacy & Security', value: '' },
  { icon: Settings, label: 'App Settings', value: '' },
];

export function ProfilePage({ role }: ProfilePageProps) {
  const isShooter = role === 'shooter';
  const name = isShooter ? 'Arjun Sharma' : 'Coach Rajeev';
  const subtitle = isShooter ? 'Air Rifle · National Level' : 'Head Coach · Air Rifle';

  return (
    <div className="p-5 space-y-6 pb-32">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A1A1A] rounded-[24px] p-6 border border-[#222] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E67E22]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-18 h-18 rounded-full overflow-hidden ring-2 ring-[#E67E22]/30 ring-offset-2 ring-offset-[#1A1A1A]" style={{ width: 72, height: 72 }}>
            <img src={exampleImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-white" style={{ fontWeight: 700 }}>{name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] bg-[#E67E22]/15 text-[#E67E22] px-2 py-0.5 rounded-full" style={{ fontWeight: 700 }}>
                {isShooter ? 'PRO' : 'COACH'}
              </span>
              {isShooter && (
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Flame size={10} className="text-[#E67E22]" /> 7 day streak
                </span>
              )}
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-4 w-full py-3 bg-[#222] rounded-[12px] text-sm text-gray-300 flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
          style={{ fontWeight: 500 }}
        >
          <Settings size={16} />
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Stats Overview */}
      {isShooter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2"
        >
          <div className="bg-[#1A1A1A] rounded-[14px] p-3 border border-[#222] text-center">
            <div className="text-lg text-white" style={{ fontWeight: 700 }}>127</div>
            <div className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Sessions</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[14px] p-3 border border-[#222] text-center">
            <div className="text-lg text-[#27AE60]" style={{ fontWeight: 700 }}>10.4</div>
            <div className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Best Avg</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[14px] p-3 border border-[#222] text-center">
            <div className="text-lg text-[#E67E22]" style={{ fontWeight: 700 }}>7.6K</div>
            <div className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Shots</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[14px] p-3 border border-[#222] text-center">
            <div className="text-lg text-[#2E86C1]" style={{ fontWeight: 700 }}>94%</div>
            <div className="text-[9px] text-gray-500" style={{ fontWeight: 500 }}>Stability</div>
          </div>
        </motion.div>
      )}

      {/* Achievements */}
      {isShooter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#F1C40F]" />
              <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Achievements</h3>
            </div>
            <span className="text-xs text-gray-600">3 of 5</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`flex-shrink-0 w-24 rounded-[16px] p-3 border text-center ${
                  ach.unlocked 
                    ? 'bg-[#1A1A1A] border-[#222]' 
                    : 'bg-[#0a0a0a] border-[#151515] opacity-50'
                }`}
              >
                <span className="text-2xl block mb-1">{ach.icon}</span>
                <span className={`text-[10px] block ${ach.unlocked ? 'text-white' : 'text-gray-600'}`} style={{ fontWeight: 600 }}>
                  {ach.label}
                </span>
                <span className="text-[8px] text-gray-600 block mt-0.5">{ach.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Training Calendar Summary (Shooter) */}
      {isShooter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#1A1A1A] rounded-[20px] p-5 border border-[#222]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-[#27AE60]" />
            <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>This Month</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-white" style={{ fontWeight: 700 }}>18</div>
              <div className="text-[10px] text-gray-500">days trained</div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-[#27AE60]" style={{ fontWeight: 700 }}>86%</div>
              <div className="text-[10px] text-gray-500">consistency</div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-[#222] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '86%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#27AE60] to-[#2ECC71] rounded-full"
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-gray-600">18 of 21 days</span>
            <span className="text-[9px] text-[#27AE60]" style={{ fontWeight: 600 }}>On track!</span>
          </div>
        </motion.div>
      )}

      {/* Coach Stats */}
      {!isShooter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center">
            <div className="text-2xl text-white" style={{ fontWeight: 700 }}>3</div>
            <div className="text-[10px] text-gray-500">Total Athletes</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center">
            <div className="text-2xl text-[#27AE60]" style={{ fontWeight: 700 }}>16</div>
            <div className="text-[10px] text-gray-500">Sessions Reviewed</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center">
            <div className="text-2xl text-[#E67E22]" style={{ fontWeight: 700 }}>24</div>
            <div className="text-[10px] text-gray-500">Drills Assigned</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-[16px] p-4 border border-[#222] text-center">
            <div className="text-2xl text-[#2E86C1]" style={{ fontWeight: 700 }}>92%</div>
            <div className="text-[10px] text-gray-500">Completion Rate</div>
          </div>
        </motion.div>
      )}

      {/* Settings Menu */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 700 }}>Settings</h3>
        <div className="bg-[#1A1A1A] rounded-[20px] border border-[#222] overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-[#222] transition-colors ${
                i < menuItems.length - 1 ? 'border-b border-[#222]' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
                <item.icon size={16} className="text-gray-400" />
              </div>
              <span className="flex-1 text-sm text-gray-300" style={{ fontWeight: 500 }}>{item.label}</span>
              <div className="flex items-center gap-2">
                {item.value && <span className="text-xs text-gray-600">{item.value}</span>}
                <ChevronRight size={16} className="text-gray-700" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Sign Out */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-[14px] border border-red-500/20 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/5 transition-colors"
        style={{ fontWeight: 500 }}
      >
        <LogOut size={16} />
        <span className="text-sm">Sign Out</span>
      </motion.button>

      <p className="text-center text-[10px] text-gray-700">NISH v2.1.0 · Made with precision</p>
    </div>
  );
}
