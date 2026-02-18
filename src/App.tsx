import React, { useState } from 'react';
import { ShooterDashboard } from './components/ShooterDashboard';
import { CoachDashboard } from './components/CoachDashboard';
import { RoleGateway } from './components/RoleGateway';
import { BottomNav } from './components/BottomNav';
import { SessionMode } from './components/SessionMode';
import { PerformanceReports } from './components/PerformanceReports';
import { AIStanceLab } from './components/AIStanceLab';
import { ReviewsPage } from './components/ReviewsPage';
import { ProfilePage } from './components/ProfilePage';
import { CoachSquadPage } from './components/CoachSquadPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<'shooter' | 'coach' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inSession, setInSession] = useState(false);
  const [prevTab, setPrevTab] = useState('dashboard');

  const handleTabChange = (tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return role === 'shooter' 
          ? <ShooterDashboard onStartSession={() => setInSession(true)} /> 
          : <CoachDashboard />;
      case 'sessions':
        return <ReviewsPage />;
      case 'squad':
        return <CoachSquadPage />;
      case 'reports':
        return <PerformanceReports />;
      case 'reviews':
        return <ReviewsPage />;
      case 'ai-lab':
        return <AIStanceLab />;
      case 'profile':
        return <ProfilePage role={role} />;
      default:
        return <ShooterDashboard onStartSession={() => setInSession(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-center p-0 md:p-8">
      {/* Smartphone Container */}
      <div className="w-full max-w-[430px] h-screen md:h-[850px] bg-[#050505] relative shadow-2xl overflow-hidden flex flex-col md:rounded-[40px] border border-[#222] ring-8 ring-[#111]">
        
        {/* Status Bar */}
        <div className="h-12 w-full flex justify-between items-center px-6 text-white/80 text-xs z-50 pointer-events-none absolute top-0 bg-gradient-to-b from-[#050505]/90 to-transparent">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
             <div className="flex gap-0.5">
               <div className="w-1 h-2 bg-white/40 rounded-sm" />
               <div className="w-1 h-2.5 bg-white/40 rounded-sm" />
               <div className="w-1 h-3 bg-white/40 rounded-sm" />
               <div className="w-1 h-3.5 bg-white/60 rounded-sm" />
             </div>
             <span className="text-white/40 mx-1">WiFi</span>
             <div className="w-6 h-2.5 border border-white/30 rounded-[2px] relative">
               <div className="absolute inset-[1px] right-[3px] bg-[#27AE60] rounded-[1px]" />
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            {inSession ? (
              <motion.div
                key="session"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <SessionMode onExit={() => setInSession(false)} />
              </motion.div>
            ) : !role ? (
              <motion.div
                key="gateway"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <RoleGateway onSelectRole={(r) => { setRole(r); setActiveTab('dashboard'); }} />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="pt-12 min-h-full pb-28"
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <AnimatePresence>
          {!inSession && role && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} role={role} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
