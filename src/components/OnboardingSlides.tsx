import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart3, Users, ChevronRight, Crosshair, Zap, TrendingUp } from 'lucide-react';

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
    description: 'Point your camera at the target and NISH automatically detects and logs each shot with sub-millimeter accuracy.',
    image: 'https://images.unsplash.com/photo-1754008506563-7bbb075737da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjByaWZsZSUyMHNob290ZXIlMjBwcmVjaXNpb24lMjBzcG9ydHxlbnwxfHx8fDE3NzE5MjM0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    description: 'Get instant feedback on your stance, breathing, and trigger discipline. Our AI learns your patterns and suggests improvements.',
    image: 'https://images.unsplash.com/photo-1586448910234-297fae7189e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTkyMzQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    description: 'Connect with your coach for personalized drills, session reviews, and real-time feedback. Elevate your game as a team.',
    image: 'https://images.unsplash.com/photo-1765109396566-e315369d54e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb2FjaCUyMGF0aGxldGUlMjB0cmFpbmluZyUyMHRlYW18ZW58MXx8fHwxNzcxOTIzNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
      <div className="px-7 pb-10 pt-4 flex items-center justify-between relative z-20">
        {/* Progress dots */}
        <div className="flex gap-2">
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

        {/* Next / Get Started button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className={`flex items-center gap-2 rounded-2xl transition-all ${
            isLast
              ? 'bg-[#E67E22] px-7 py-4 shadow-lg shadow-[#E67E22]/20'
              : 'bg-[#1A1A1A] border border-[#2A2A2A] px-5 py-4'
          }`}
        >
          <span
            className={`text-sm ${isLast ? 'text-[#050505]' : 'text-white'}`}
            style={{ fontWeight: 700 }}
          >
            {isLast ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight size={16} className={isLast ? 'text-[#050505]' : 'text-gray-500'} />
        </motion.button>
      </div>
    </div>
  );
}
