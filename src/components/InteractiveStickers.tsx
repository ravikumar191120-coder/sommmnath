import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sfx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface FloatingSticker {
  id: string;
  emoji: string;
  label: string;
  defaultPosition: { top: string; left?: string; right?: string };
  rotate: number;
}

const STICKERS: FloatingSticker[] = [
  { id: 'bunnu', emoji: '🐰', label: 'Bunnu badmosh', defaultPosition: { top: '14%', left: '3%' }, rotate: -7 },
  { id: 'bilauti', emoji: '🐱', label: 'Bilauti 🐱', defaultPosition: { top: '26%', right: '3%' }, rotate: 8 },
  { id: 'chai', emoji: '☕', label: 'Chai Lover ☕', defaultPosition: { top: '38%', left: '2%' }, rotate: -9 },
  { id: 'doctor', emoji: '🩺', label: 'Dr. Navi', defaultPosition: { top: '50%', right: '2%' }, rotate: 5 },
  { id: 'diary', emoji: '📖', label: 'Diary & Snap', defaultPosition: { top: '65%', left: '3%' }, rotate: -5 },
  { id: 'artist', emoji: '🎨', label: 'Art Canvas', defaultPosition: { top: '80%', right: '3%' }, rotate: 9 }
];

export const InteractiveStickers: React.FC = () => {
  const [clickedSticker, setClickedSticker] = useState<string | null>(null);

  const handleStickerClick = (id: string, e: React.MouseEvent) => {
    sfx.playBoing();
    setClickedSticker(id);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ['#F472B6', '#FB7185', '#FDE047', '#C084FC'],
      disableForReducedMotion: true
    });

    setTimeout(() => {
      setClickedSticker(null);
    }, 600);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {STICKERS.map((sticker) => {
        const isPopped = clickedSticker === sticker.id;
        return (
          <div
            key={sticker.id}
            style={{
              position: 'absolute',
              top: sticker.defaultPosition.top,
              left: sticker.defaultPosition.left,
              right: sticker.defaultPosition.right
            }}
            className="pointer-events-auto hidden lg:block"
          >
            <motion.button
              type="button"
              onClick={(e) => handleStickerClick(sticker.id, e)}
              onMouseEnter={() => sfx.playPop()}
              whileHover={{ scale: 1.15, rotate: sticker.rotate * 1.4 }}
              whileTap={{ scale: 0.9, rotate: -sticker.rotate }}
              animate={
                isPopped
                  ? { scale: [1, 1.35, 1], rotate: [0, 15, -15, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={
                isPopped
                  ? { duration: 0.5 }
                  : { repeat: Infinity, duration: 4 + Math.random() * 2, ease: 'easeInOut' }
              }
              className="group relative flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-xs transition-shadow hover:shadow-lg hover:border-pink-300"
            >
              <span className="text-lg select-none">{sticker.emoji}</span>
              <span className="text-xs font-semibold tracking-tight text-pink-700 select-none">
                {sticker.label}
              </span>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};
