import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

export const FriendLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    sfx.playSparkle();
    if (!isOpen) {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#F472B6', '#FB7185', '#FDA4AF']
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative py-20 sm:py-28 px-4 max-w-3xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
        <span>A Note From The Heart</span>
        <span aria-hidden="true">·</span>
        <span>October 4th</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
        Letter For Navi 💌
      </h2>
      <p className="text-stone-600 text-xs sm:text-base max-w-sm mx-auto mb-8 px-2">
        Tap the heart seal below to open your personalized 18th birthday note!
      </p>

      {/* The Envelope */}
      <div className="max-w-md mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={toggleLetter}
          className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-pink-100 rounded-3xl p-6 sm:p-8 border-2 border-pink-200/80 shadow-polaroid cursor-pointer overflow-hidden transition-all"
        >
          {/* Decorative Post Stamp */}
          <div className="absolute top-3 right-3 border-2 border-dashed border-pink-300 p-1.5 rounded-md bg-white/80 rotate-2">
            <span className="text-[10px] font-serif font-bold text-pink-700 block">POSTAGE</span>
            <span className="text-base block">🩺🌸</span>
            <span className="text-[9px] text-pink-500 font-mono">OCT-04</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 sm:py-6">
            <motion.div
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-300 mb-3"
            >
              <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-white" />
            </motion.div>

            <span className="font-serif font-bold text-lg sm:text-xl text-stone-800">
              {isOpen ? 'Tap to fold envelope' : 'Tap to open your letter'}
            </span>
            <span className="text-xs text-pink-600 mt-0.5">
              {isOpen ? 'Click to close' : 'Sealed with genuine love & respect'}
            </span>
          </div>
        </motion.div>

        {/* Unfolded Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -15 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -15 }}
              transition={{ type: 'spring', damping: 20, stiffness: 140 }}
              className="mt-6 text-left bg-[#FFFAF5] border border-amber-200/70 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden"
            >
              <div className="space-y-4 font-sans text-stone-800 text-xs sm:text-base leading-relaxed">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <span className="font-serif font-bold text-base sm:text-lg text-pink-700">
                    Dearest Navi,
                  </span>
                  <span className="text-xs font-mono text-stone-400">04 Oct 2026</span>
                </div>

                <p>
                  Happy 18th Birthday!! Finally, official adult ho gayi ho! Lekin chahe kitne bhi saal beet jayein, tum hamesha wahi sweet Bilauti 🐱 aur pyari Bunnu rahogi.
                </p>

                <p>
                  I want you to know how special you are to everyone around you. Tumhari diary ki woh deep English poetry lines, snap story pe lagaye hue thoughtful quotes, aur painting me khoya hua dil — you are one of the most creative and genuine souls I know.
                </p>

                <p>
                  NEET ki journey demanding hai, late nights aur stress kabhi kabhi thaka dete hain, but never doubt yourself. We all know how capable, determined, and brilliant you are. Woh white coat aur stethoscope tumhare sapno me nahi, bohot jald reality me aane wala hai, Dr. Navi!
                </p>

                {/* The Emotional Touch */}
                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/60 my-2">
                  <p className="font-serif italic text-rose-950 font-medium leading-relaxed">
                    &ldquo;Ek baat jo sach me dil me aati hai... turning 18 is beautiful, par kahin na kahin thoda heavy bhi lagta hai. School khatam, coaching khatam, aur agle saal NEET ke baad tum shayad kisi doosre shahar ke medical college me hogi, stethoscope pehne apne sapno ke peeche. Maybe yeh hamari dosti ka aakhri saal ho jahan hum itni befikri se roz baatein karte hain. Agle saal pata nahi hum kahan honge aur tum kahan... Lekin chahe life hume kitna bhi busy ya door kar de, meri life me tumhari jagah koi nahi le sakta. Chahe duniya badal jaye, you will always be my precious Bilauti 🐱.&rdquo;
                  </p>
                </div>

                <p>
                  May this 18th chapter bring you endless laughter, peace, clear concepts, lots of colorful canvases, and all the happiness in this universe. Somnath will always be your biggest cheerleader and just one call away, no matter where life takes us.
                </p>

                <div className="pt-6 border-t border-amber-200/60 flex flex-col items-end">
                  <span className="font-hand text-xl sm:text-2xl text-pink-700 font-bold">
                    Forever your best friend,
                  </span>
                  <span className="text-xs font-semibold text-stone-700 tracking-wider mt-0.5">
                    — Somnath ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
