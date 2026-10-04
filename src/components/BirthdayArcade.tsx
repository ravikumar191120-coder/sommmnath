import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, RotateCcw, Play, Star, Gift, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio.ts';

interface FallingItem {
  id: number;
  emoji: string;
  label: string;
  points: number;
  x: number; // 10% to 85%
  speed: number; // duration in seconds
}

const GAME_ITEMS = [
  { emoji: '🩺', label: 'Dr. Navi', points: 15 },
  { emoji: '☕', label: 'Garam Chai', points: 20 },
  { emoji: '🎨', label: 'Art Canvas', points: 10 },
  { emoji: '📖', label: 'Diary Line', points: 10 },
  { emoji: '🎂', label: '18th Cake', points: 20 },
  { emoji: '🐾', label: 'Bilauti 🐱', points: 25 },
  { emoji: '🍓', label: 'Sweet Berry', points: 10 }
];

export const BirthdayArcade: React.FC = () => {
  // Game states
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [confettiBlasted, setConfettiBlasted] = useState(false);

  // Scratch card states
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fullscreen Birthday Confetti Cannon Explosion
  const triggerFullscreenBirthdayConfetti = () => {
    sfx.playCheer();
    setConfettiBlasted(true);
    setTimeout(() => setConfettiBlasted(false), 3000);

    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 80, zIndex: 10000 };

    const interval: NodeJS.Timeout = setInterval(() => {
      const remaining = animationEnd - Date.now();

      if (remaining <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (remaining / duration);
      // Continuous left and right cannons across screen
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.1, y: Math.random() * 0.4 + 0.3 },
        colors: ['#F472B6', '#FB7185', '#FBBF24', '#38BDF8', '#C084FC']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.9, y: Math.random() * 0.4 + 0.3 },
        colors: ['#F472B6', '#FB7185', '#FBBF24', '#34D399', '#F43F5E']
      });
    }, 250);

    // Initial center burst
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#FDA4AF', '#FFFFFF']
    });
  };

  // Game timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingGame && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlayingGame && timeLeft === 0) {
      setIsPlayingGame(false);
      setGameFinished(true);
      sfx.playCheer();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(timer);
  }, [isPlayingGame, timeLeft]);

  // Falling items generator during game
  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (isPlayingGame) {
      spawner = setInterval(() => {
        const randomItem = GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
        const newItem: FallingItem = {
          id: Date.now() + Math.random(),
          emoji: randomItem.emoji,
          label: randomItem.label,
          points: randomItem.points,
          x: 10 + Math.random() * 75,
          speed: 2.2 + Math.random() * 1.4
        };
        setFallingItems((prev) => [...prev.slice(-12), newItem]);
      }, 650);
    } else {
      setFallingItems([]);
    }
    return () => clearInterval(spawner);
  }, [isPlayingGame]);

  const startGame = () => {
    sfx.playSparkle();
    setScore(0);
    setTimeLeft(20);
    setGameFinished(false);
    setIsPlayingGame(true);
  };

  const handleCatchItem = (id: number, points: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playPop();
    setScore((prev) => prev + points);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 15,
      spread: 35,
      colors: ['#F472B6', '#FBBF24', '#34D399']
    });

    setFallingItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Scratch Card Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw shimmering foil cover
    ctx.fillStyle = '#FDA4AF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative text on foil
    ctx.fillStyle = '#9F1239';
    ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Or Tap Here ✨', canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = '12px Plus Jakarta Sans, sans-serif';
    ctx.fillText('To Reveal 18th Year Prediction', canvas.width / 2, canvas.height / 2 + 16);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    setScratchProgress((prev) => {
      const next = prev + 12;
      if (next >= 100) {
        setIsScratched(true);
        sfx.playSparkle();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 }
        });
      }
      return next;
    });
  };

  const revealFullFortune = () => {
    setIsScratched(true);
    sfx.playCheer();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 }
    });
  };

  return (
    <section className="relative py-20 sm:py-28 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <span>Fun & Play Zone</span>
          <span aria-hidden="true">·</span>
          <span>Mini Games & Fortune</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
          Bunnu&apos;s Play & Chill Arcade 🎮
        </h2>
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed px-2">
          Catch falling medical & art supplies in 20 seconds, or scratch the card to reveal your 18th fortune!
        </p>

        {/* Interactive Fullscreen Birthday Confetti Button */}
        <div className="mt-5 flex justify-center">
          <motion.button
            type="button"
            onClick={triggerFullscreenBirthdayConfetti}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 active:scale-95 transition-all cursor-pointer border border-white/40 select-none"
          >
            <Sparkles className="h-5 w-5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>🎉 Birthday Confetti Explosion! 🎊</span>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-sans tracking-wide">
              Tap Me!
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
        {/* Activity 1: 20s Catcher Mini-Game */}
        <div className="relative bg-white border border-pink-100 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden min-h-[380px]">
          {/* Header stats */}
          <div className="flex items-center justify-between pb-3 border-b border-pink-50">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🩺</span>
              <span className="font-serif font-bold text-sm text-stone-800">
                Doctor & Art Catcher
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                Score: {score}
              </span>
              <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                ⏳ {timeLeft}s
              </span>
            </div>
          </div>

          {/* Interactive Play Arena */}
          <div className="relative flex-1 my-3 bg-gradient-to-b from-pink-50/50 via-rose-50/30 to-pink-50/50 rounded-2xl overflow-hidden flex items-center justify-center min-h-[220px]">
            {!isPlayingGame && !gameFinished && (
              <div className="text-center p-4">
                {/* Cute Animated Cat Mascot */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  className="text-4xl sm:text-5xl mb-3 select-none"
                >
                  🐱🩺
                </motion.div>
                <h4 className="font-serif font-bold text-stone-800 text-base mb-1">
                  Ready, Dr. Navi?
                </h4>
                <p className="text-[11px] text-stone-500 max-w-[220px] mx-auto mb-4">
                  Tap falling stethoscopes, palettes, and Bilauti paws before they hit the ground!
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Start 20s Mini-Game</span>
                </button>
              </div>
            )}

            {/* Active Game Playing Canvas */}
            {isPlayingGame && (
              <div className="absolute inset-0 overflow-hidden">
                {fallingItems.map((item) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={(e) => handleCatchItem(item.id, item.points, e)}
                    initial={{ y: -30, x: `${item.x}%`, opacity: 0 }}
                    animate={{ y: 220, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: item.speed, ease: 'linear' }}
                    className="absolute cursor-pointer flex flex-col items-center group active:scale-90 select-none p-1"
                  >
                    <span className="text-3xl filter drop-shadow-xs group-hover:scale-125 transition-transform">
                      {item.emoji}
                    </span>
                    <span className="text-[9px] font-bold text-pink-700 bg-white/90 px-1.5 py-0.2 rounded-full shadow-xs border border-pink-100">
                      +{item.points}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Game Over Scorecard */}
            {gameFinished && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Trophy className="h-6 w-6" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">
                  Score: {score} Points! 🎉
                </h4>
                <p className="text-xs text-pink-700 font-medium mb-3">
                  Certified Chief Assistant to Dr. Navi & Bunnu Badmosh!
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-full hover:bg-stone-800 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Play Again</span>
                </button>
              </motion.div>
            )}
          </div>

          <div className="text-[11px] text-stone-400 text-center">
            Tap stethoscopes 🩺 for 15 pts · Bilauti paws 🐾 for 25 pts!
          </div>
        </div>

        {/* Activity 2: Scratch & Reveal 18th Fortune Card */}
        <div className="relative bg-white border border-pink-100 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden min-h-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-pink-50">
            <div className="flex items-center gap-1.5">
              <Wand2 className="h-4 w-4 text-pink-600" />
              <span className="font-serif font-bold text-sm text-stone-800">
                18th Fortune Scratch Card
              </span>
            </div>
            <span className="text-[10px] font-mono text-pink-600 font-semibold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
              Interactive
            </span>
          </div>

          {/* Scratch Arena */}
          <div className="relative flex-1 my-3 rounded-2xl overflow-hidden border border-pink-200/80 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
            {/* Underlying Revealed Prediction */}
            <div className="text-center p-3 space-y-2">
              <span className="text-3xl select-none">🩺✨📖</span>
              <h4 className="font-serif font-bold text-pink-700 text-lg">
                Navi&apos;s 18th Destiny Unlocked!
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-sans max-w-[240px] mx-auto">
                🌟 NEET Crack with Flying Colors!<br />
                🩺 Stethoscope & White Coat in 2026<br />
                📖 Bestseller Diary Poetry Release<br />
                ❤️ Lifetime Best Friends With Somnath!
              </p>
            </div>

            {/* Scratching Canvas Foil */}
            {!isScratched && (
              <canvas
                ref={canvasRef}
                width={320}
                height={210}
                onMouseMove={handleScratch}
                onTouchMove={handleScratch}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              />
            )}
          </div>

          {/* Quick Reveal Helper */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-stone-400">
              {isScratched ? 'Destiny Revealed! ✨' : 'Rub your finger to scratch'}
            </span>
            {!isScratched && (
              <button
                type="button"
                onClick={revealFullFortune}
                className="text-xs text-pink-600 hover:text-pink-800 font-semibold underline underline-offset-2"
              >
                Instant Reveal
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
