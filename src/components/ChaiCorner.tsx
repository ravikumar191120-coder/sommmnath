import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { sfx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

const CHAI_FACTS = [
  'Chai + Late night NEET Biology diagrams + Cold breeze = Navi’s ultimate comfort zone! ☕📖',
  'Garmi ho ya sardi, stress ho ya joy — Bunnu badmosh ke liye har problem ka ilaj ek cup kadak chai me hai! ☕✨',
  'They say doctors prescribe medicines, but Dr. Navi will definitely prescribe garma-garam chai! 🩺☕',
  'No deep diary poem was ever composed without a steaming mug of chai beside the sketchbook. ✍️☕',
  'Chai aur dosti dono kadak honi chahiye... aur Navi dono me 100/100 hai! 🌸☕',
  'One cup of chai with genuine conversations = 0 stress, 100% peace. ☕❤️',
  'NEET revision checklist: NCERT done, formulas done, 3 cups of tea consumed! ☕📚'
];

export const ChaiCorner: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [cupsBrewed, setCupsBrewed] = useState(1);
  const [isBrewing, setIsBrewing] = useState(false);

  const brewNextChai = () => {
    sfx.playSparkle();
    setIsBrewing(true);
    setCupsBrewed((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#D97706', '#F59E0B', '#FDE68A', '#F472B6']
    });

    setTimeout(() => {
      setCurrentFactIndex((prev) => (prev + 1) % CHAI_FACTS.length);
      setIsBrewing(false);
    }, 350);
  };

  return (
    <section className="relative py-20 sm:py-28 px-4 max-w-4xl mx-auto">
      {/* Decorative Warm Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-transparent rounded-3xl -z-10 blur-2xl" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
          <span>Navi&apos;s Sanctuary</span>
          <span aria-hidden="true">·</span>
          <span>Kadak Chai Vibes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
          Navi&apos;s Chai Corner ☕
        </h2>
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed px-2">
          Chai is not just a drink for Navi — it is pure fuel for poetry, art, and late-night NEET prep!
        </p>
      </div>

      {/* Interactive Tea Experience Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative bg-white/90 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-xs flex flex-col items-center text-center overflow-hidden"
      >
        {/* Tea Steam Animated Illustration */}
        <div className="relative mb-6 cursor-pointer select-none" onClick={brewNextChai}>
          {/* Animated Steam Waves */}
          <div className="flex justify-center gap-2 mb-1 h-12 items-end">
            <motion.div
              animate={{
                y: [0, -18, -32],
                opacity: [0, 0.7, 0],
                scaleX: [1, 1.4, 0.8],
                x: [0, -4, 4]
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
              className="w-1.5 h-7 bg-amber-400/50 rounded-full blur-[1px]"
            />
            <motion.div
              animate={{
                y: [0, -22, -38],
                opacity: [0, 0.8, 0],
                scaleX: [1, 1.3, 0.9],
                x: [0, 3, -3]
              }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeOut', delay: 0.4 }}
              className="w-2 h-9 bg-amber-400/60 rounded-full blur-[1px]"
            />
            <motion.div
              animate={{
                y: [0, -18, -32],
                opacity: [0, 0.7, 0],
                scaleX: [1, 1.4, 0.8],
                x: [0, -3, 3]
              }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut', delay: 0.8 }}
              className="w-1.5 h-7 bg-amber-400/50 rounded-full blur-[1px]"
            />
          </div>

          {/* Steaming Tea Cup Illustration */}
          <motion.div
            animate={isBrewing ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.12, 1] } : { y: [0, -3, 0] }}
            transition={isBrewing ? { duration: 0.4 } : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="relative"
          >
            {/* The Ceramic Tea Cup */}
            <div className="relative w-24 h-20 bg-gradient-to-b from-amber-100 via-rose-50 to-amber-200 rounded-b-3xl border-2 border-amber-300 shadow-md flex items-center justify-center">
              {/* Cup Heart Print */}
              <div className="w-8 h-8 rounded-full bg-rose-400/20 flex items-center justify-center">
                <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              </div>

              {/* Cup Handle */}
              <div className="absolute top-2 -right-4 w-6 h-10 border-4 border-amber-300 rounded-r-2xl" />
            </div>

            {/* Cup Saucer Plate */}
            <div className="w-32 h-3.5 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full shadow-sm mx-auto -mt-1 border border-amber-300" />
          </motion.div>
        </div>

        {/* Dynamic Relatable Tea Fact */}
        <div className="min-h-[70px] flex items-center justify-center max-w-md mx-auto my-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFactIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-base sm:text-lg font-medium text-stone-800 leading-relaxed text-balance"
            >
              &ldquo;{CHAI_FACTS[currentFactIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action Button & Counter */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          <motion.button
            type="button"
            onClick={brewNextChai}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-amber-200 active:shadow-sm cursor-pointer select-none"
          >
            <Coffee className="h-4 w-4" />
            <span>Brew Another Cup of Chai ☕</span>
          </motion.button>

          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            Cups Brewed: {cupsBrewed}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
