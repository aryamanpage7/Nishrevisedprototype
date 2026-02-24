import React from 'react';
import { Home, BarChart3, Users, Target, User, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'shooter' | 'coach';
}

export function BottomNav({ activeTab, onTabChange, role }: BottomNavProps) {
  const shooterTabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'reports', icon: BarChart3, label: 'Insights' },
    { id: 'ai-lab', icon: Zap, label: 'Train' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const coachTabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'squad', icon: Users, label: 'Squad' },
    { id: 'reviews', icon: Target, label: 'Sessions' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const tabs = role === 'shooter' ? shooterTabs : coachTabs;

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-6 pt-2 px-5 z-40">
      <div className="bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/[0.06] rounded-[22px] px-2 py-1.5 flex items-center justify-around shadow-2xl shadow-black/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2.5 px-5 rounded-2xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#E67E22]/8 border border-[#E67E22]/10 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`relative z-10 transition-colors ${isActive ? 'text-[#E67E22]' : 'text-gray-600'}`}
              />
              <span
                className={`relative z-10 text-[9px] tracking-wide transition-colors ${isActive ? 'text-[#E67E22]' : 'text-gray-600'}`}
                style={{ fontWeight: isActive ? 700 : 500 }}
              >
                {tab.label}
              </span>
              {/* Active dot indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#E67E22]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}