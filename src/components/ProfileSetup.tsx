import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, Target, Shield, Crosshair, Award, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const NISH_LOGO_URL = "figma:asset/f78922ecf19e5150bd6d00984ddf008f001137e5.png";

interface ProfileSetupProps {
  role: 'shooter' | 'coach';
  userName: string;
  onComplete: () => void;
}

/* ── Step 1: Weapon Selection (Shooter) or Specialty (Coach) ── */
const weaponOptions = [
  { id: 'air-rifle', label: 'Air Rifle', emoji: '🎯', desc: '10m precision shooting' },
  { id: 'air-pistol', label: 'Air Pistol', emoji: '🔫', desc: '10m pistol discipline' },
  { id: 'both', label: 'Both', emoji: '⚡', desc: 'Multi-discipline athlete' },
];

const coachSpecialties = [
  { id: 'air-rifle', label: 'Air Rifle Coach', emoji: '🎯', desc: 'Rifle technique specialist' },
  { id: 'air-pistol', label: 'Air Pistol Coach', emoji: '🔫', desc: 'Pistol technique specialist' },
  { id: 'general', label: 'General Coach', emoji: '🏅', desc: 'All-round shooting coach' },
];

/* ── Step 2: Experience Level ── */
const experienceLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'Just getting started', icon: Star, months: '<6 months' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Regular training', icon: Target, months: '6–24 months' },
  { id: 'advanced', label: 'Advanced', desc: 'Competition level', icon: Award, months: '2+ years' },
  { id: 'elite', label: 'Elite', desc: 'National/International', icon: Shield, months: '5+ years' },
];

/* ── Step 3: Goals ── */
const shooterGoals = [
  { id: 'improve-score', label: 'Improve Score', emoji: '📈' },
  { id: 'consistency', label: 'Build Consistency', emoji: '🎯' },
  { id: 'competition', label: 'Prepare for Competition', emoji: '🏆' },
  { id: 'technique', label: 'Fix Technique', emoji: '🔧' },
  { id: 'mental', label: 'Mental Strength', emoji: '🧠' },
  { id: 'fitness', label: 'Shooting Fitness', emoji: '💪' },
];

const coachGoals = [
  { id: 'track-athletes', label: 'Track Athletes', emoji: '📊' },
  { id: 'assign-drills', label: 'Assign Drills', emoji: '📋' },
  { id: 'review-sessions', label: 'Review Sessions', emoji: '🎯' },
  { id: 'competition-prep', label: 'Competition Prep', emoji: '🏆' },
  { id: 'technique-analysis', label: 'Technique Analysis', emoji: '🔍' },
  { id: 'team-management', label: 'Team Management', emoji: '👥' },
];

