import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Chrome, Apple } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const NISH_LOGO_URL = "figma:asset/f78922ecf19e5150bd6d00984ddf008f001137e5.png";

interface AuthScreenProps {
  onComplete: (name: string) => void;
  defaultMode?: 'signup' | 'login';
}

export function AuthScreen({ onComplete, defaultMode = 'signup' }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (mode === 'signup' && !name.trim()) return;
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      onComplete(name.trim() || 'Shooter');
    }, 1200);
  };

  const canSubmit = mode === 'signup'
    ? name.trim() && email.trim() && password.length >= 6
    : email.trim() && password.length >= 6;

  return (
    <div className="h-full flex flex-col bg-[#050505] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-60px] right-[-40px] w-[250px] h-[250px] bg-[#E67E22]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[280px] h-[280px] bg-[#2E86C1]/4 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="flex-1 flex flex-col px-7 pt-20 relative z-10">
        {/* Logo + Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ImageWithFallback
            src={NISH_LOGO_URL}
            alt="NISH"
            className="w-14 h-14 rounded-2xl shadow-lg shadow-[#E67E22]/15 mb-6"
          />
          <h1 className="text-3xl text-white" style={{ fontWeight: 700 }}>
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {mode === 'signup'
              ? 'Join thousands of precision shooters'
              : 'Sign in to continue training'}
          </p>
        </motion.div>

        {/* Toggle login/signup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1.5 bg-[#111] p-1.5 rounded-2xl mb-6 border border-[#1A1A1A]"
        >
          {(['signup', 'login'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-[14px] text-sm transition-all ${
                mode === m
                  ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
                  : 'text-gray-500 border border-transparent'
              }`}
              style={{ fontWeight: mode === m ? 700 : 400 }}
            >
              {m === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </motion.div>

        {/* Form fields */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* Name field — signup only */}
            {mode === 'signup' && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111] border border-[#1E1E1E] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#E67E22]/40 transition-colors text-sm"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] border border-[#1E1E1E] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#E67E22]/40 transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-[#1E1E1E] rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#E67E22]/40 transition-colors text-sm"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot password — login only */}
            {mode === 'login' && (
              <button className="text-xs text-[#E67E22] ml-1" style={{ fontWeight: 600 }}>
                Forgot Password?
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Submit button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className={`w-full py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 transition-all ${
            canSubmit
              ? 'bg-[#E67E22] shadow-lg shadow-[#E67E22]/20'
              : 'bg-[#1A1A1A] border border-[#222]'
          }`}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
            />
          ) : (
            <>
              <span
                className={`text-sm ${canSubmit ? 'text-[#050505]' : 'text-gray-500'}`}
                style={{ fontWeight: 700 }}
              >
                {mode === 'signup' ? 'Create Account' : 'Sign In'}
              </span>
              <ArrowRight size={16} className={canSubmit ? 'text-[#050505]' : 'text-gray-600'} />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="flex-1 h-px bg-[#1A1A1A]" />
          <span className="text-[10px] text-gray-600 uppercase tracking-wider" style={{ fontWeight: 600 }}>or continue with</span>
          <div className="flex-1 h-px bg-[#1A1A1A]" />
        </motion.div>

        {/* Social login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 mt-5"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3.5 bg-[#111] border border-[#1E1E1E] rounded-2xl flex items-center justify-center gap-2 hover:border-[#333] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm text-gray-300" style={{ fontWeight: 600 }}>Google</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3.5 bg-[#111] border border-[#1E1E1E] rounded-2xl flex items-center justify-center gap-2 hover:border-[#333] transition-colors"
          >
            <Apple size={18} className="text-white" />
            <span className="text-sm text-gray-300" style={{ fontWeight: 600 }}>Apple</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom legal text */}
      <div className="px-7 pb-8 relative z-10">
        <p className="text-[10px] text-gray-700 text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <span className="text-gray-500">Terms of Service</span> and{' '}
          <span className="text-gray-500">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}