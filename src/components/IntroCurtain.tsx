import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

interface IntroCurtainProps {
  onEnter: () => void;
}

export const IntroCurtain: React.FC<IntroCurtainProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sfx.playCheer();
    setIsOpen(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#38BDF8', '#FFFFFF']
    });

    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E9] to-[#FFF0F3] p-4 text-center select-none"
        >
          {/* Decorative floating sparkles in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] left-[12%] text-2xl animate-bounce">✨</span>
            <span className="absolute top-[25%] right-[15%] text-2xl animate-pulse">🌸</span>
            <span className="absolute bottom-[20%] left-[18%] text-2xl animate-pulse">🐱</span>
            <span className="absolute bottom-[25%] right-[20%] text-2xl animate-bounce">💖</span>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 120 }}
            className="relative max-w-sm w-full bg-white/95 border-2 border-pink-200/90 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col items-center"
          >
            {/* Pulsing Gift Box Icon */}
            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-200 mb-5"
            >
              <Gift className="h-10 w-10 stroke-[2.2]" />
            </motion.div>

            <span className="text-xs font-semibold tracking-widest uppercase text-pink-600 mb-1.5">
              04 October · 18th Chapter
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-2">
              For Navi 🌸
            </h1>

            <p className="font-sans text-xs text-stone-600 leading-relaxed mb-6">
              A personalized surprise prepared with genuine love for Bunnu & Bilauti 🐱
            </p>

            <motion.button
              type="button"
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-pink-200 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Tap To Open Celebration 🎁</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