export function ProfileSetup({ role, userName, onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = role === 'shooter' ? 2 : 3;
  const isShooter = role === 'shooter';

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (isShooter) {
      switch (step) {
        case 0: return !!selectedWeapon;
        case 1: return !!selectedLevel;
        default: return false;
      }
    } else {
      switch (step) {
        case 0: return !!selectedWeapon;
        case 1: return !!selectedLevel;
        case 2: return selectedGoals.length > 0;
        default: return false;
      }
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      setIsComplete(true);
      setTimeout(onComplete, 2000);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  /* ── Completion Screen ── */
  if (isComplete) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E67E22]/5 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full bg-[#27AE60]/15 border-2 border-[#27AE60]/30 flex items-center justify-center mb-6 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
          >
            <Check size={36} className="text-[#27AE60]" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-white text-center relative z-10"
          style={{ fontWeight: 700 }}
        >
          You're all set,{' '}
          <span className="text-[#E67E22]">{userName.split(' ')[0]}!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 text-center mt-2 relative z-10"
        >
          {isShooter
            ? 'Your training dashboard is ready. Let\'s hit the range!'
            : 'Your coaching dashboard is ready. Time to build champions!'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center gap-2 text-gray-600 relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-gray-700 border-t-[#E67E22] rounded-full"
          />
          <span className="text-xs" style={{ fontWeight: 500 }}>Preparing your experience…</span>
        </motion.div>
      </div>
    );
  }

  const options = isShooter ? weaponOptions : coachSpecialties;
  const goals = isShooter ? shooterGoals : coachGoals;

  return (
    <div className="h-full flex flex-col bg-[#050505] relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-[-60px] left-[-40px] w-[200px] h-[200px] bg-[#E67E22]/4 rounded-full blur-[80px]" />

      {/* Header */}
      <div className="px-6 pt-16 pb-4 relative z-10">
        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-[3px] rounded-full overflow-hidden bg-[#1A1A1A]"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full bg-[#E67E22] rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Back + step indicator */}
        <div className="flex items-center justify-between mb-2">
          {step > 0 ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="text-sm text-gray-500 flex items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              <ChevronRight size={14} className="rotate-180" /> Back
            </motion.button>
          ) : (
            <div />
          )}
          <span className="text-[10px] text-gray-600 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            Step {step + 1} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 overflow-y-auto no-scrollbar pb-32 relative z-10">
        <AnimatePresence mode="wait">
          {/* Step 0: Weapon / Specialty */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>
                  {isShooter ? 'What do you shoot?' : 'Your specialty?'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isShooter ? 'Select your primary discipline' : 'Choose your coaching focus'}
                </p>
              </div>

              <div className="space-y-3">
                {options.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWeapon(opt.id)}
                    className={`w-full p-5 rounded-[20px] text-left flex items-center gap-4 border transition-all ${
                      selectedWeapon === opt.id
                        ? 'bg-[#E67E22]/8 border-[#E67E22]/30'
                        : 'bg-[#1A1A1A] border-[#222] hover:border-[#333]'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                      selectedWeapon === opt.id ? 'bg-[#E67E22]/15' : 'bg-[#222]'
                    }`}>
                      {opt.emoji}
                    </div>
                    <div className="flex-1">
                      <span className="text-white text-[15px] block" style={{ fontWeight: 600 }}>{opt.label}</span>
                      <span className="text-xs text-gray-500 mt-0.5 block">{opt.desc}</span>
                    </div>
                    {selectedWeapon === opt.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="w-7 h-7 rounded-full bg-[#E67E22] flex items-center justify-center"
                      >
                        <Check size={14} className="text-[#050505]" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Experience Level */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>
                  {isShooter ? 'Experience level?' : 'Coaching experience?'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  This helps us personalize your experience
                </p>
              </div>

              <div className="space-y-3">
                {experienceLevels.map((level, i) => {
                  const Icon = level.icon;
                  return (
                    <motion.button
                      key={level.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`w-full p-4 rounded-[18px] text-left flex items-center gap-4 border transition-all ${
                        selectedLevel === level.id
                          ? 'bg-[#E67E22]/8 border-[#E67E22]/30'
                          : 'bg-[#1A1A1A] border-[#222] hover:border-[#333]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedLevel === level.id ? 'bg-[#E67E22]/15' : 'bg-[#222]'
                      }`}>
                        <Icon size={20} className={selectedLevel === level.id ? 'text-[#E67E22]' : 'text-gray-500'} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm" style={{ fontWeight: 600 }}>{level.label}</span>
                          <span className="text-[9px] text-gray-600 bg-[#222] px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                            {level.months}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 mt-0.5 block">{level.desc}</span>
                      </div>
                      {selectedLevel === level.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="w-6 h-6 rounded-full bg-[#E67E22] flex items-center justify-center"
                        >
                          <Check size={12} className="text-[#050505]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>
                  {isShooter ? 'Your goals?' : 'How will you use NISH?'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Select all that apply · You can change these later
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {goals.map((goal, i) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-[18px] text-left border transition-all relative overflow-hidden ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-[#E67E22]/8 border-[#E67E22]/30'
                        : 'bg-[#1A1A1A] border-[#222]'
                    }`}
                  >
                    {selectedGoals.includes(goal.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E67E22] flex items-center justify-center"
                      >
                        <Check size={10} className="text-[#050505]" strokeWidth={3} />
                      </motion.div>
                    )}
                    <span className="text-xl block mb-2">{goal.emoji}</span>
                    <span className="text-xs text-white block" style={{ fontWeight: 600 }}>{goal.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent px-6 pb-10 pt-6 z-20">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
            canProceed()
              ? 'bg-[#E67E22] shadow-lg shadow-[#E67E22]/20'
              : 'bg-[#1A1A1A] border border-[#222]'
          }`}
        >
          <span
            className={`text-sm ${canProceed() ? 'text-[#050505]' : 'text-gray-600'}`}
            style={{ fontWeight: 700 }}
          >
            {step === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
          </span>
          <ChevronRight size={16} className={canProceed() ? 'text-[#050505]' : 'text-gray-700'} />
        </motion.button>
      </div>
    </div>
  );
}