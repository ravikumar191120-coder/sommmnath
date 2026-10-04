import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Disc3, Settings, Sliders } from 'lucide-react';
import { sfx } from '../utils/audio.ts';

interface MusicPlayerProps {
  audioUrl: string;
  audioTitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenSettings: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioUrl,
  audioTitle,
  isPlaying,
  onTogglePlay,
  onOpenSettings
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0.6); // set to 60% as requested
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Initialize and attempt autoplay with 60% volume
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.6;
    audioRef.current.loop = true;

    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => {
            setHasInteracted(true);
            if (!isPlaying) onTogglePlay();
          })
          .catch(() => {});
      }
    };

    // Immediate attempt
    startAudio();

    // Fallback: start on the very first touch/click anywhere on the screen
    const unlockAudio = () => {
      startAudio();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('scroll', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [audioUrl]);

  // Synchronize playing state with audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        loop
        playsInline
      />

      {/* Floating Bottom Music Bar with 60% Volume Controller */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.5 }}
          className="flex flex-col items-end gap-2"
        >
          {/* Expandable Volume Slider Popup */}
          <AnimatePresence>
            {showVolumeControl && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="bg-white/95 border border-pink-200 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5"
              >
                <button
                  type="button"
                  onClick={() => handleVolumeChange(volume === 0 ? 0.6 : 0)}
                  className="text-stone-600 hover:text-pink-600 transition-colors"
                >
                  {volume === 0 ? (
                    <VolumeX className="h-4 w-4 text-stone-400" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-pink-600" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-24 h-1.5 accent-pink-500 bg-pink-100 rounded-lg cursor-pointer"
                />

                <span className="text-[11px] font-mono font-bold text-pink-600 min-w-[32px] text-right">
                  {Math.round(volume * 100)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Dock */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 border border-pink-200/90 rounded-full py-2 px-3 sm:px-3.5 shadow-xl backdrop-blur-md hover:border-pink-300 transition-all">
            {/* Spinning Vinyl Disc */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                className="text-pink-600 flex items-center justify-center cursor-pointer"
                onClick={onTogglePlay}
              >
                <Disc3 className="h-7 w-7" />
              </motion.div>
              <div className="absolute w-2 h-2 rounded-full bg-pink-400" />
            </div>

            {/* Track Info & Equalizer */}
            <div className="hidden xs:flex flex-col pr-1 min-w-[110px] max-w-[160px]">
              <span className="text-[11px] font-bold text-stone-800 truncate">
                {audioTitle}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-pink-600 font-medium">
                  {isPlaying ? 'Playing (60%)' : 'Paused'}
                </span>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-2.5 ml-1">
                    <span className="w-0.5 h-full bg-pink-500 animate-pulse" />
                    <span className="w-0.5 h-2/3 bg-pink-500 animate-bounce" />
                    <span className="w-0.5 h-full bg-pink-500 animate-pulse delay-75" />
                    <span className="w-0.5 h-1/2 bg-pink-500 animate-bounce delay-150" />
                  </div>
                )}
              </div>
            </div>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => {
                sfx.playPop();
                onTogglePlay();
              }}
              className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-xs transition-transform active:scale-90"
              title={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 fill-white ml-0.5" />
              )}
            </button>

            {/* Volume Toggle Button */}
            <button
              type="button"
              onClick={() => setShowVolumeControl((prev) => !prev)}
              className={`p-1.5 rounded-full transition-colors ${
                showVolumeControl
                  ? 'bg-pink-100 text-pink-700'
                  : 'text-stone-500 hover:text-pink-600 hover:bg-pink-50'
              }`}
              title="Adjust Volume"
            >
              <Volume2 className="h-4 w-4" />
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 text-stone-400 hover:text-pink-600 transition-colors"
              title="Media Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
