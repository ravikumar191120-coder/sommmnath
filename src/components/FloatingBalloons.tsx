import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { sfx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface BalloonItem {
  id: number;
  x: number;
  size: number;
  color: string;
  stringColor: string;
  speed: number;
  delay: number;
}

interface FloatingPetal {
  id: number;
  x: number;
  size: number;
  emoji: string;
  speed: number;
  delay: number;
  rotateDirection: number;
}

const BALLOON_PALETTES = [
  { color: 'from-pink-400 via-rose-300 to-pink-500', stringColor: '#F472B6' },
  { color: 'from-amber-300 via-yellow-200 to-amber-400', stringColor: '#FBBF24' },
  { color: 'from-purple-300 via-fuchsia-200 to-purple-400', stringColor: '#C084FC' },
  { color: 'from-pink-300 via-rose-200 to-pink-400', stringColor: '#FDA4AF' }
];

const CUTE_EMOJIS = ['🌸', '✨', '💖', '🐾', '🌸', '✨'];

export const FloatingBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [petals, setPetals] = useState<FloatingPetal[]>([]);

  useEffect(() => {
    // Only 3-4 gentle balloons (reduced as requested)
    const initialBalloons: BalloonItem[] = Array.from({ length: 4 }).map((_, i) => {
      const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
      return {
        id: Date.now() + i,
        x: 10 + i * 24 + Math.random() * 6,
        size: 36 + Math.floor(Math.random() * 12),
        color: palette.color,
        stringColor: palette.stringColor,
        speed: 18 + Math.random() * 8, // slow & gentle
        delay: i * 3.5
      };
    });
    setBalloons(initialBalloons);

    // Cute falling/drifting petals, sparkles, and hearts
    const initialPetals: FloatingPetal[] = Array.from({ length: 7 }).map((_, i) => {
      return {
        id: Date.now() + 100 + i,
        x: 8 + i * 13 + Math.random() * 5,
        size: 16 + Math.floor(Math.random() * 10),
        emoji: CUTE_EMOJIS[i % CUTE_EMOJIS.length],
        speed: 14 + Math.random() * 6,
        delay: i * 2.2,
        rotateDirection: Math.random() > 0.5 ? 1 : -1
      };
    });
    setPetals(initialPetals);
  }, []);

  const handleBalloonPop = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playPop();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 16,
      spread: 35,
      colors: ['#F472B6', '#FBBF24', '#C084FC']
    });

    setBalloons((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              id: Date.now() + Math.random(),
              x: 8 + Math.random() * 84,
              delay: 0.5
            }
          : b
      )
    );
  };

  const handlePetalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSparkle();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 12,
      spread: 30,
      colors: ['#F472B6', '#FDE047']
    });
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* 3-4 Gentle Floating Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: '110vh', x: `${balloon.x}vw`, opacity: 0 }}
          animate={{
            y: '-20vh',
            x: [
              `${balloon.x}vw`,
              `${balloon.x - 2}vw`,
              `${balloon.x + 2}vw`,
              `${balloon.x}vw`
            ],
            opacity: [0, 0.75, 0.75, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: balloon.speed,
              delay: balloon.delay,
              ease: 'linear'
            },
            x: {
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut'
            },
            opacity: {
              repeat: Infinity,
              duration: balloon.speed,
              delay: balloon.delay,
              times: [0, 0.12, 0.88, 1]
            }
          }}
          className="pointer-events-auto absolute cursor-pointer select-none"
          onClick={(e) => handleBalloonPop(balloon.id, e)}
          title="Tap to pop balloon!"
        >
          <div
            style={{ width: `${balloon.size}px`, height: `${balloon.size * 1.25}px` }}
            className={`relative rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${balloon.color} shadow-xs backdrop-blur-xs flex flex-col items-center group hover:scale-110 active:scale-95 transition-transform`}
          >
            <div className="absolute top-1.5 left-1.5 w-2 h-3.5 bg-white/50 rounded-full blur-[0.5px] -rotate-25" />
            <div className="absolute -bottom-1 w-2 h-1.5 bg-rose-400/80 rounded-sm" />
            <div
              style={{
                width: '1px',
                height: `${balloon.size * 1.1}px`,
                backgroundColor: balloon.stringColor
              }}
              className="absolute top-full opacity-50 origin-top animate-wiggle"
            />
          </div>
        </motion.div>
      ))}

      {/* Cute drifting elements: petals, stars, hearts */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: '-10vh', x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '105vh',
            x: [
              `${petal.x}vw`,
              `${petal.x + 3 * petal.rotateDirection}vw`,
              `${petal.x - 2 * petal.rotateDirection}vw`,
              `${petal.x}vw`
            ],
            rotate: [0, 180 * petal.rotateDirection, 360 * petal.rotateDirection],
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: petal.speed,
              delay: petal.delay,
              ease: 'linear'
            },
            x: {
              repeat: Infinity,
              duration: 4.5,
              ease: 'easeInOut'
            },
            rotate: {
              repeat: Infinity,
              duration: petal.speed,
              ease: 'linear'
            },
            opacity: {
              repeat: Infinity,
              duration: petal.speed,
              delay: petal.delay,
              times: [0, 0.1, 0.9, 1]
            }
          }}
          className="pointer-events-auto absolute cursor-pointer select-none"
          onClick={handlePetalClick}
          title="Tap to sparkle!"
        >
          <span
            style={{ fontSize: `${petal.size}px` }}
            className="filter drop-shadow-xs hover:scale-125 active:scale-90 transition-transform block"
          >
            {petal.emoji}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
