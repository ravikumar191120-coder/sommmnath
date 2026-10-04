import React, { useEffect, useState } from 'react';
import { Music, VolumeX, ImagePlus, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio.ts';
import { motion } from 'motion/react';

interface NavbarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenSettings
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Sleek floating glassmorphic bar */}
      <div className="mx-auto max-w-4xl px-3 pt-2.5 pb-1">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white/80 border border-pink-200/70 shadow-sm backdrop-blur-md"
        >
          {/* Brand zone: Clean, animated, minimal */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sfx.playSparkle();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-stone-900 hover:text-pink-600 transition-colors text-left"
            >
              <motion.span
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="text-base select-none"
              >
                🌸
              </motion.span>
              <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-pink-900">
                Navi
              </span>
            </button>
            <span className="text-[11px] font-sans font-medium text-pink-600/80 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
              04 Oct · 18th
            </span>
          </div>

          {/* Right zone: Smooth functional actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMusic}
              title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                isPlayingMusic
                  ? 'bg-pink-100 text-pink-800 border-pink-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-pink-200'
              }`}
            >
              {isPlayingMusic ? (
                <>
                  <Music className="h-3 w-3 text-pink-600 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-[11px] font-medium">Music On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3 w-3 text-stone-400" />
                  <span className="text-[11px] font-medium">Muted</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle animated pink scroll progress line for phone browsing */}
      <div className="w-full h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
