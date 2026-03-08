import React, { useState } from 'react';
import { ShooterDashboard } from './components/ShooterDashboard';
import { CoachDashboard } from './components/CoachDashboard';
import { RoleSelect } from './components/RoleSelect';
import { BottomNav } from './components/BottomNav';
import { SessionMode } from './components/SessionMode';
import { PerformanceReports } from './components/PerformanceReports';
import { AIStanceLab } from './components/AIStanceLab';
import { ReviewsPage } from './components/ReviewsPage';
import { ProfilePage } from './components/ProfilePage';
import { CoachSquadPage } from './components/CoachSquadPage';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingSlides } from './components/OnboardingSlides';
import { AuthScreen } from './components/AuthScreen';
import { ProfileSetup } from './components/ProfileSetup';
import { motion, AnimatePresence } from 'motion/react';

/*
  App flow:
  splash → onboarding → auth → roleSelect → profileSetup → main
*/
type AppStage = 'splash' | 'onboarding' | 'auth' | 'roleSelect' | 'profileSetup' | 'main';

export default function App() {
  const [stage, setStage] = useState<AppStage>('splash');
  const [role, setRole] = useState<'shooter' | 'coach' | null>(null);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inSession, setInSession] = useState(false);
  const [sessionType, setSessionType] = useState<'practice' | 'match'>('practice');
  const [prevTab, setPrevTab] = useState('dashboard');

  const handleTabChange = (tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const handleAuthComplete = (name: string) => {
    setUserName(name);
    setStage('roleSelect');
  };

  const handleRoleSelect = (r: 'shooter' | 'coach') => {
    setRole(r);
    setStage('profileSetup');
  };

  const handleProfileSetupComplete = () => {
    setActiveTab('dashboard');
    setStage('main');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return role === 'shooter'
          ? <ShooterDashboard
              onStartSession={(type: 'practice' | 'match') => { setSessionType(type); setInSession(true); }}
              onNavigate={handleTabChange}
              userName={userName}
            />
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
        return <AIStanceLab onStartSession={(type: 'practice' | 'match') => { setSessionType(type); setInSession(true); }} />;
      case 'profile':
        return <ProfilePage role={role} />;
      default:
        return <ShooterDashboard
          onStartSession={(type: 'practice' | 'match') => { setSessionType(type); setInSession(true); }}
          onNavigate={handleTabChange}
          userName={userName}
        />;
    }
  };

  const showStatusBar = stage !== 'splash';
  const showNav = stage === 'main' && !inSession && !!role;

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-center p-0 md:p-8">
      {/* Smartphone Container */}
      <div className="w-full max-w-[430px] h-screen md:h-[850px] bg-[#050505] relative shadow-2xl overflow-hidden flex flex-col md:rounded-[40px] border border-[#222] ring-8 ring-[#111]">

        {/* Status Bar */}
        <AnimatePresence>
          {showStatusBar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="h-12 w-full flex justify-between items-center px-6 text-white/70 text-[11px] z-50 pointer-events-none absolute top-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent"
            >
              <span style={{ fontWeight: 600 }}>9:41</span>
              <div className="flex gap-1.5 items-center">
                <div className="flex gap-0.5">
                  <div className="w-[3px] h-2 bg-white/30 rounded-sm" />
                  <div className="w-[3px] h-2.5 bg-white/30 rounded-sm" />
                  <div className="w-[3px] h-3 bg-white/40 rounded-sm" />
                  <div className="w-[3px] h-3.5 bg-white/60 rounded-sm" />
                </div>
                <span className="text-white/30 mx-0.5 text-[10px]">WiFi</span>
                <div className="w-6 h-2.5 border border-white/25 rounded-[3px] relative">
                  <div className="absolute inset-[1.5px] right-[3px] bg-[#27AE60] rounded-[1.5px]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">

            {/* ── Splash Screen ── */}
            {stage === 'splash' && (
              <motion.div
                key="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <SplashScreen onComplete={() => setStage('onboarding')} />
              </motion.div>
            )}

            {/* ── Onboarding Slides ── */}
            {stage === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <OnboardingSlides onComplete={() => setStage('auth')} />
              </motion.div>
            )}

            {/* ── Auth Screen ── */}
            {stage === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <AuthScreen onComplete={handleAuthComplete} />
              </motion.div>
            )}

            {/* ── Role Selection ── */}
            {stage === 'roleSelect' && (
              <motion.div
                key="roleSelect"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <RoleSelect userName={userName} onSelectRole={handleRoleSelect} />
              </motion.div>
            )}

            {/* ── Profile Setup ── */}
            {stage === 'profileSetup' && role && (
              <motion.div
                key="profileSetup"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProfileSetup
                  role={role}
                  userName={userName || 'Aryaman'}
                  onComplete={handleProfileSetupComplete}
                />
              </motion.div>
            )}

            {/* ── Session Mode ── */}
            {stage === 'main' && inSession && (
              <motion.div
                key="session"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <SessionMode sessionType={sessionType} onExit={() => setInSession(false)} />
              </motion.div>
            )}

            {/* ── Main App ── */}
            {stage === 'main' && !inSession && (
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
          {showNav && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} role={role!} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}