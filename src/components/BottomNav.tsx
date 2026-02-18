import React from 'react';
import { Home, Target, Users, BarChart3, User, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'shooter' | 'coach';
}

export function BottomNav({ activeTab, onTabChange, role }: BottomNavProps) {
  const shooterTabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'reports', icon: BarChart3, label: 'Progress' },
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
      <div className="bg-[#111]/90 backdrop-blur-2xl border border-white/[0.06] rounded-[20px] px-3 py-2 flex items-center justify-around shadow-2xl shadow-black/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-0.5 py-2 px-4 rounded-2xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/[0.06] rounded-2xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8} 
                className={`relative z-10 transition-colors ${isActive ? 'text-[#E67E22]' : 'text-gray-500'}`}
              />
              <span 
                className={`relative z-10 text-[10px] transition-colors ${isActive ? 'text-[#E67E22]' : 'text-gray-600'}`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
