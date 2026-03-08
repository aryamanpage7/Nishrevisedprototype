import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart3, Users, ChevronRight, Crosshair, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import onboardingImg1 from 'figma:asset/676c1c0d7bf1ae7c328a6f085ad59805ad6faf6e.png';
import onboardingImg2 from 'figma:asset/75863ab144288790671dbf1479ba93871a5475d4.png';
import onboardingImg3 from 'figma:asset/d723404ae6258aba852a8d4547740d898c6b9e64.png';

interface OnboardingSlidesProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    icon: Crosshair,
    iconColor: '#E67E22',
    iconBg: '#E67E22',
    title: 'Track Every Shot',
    subtitle: 'with precision',
    description: 'Aim at the target. NISH detects and logs each shot with sub-millimeter precision — automatically.',
    image: onboardingImg1,
    stats: [
      { label: 'Accuracy', value: '99.2%' },
      { label: 'Detection', value: '<0.5s' },
    ],
  },
  {
    id: 2,
    icon: Zap,
    iconColor: '#2E86C1',
    iconBg: '#2E86C1',
    title: 'AI-Powered',
    subtitle: 'analysis',
    description: 'Get real-time feedback on your stance, breathing, and trigger discipline. Our AI learns your patterns and helps you improve.',
    image: onboardingImg2,
    stats: [
      { label: 'Insights', value: 'Real-time' },
      { label: 'Drills', value: '50+' },
    ],
  },
  {
    id: 3,
    icon: Users,
    iconColor: '#27AE60',
    iconBg: '#27AE60',
    title: 'Train Together',
    subtitle: 'with your coach',
    description: 'Share sessions with your coach for personalized drills, live reviews, and targeted feedback. Train smarter, together.',
    image: onboardingImg3,
    stats: [
      { label: 'Reviews', value: 'Live' },
      { label: 'Athletes', value: '1000+' },
    ],
  },
];

export function OnboardingSlides({ onComplete }: OnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] relative overflow-hidden">
      {/* Skip button */}
      <div className="absolute top-14 right-5 z-30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSkip}
          className="text-sm text-gray-500 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]"
          style={{ fontWeight: 500 }}
        >
          Skip
        </motion.button>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
        >
          {/* Image area */}
          <div className="relative h-[45%] overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />

            {/* Floating stat pills on image */}
            <div className="absolute bottom-8 left-5 flex gap-2">
              {slide.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-black/60 backdrop-blur-xl rounded-xl px-3 py-2 border border-white/[0.08]"
                >
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>{stat.label}</div>
                  <div className="text-sm text-white" style={{ fontWeight: 700 }}>{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 px-7 pt-6 flex flex-col">
            {/* Icon badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${slide.iconBg}15`, border: `1px solid ${slide.iconBg}25` }}
            >
              <slide.icon size={22} style={{ color: slide.iconColor }} />
            </motion.div>

            <h2 className="text-3xl text-white leading-tight" style={{ fontWeight: 700 }}>
              {slide.title}
              <br />
              <span className="text-gray-500">{slide.subtitle}</span>
            </h2>

            <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-[300px]">
              {slide.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="px-7 pb-10 pt-4 flex flex-col gap-3 relative z-20">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-1">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === currentSlide ? 24 : 8,
                backgroundColor: i === currentSlide ? '#E67E22' : '#333',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Next / Get Started button — full width */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className={`w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 transition-all ${
            isLast
              ? 'bg-[#E67E22] shadow-lg shadow-[#E67E22]/20'
              : 'bg-[#1A1A1A] border border-[#2A2A2A]'
          }`}
        >
          <span
            className={`text-[15px] ${isLast ? 'text-[#050505]' : 'text-white'}`}
            style={{ fontWeight: 700 }}
          >
            {isLast ? 'Get Started' : 'Next'}
          </span>
          {isLast ? (
            <ArrowRight size={18} className="text-[#050505]" />
          ) : (
            <ChevronRight size={18} className={isLast ? 'text-[#050505]' : 'text-gray-500'} />
          )}
        </motion.button>
      </div>
    </div>
  );
}