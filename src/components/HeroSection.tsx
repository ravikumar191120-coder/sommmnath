import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cake, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

interface HeroSectionProps {
  onScrollToCake: () => void;
  onScrollToMemories: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCake,
  onScrollToMemories
}) => {
  const triggerMegaConfetti = () => {
    sfx.playCheer();
    const count = 180;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#F472B6', '#FB7185', '#FDA4AF', '#FCD34D', '#C084FC', '#FFFFFF']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 50 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handlePop = (e: React.MouseEvent) => {
    sfx.playPop();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 22,
      spread: 45,
      colors: ['#F472B6', '#F43F5E', '#FDE047']
    });
  };

  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-6 pb-20 overflow-hidden">
      {/* Soft gradient background accents tailored for phones */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[400px] bg-gradient-to-b from-pink-200/40 via-rose-100/30 to-transparent rounded-full blur-3xl" />

      {/* Floating interactive cute elements */}
      <motion.button
        type="button"
        onClick={handlePop}
        animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        whileTap={{ scale: 0.8 }}
        className="absolute top-6 left-4 sm:left-12 text-3xl sm:text-4xl cursor-pointer select-none"
        title="Tap to pop!"
      >
        🎈
      </motion.button>

      <motion.button
        type="button"
        onClick={handlePop}
        animate={{ y: [0, -14, 0], rotate: [3, -3, 3] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.4 }}
        whileTap={{ scale: 0.8 }}
        className="absolute top-10 right-4 sm:right-16 text-3xl sm:text-4xl cursor-pointer select-none"
        title="Tap to pop!"
      >
        🐱
      </motion.button>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Subtle unboxed date badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-700 mb-3"
        >
          <span>4th October</span>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span>18th Milestone</span>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span>To Navi</span>
        </motion.div>

        {/* Main Bouncy Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 14,
            delay: 0.1
          }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-stone-900 leading-[1.12] mb-3 text-balance"
        >
          Happy 18th Birthday,{' '}
          <span className="relative inline-block text-pink-600">
            Navi
            <motion.span
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
              className="inline-block origin-bottom-right ml-1 sm:ml-2 text-3xl sm:text-5xl"
            >
              🌸
            </motion.span>
          </span>
        </motion.h1>

        {/* Starting Navi Portrait - First thing seen on website */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.18 }}
          className="relative my-4 group cursor-pointer"
          onClick={triggerMegaConfetti}
          title="The Birthday Girl Navi! (Tap for confetti blast)"
        >
          {/* Animated Glowing Ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 rounded-full blur-xs opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* Picture frame */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl bg-pink-100 flex items-center justify-center">
            <img
              src="https://files.catbox.moe/09klut.jpeg"
              alt="Navi Birthday Girl"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Birthday Girl Ribbon Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 border border-pink-200 px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-xs">👑</span>
            <span className="font-serif font-bold text-xs text-pink-700">
              Navi · 18 Today
            </span>
            <span className="text-xs">🌸</span>
          </div>
        </motion.div>

        {/* Warm, natural friend copy referencing nicknames naturally without clumping */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-sans text-sm sm:text-lg text-stone-600 max-w-xl text-balance leading-relaxed mb-8 px-2"
        >
          Turning 18 today! Here&apos;s to our sweet <span className="font-semibold text-pink-700">Bilauti 🐱</span>, the quiet poetess, and the future doctor who makes every single day a whole lot brighter.
        </motion.p>

        {/* Interactive buttons designed for easy thumb tap on phones */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md px-4 mb-12"
        >
          <motion.button
            type="button"
            onClick={triggerMegaConfetti}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-full shadow-lg shadow-pink-200 active:shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Birthday Sparkle Blast 🎉</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={onScrollToCake}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-pink-700 bg-white border border-pink-200 rounded-full shadow-xs active:bg-pink-50 transition-all cursor-pointer"
          >
            <Cake className="h-4 w-4 text-pink-500" />
            <span>Blow The Candles</span>
          </motion.button>
        </motion.div>

        {/* Personality Highlights - Phone Optimized Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-xl px-2"
        >
          <div className="bg-white/90 border border-pink-100 rounded-2xl p-3 sm:p-4 text-center shadow-xs">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-pink-600">18 Yrs</span>
            <span className="text-[11px] text-stone-500">Official Adult</span>
          </div>

          <div className="bg-white/90 border border-pink-100 rounded-2xl p-3 sm:p-4 text-center shadow-xs">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-rose-600">Bunnu 🐰</span>
            <span className="text-[11px] text-stone-500">Pure Badmashi</span>
          </div>

          <div className="bg-white/90 border border-pink-100 rounded-2xl p-3 sm:p-4 text-center shadow-xs">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-teal-600">Dr. 🩺</span>
            <span className="text-[11px] text-stone-500">NEET Aspirant</span>
          </div>

          <div className="bg-white/90 border border-pink-100 rounded-2xl p-3 sm:p-4 text-center shadow-xs">
            <span className="block text-xl sm:text-2xl font-serif font-bold text-amber-600">Snap 📖</span>
            <span className="text-[11px] text-stone-500">Diary Stories</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
