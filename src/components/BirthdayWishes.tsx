import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

interface WishMessage {
  id: string;
  name: string;
  text: string;
  time: string;
  badge: string;
}

const WISHES: WishMessage[] = [
  {
    id: '1',
    name: 'Best Friend Vibes',
    text: 'Happy 18th Birthday Bunnu badmosh! NEET me top karna hai, and remember you have all the potential. Celebrate hard today! 🩺✨',
    time: '4th Oct',
    badge: 'Cheerleader'
  },
  {
    id: '2',
    name: 'The Study Squad',
    text: 'To our sweetest Bilauti 🐱, may all your biology diagrams make sense and all your mocks cross 680+! Dr. Navi in the making. Proud of you! 🌸🤍',
    time: '4th Oct',
    badge: 'NEET Buddy'
  },
  {
    id: '3',
    name: 'Snap & Diary Club',
    text: 'Keep posting those aesthetic English poetry lines on snap story! 18 never looked so full of dreams and talent. Happy Birthday! 🎨📖',
    time: '4th Oct',
    badge: 'Poetry Fan'
  },
  {
    id: '4',
    name: 'Good Vibes Group',
    text: 'The coolest, friendliest person around! Never lose that calm smile and effortless humor. Cheers to adulthood! 🎂✨',
    time: '4th Oct',
    badge: 'Friend'
  }
];

export const BirthdayWishes: React.FC = () => {
  const [highFiveCount, setHighFiveCount] = useState(18);

  const handleHighFive = (e: React.MouseEvent) => {
    sfx.playSparkle();
    setHighFiveCount((prev) => prev + 1);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 25,
      spread: 50,
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#60A5FA']
    });
  };

  return (
    <section className="relative py-20 sm:py-28 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <span>Celebration Corner</span>
          <span aria-hidden="true">·</span>
          <span>Birthday Cheers</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
          Cheer For Navi! ✋🎉
        </h2>
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed mb-6 px-2">
          Tap the button below to send celebratory birthday high-fives and doctor wishes!
        </p>

        {/* High Five Button - Friendly Best Friend Energy */}
        <motion.button
          type="button"
          onClick={handleHighFive}
          whileTap={{ scale: 0.94 }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-pink-200 active:shadow-md transition-all cursor-pointer text-sm sm:text-base select-none"
        >
          <span className="text-lg">✋</span>
          <span>Send Birthday High-Five ({highFiveCount} High-Fives!)</span>
        </motion.button>
      </div>

      {/* Wishes Cards Grid (No Form) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {WISHES.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 border border-pink-100 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif font-bold text-sm text-stone-800">
                {w.name}
              </span>
              <span className="text-[10px] font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                {w.badge}
              </span>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              {w.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Aesthetic Footer Note */}
      <footer className="mt-16 sm:mt-24 pt-8 border-t border-pink-200/60 text-center text-xs text-stone-500">
        <p className="font-serif font-semibold text-sm text-stone-800 mb-1">
          Happy 18th Birthday, Navi 🌸
        </p>
        <p>
          04 October 2026 · Best wishes on your new chapter ahead
        </p>
      </footer>
    </section>
  );
};
