import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Wind, RotateCcw, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(6).fill(true));
  const [wishRevealed, setWishRevealed] = useState(false);

  const allBlownOut = candlesLit.every((lit) => !lit);

  const blowAllCandles = () => {
    sfx.playCandleBlow();
    setCandlesLit(Array(6).fill(false));
    setWishRevealed(true);

    // Double cannon confetti
    confetti({
      particleCount: 120,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#F472B6', '#F43F5E', '#FBBF24', '#A855F7']
    });

    confetti({
      particleCount: 120,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#F472B6', '#F43F5E', '#FBBF24', '#A855F7']
    });

    setTimeout(() => {
      sfx.playCheer();
    }, 400);
  };

  const toggleSingleCandle = (index: number) => {
    sfx.playPop();
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      setWishRevealed(true);
      sfx.playCandleBlow();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => sfx.playCheer(), 300);
    }
  };

  const relightCandles = () => {
    sfx.playSparkle();
    setCandlesLit(Array(6).fill(true));
    setWishRevealed(false);
  };

  return (
    <section id="cake" className="relative py-20 px-4 bg-gradient-to-b from-[#FFF9F9] via-pink-50/50 to-[#FFF9F9] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Unboxed section kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <span>Make a Wish</span>
          <span aria-hidden="true">·</span>
          <span>Chapter 18 Ritual</span>
          <span aria-hidden="true">·</span>
          <span>Blow The Candles</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight text-balance mb-4">
          The 18th Birthday Cake for Bilauti 🐱 🎂
        </h2>
        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mb-10 text-balance">
          Close your eyes, make your biggest wish (NEET top rank + endless happiness!), and blow the candles!
        </p>

        {/* The Aesthetic Cake Illustration */}
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm flex flex-col items-center justify-center pt-8 pb-4">
          {/* Candle Row */}
          <div className="flex items-end justify-center gap-4 sm:gap-5 mb-2 relative z-20">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => toggleSingleCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Click to blow out' : 'Click to light back'}
              >
                {/* Flame with Bold Blazing Fire Effect */}
                <div className="h-11 flex items-end justify-center mb-1">
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scaleY: [1, 1.25, 0.9, 1.2, 1],
                          scaleX: [1, 0.85, 1.1, 0.9, 1],
                          rotate: [-4, 5, -3, 4, 0],
                          y: [0, -3, 0]
                        }}
                        exit={{
                          scale: 0,
                          opacity: 0,
                          y: -12,
                          transition: { duration: 0.25 }
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + (idx % 3) * 0.12,
                          ease: 'easeInOut'
                        }}
                        className="relative flex flex-col items-center justify-end"
                      >
                        {/* Radiant Ambient Fire Light Glow */}
                        <div className="absolute -inset-3 bg-gradient-to-t from-red-500/50 via-amber-400/50 to-yellow-200/40 rounded-full blur-[4px] animate-pulse" />

                        {/* Outer Blazing Fire Flame Body */}
                        <div className="relative w-5 h-8 rounded-[50%_50%_50%_50%/70%_70%_30%_30%] bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 shadow-[0_0_16px_#EA580C] flex flex-col items-center justify-end overflow-hidden">
                          {/* Inner Yellow Core Flame */}
                          <div className="w-3 h-5 bg-gradient-to-t from-orange-400 via-yellow-300 to-amber-100 rounded-full mb-0.5 shadow-xs" />
                          {/* White-Hot Flame Center */}
                          <div className="absolute top-2 w-1.5 h-2.5 bg-white/95 rounded-full blur-[0.5px]" />
                          {/* Burning Blue Base */}
                          <div className="absolute bottom-0 w-2.5 h-1.5 bg-blue-600/90 rounded-full blur-[0.5px]" />
                        </div>

                        {/* Candle Black Wick */}
                        <div className="w-0.5 h-2 bg-stone-900 -mb-0.5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -24, scale: 1.8 }}
                        transition={{ duration: 0.8 }}
                        className="w-2 h-4 bg-stone-400 rounded-full blur-[0.5px]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div className="w-3.5 h-12 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-300 rounded-t-md border-x border-pink-400/30 flex flex-col justify-around py-1 shadow-xs group-hover:brightness-105">
                  <div className="w-full h-1 bg-white/70" />
                  <div className="w-full h-1 bg-white/70" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Top Layer */}
          <div className="relative z-10 w-44 sm:w-52 h-14 bg-gradient-to-b from-rose-200 via-pink-100 to-rose-200 rounded-t-2xl border-t-4 border-pink-300/60 shadow-sm flex items-center justify-center">
            {/* Frosting drips */}
            <div className="absolute -bottom-2 flex w-full justify-around px-2">
              <span className="w-3 h-3 bg-rose-200 rounded-full" />
              <span className="w-4 h-4 bg-rose-200 rounded-full" />
              <span className="w-3 h-3.5 bg-rose-200 rounded-full" />
              <span className="w-4 h-4 bg-rose-200 rounded-full" />
              <span className="w-3 h-3 bg-rose-200 rounded-full" />
            </div>
            <span className="font-serif font-bold text-xs tracking-wider uppercase text-pink-700">
              Sweet 18 · Navi
            </span>
          </div>

          {/* Cake Middle Layer */}
          <div className="relative z-0 w-60 sm:w-72 h-16 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-t-2xl shadow-md flex items-center justify-center border-t-2 border-pink-200">
            <div className="flex items-center gap-2">
              <span className="text-xs">🍓</span>
              <span className="font-hand text-lg font-bold text-pink-950">
                Bunnu badmosh edition
              </span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          {/* Cake Bottom Base Layer */}
          <div className="w-72 sm:w-84 h-16 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 rounded-2xl shadow-xl flex items-center justify-around px-6 border-t-2 border-pink-300/50">
            <span className="text-white/80 text-sm">✨</span>
            <span className="font-serif font-bold text-sm tracking-widest uppercase text-white drop-shadow-xs">
              04 · OCTOBER · 2026
            </span>
            <span className="text-white/80 text-sm">✨</span>
          </div>

          {/* Golden Platter */}
          <div className="w-80 sm:w-96 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 rounded-full shadow-lg -mt-1 border-t border-amber-300" />
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {!allBlownOut ? (
            <motion.button
              type="button"
              onClick={blowAllCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-full shadow-md shadow-pink-200 transition-all cursor-pointer"
            >
              <Wind className="h-4 w-4" />
              <span>Blow All Candles 💨</span>
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={relightCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-pink-700 bg-white border border-pink-300 hover:bg-pink-50 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Relight the Candles 🔥</span>
            </motion.button>
          )}
        </div>

        {/* Wish Granted Card */}
        <AnimatePresence>
          {wishRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 15, stiffness: 120 }}
              className="mt-8 max-w-lg mx-auto bg-white/95 border-2 border-pink-200 rounded-3xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-2 right-3 text-xl opacity-60">✨</div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Wish Registered!</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Happy 18th, Bunnu! 🌸
              </h3>
              <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
                Yeh 18th saal tumhare liye sabse best saal ho! May you crack NEET with flying colors, keep writing those soul-touching poetry lines, keep painting your dream canvases, and never stop being the sweetest, warmest friend ever.
              </p>
              <div className="text-xs font-hand text-pink-700 text-base font-semibold">
                — Manifested with 100% love from your best friend 💖
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
