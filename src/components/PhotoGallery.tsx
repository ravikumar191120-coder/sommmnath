import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhotoItem } from '../types.ts';
import { sfx } from '../utils/audio.ts';
import { Maximize2, X, ImagePlus, ChevronLeft, ChevronRight, Heart, Video, Play } from 'lucide-react';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onOpenSettings: () => void;
}

const isVideoUrl = (url: string) => {
  if (!url) return false;
  return (
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov') ||
    url.includes('video')
  );
};

const LoopingCardVideo: React.FC<{ url: string }> = ({ url }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', () => setIsLoaded(true));

    tryPlay();

    const resumeOnTouch = () => {
      tryPlay();
      window.removeEventListener('click', resumeOnTouch);
      window.removeEventListener('touchstart', resumeOnTouch);
      window.removeEventListener('scroll', resumeOnTouch);
    };

    window.addEventListener('click', resumeOnTouch, { once: true, passive: true });
    window.addEventListener('touchstart', resumeOnTouch, { once: true, passive: true });
    window.addEventListener('scroll', resumeOnTouch, { once: true, passive: true });

    return () => {
      video.removeEventListener('canplay', tryPlay);
      window.removeEventListener('click', resumeOnTouch);
      window.removeEventListener('touchstart', resumeOnTouch);
      window.removeEventListener('scroll', resumeOnTouch);
    };
  }, [url]);

  return (
    <div className="relative w-full h-full bg-stone-900 overflow-hidden flex items-center justify-center">
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-100/50 animate-pulse z-0">
          <Video className="h-6 w-6 text-pink-400 animate-spin" />
          <span className="text-[10px] text-pink-600 font-mono mt-1">Loading clip...</span>
        </div>
      )}

      <video
        ref={videoRef}
        src={url}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-medium flex items-center gap-1.5 backdrop-blur-xs z-10">
        <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
        <span>{isPlaying ? 'Playing Loop' : 'Tap to Play'}</span>
      </div>
    </div>
  );
};

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onOpenSettings
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleOpenPhoto = (index: number) => {
    sfx.playPop();
    setSelectedIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playPop();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playPop();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <section id="memories" className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <span>The Polaroid Scrapbook</span>
          <span aria-hidden="true">·</span>
          <span>Memories & Moments</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
          Moments of Navi 📸
        </h2>
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed mb-5 px-2">
          8 special photos added. Tap any photo to expand into high definition!
        </p>

        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <ImagePlus className="h-3.5 w-3.5 text-pink-600" />
          <span>Edit / Add Video Links</span>
        </button>
      </div>

      {/* 10 Polaroid Cards - Mobile First Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 pt-2">
        {photos.map((photo, index) => {
          const hasError = imageErrors[photo.id];
          const isVideo = isVideoUrl(photo.url);
          const isEmpty = !photo.url || photo.url.trim() === '';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: (index % 3) * 0.08,
                type: 'spring',
                stiffness: 130,
                damping: 14
              }}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 15 }
              }}
              whileTap={{ scale: 0.98 }}
              style={{ rotate: `${photo.rotation}deg` }}
              onClick={() => handleOpenPhoto(index)}
              className="group relative bg-white p-3.5 sm:p-4 pb-5 rounded-2xl shadow-polaroid border border-stone-200/60 cursor-pointer transition-all duration-300"
            >
              {/* Aesthetic Washi Tape */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5.5 ${photo.tapeColor} shadow-xs backdrop-blur-xs rounded-xs tape-strip z-10 rotate-1`}
              />

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-pink-50 border border-stone-100 flex items-center justify-center">
                {isEmpty ? (
                  /* Placeholder for pending video links */
                  <div className="flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100/70 h-full w-full">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Video className="h-6 w-6 text-pink-500 animate-pulse" />
                    </div>
                    <span className="font-serif font-bold text-sm text-stone-800">
                      {photo.caption}
                    </span>
                    <span className="text-[11px] text-pink-600 mt-1 font-medium bg-white/70 px-2 py-0.5 rounded-full border border-pink-100">
                      Catbox Video Link Pending 🎬
                    </span>
                  </div>
                ) : isVideo ? (
                  <LoopingCardVideo url={photo.url} />
                ) : !hasError ? (
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    onError={() => handleImageError(photo.id)}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center text-pink-400 bg-gradient-to-br from-pink-50 to-rose-100/70 h-full w-full">
                    <Heart className="h-8 w-8 mb-2 fill-pink-200 stroke-pink-400" />
                    <span className="font-serif font-semibold text-xs text-stone-700">
                      Photo {index + 1}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5">
                      Slot {index + 1}
                    </span>
                  </div>
                )}

                {/* Subtle frame counter badge */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-xs text-white text-[10px] font-mono">
                  {index + 1} / {photos.length}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Maximize2 className="h-3 w-3" />
                    <span>Expand</span>
                  </span>
                </div>
              </div>

              {/* Polaroid Bottom Handwritten Area */}
              <div className="pt-3 text-center">
                <h3 className="font-hand text-lg sm:text-xl font-bold text-stone-800 group-hover:text-pink-600 transition-colors">
                  {photo.caption}
                </h3>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                  {photo.subCaption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal with Phone Swiping / Next & Prev */}
      <AnimatePresence>
        {currentPhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/85 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-pink-100 cursor-default"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 z-20 p-2 text-stone-600 hover:text-stone-900 bg-white/90 rounded-full shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Nav arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-20 p-2.5 text-stone-700 sm:text-white bg-white/80 sm:bg-stone-800/80 rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-20 p-2.5 text-stone-700 sm:text-white bg-white/80 sm:bg-stone-800/80 rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Media viewer */}
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 flex items-center justify-center">
                {!currentPhoto.url || currentPhoto.url.trim() === '' ? (
                  <div className="p-6 text-center">
                    <Video className="h-10 w-10 text-pink-500 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-lg text-stone-800">
                      {currentPhoto.caption}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                      Aap baad me Catbox video link yahan paste kar sakte hain aur video automatically play hoga!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIndex(null);
                        onOpenSettings();
                      }}
                      className="mt-4 px-4 py-2 bg-pink-600 text-white text-xs font-semibold rounded-full shadow-sm"
                    >
                      Paste Video Link
                    </button>
                  </div>
                ) : isVideoUrl(currentPhoto.url) ? (
                  <video
                    src={currentPhoto.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption & Counter */}
              <div className="pt-4 pb-1 text-center">
                <span className="text-[11px] font-mono text-pink-600 font-semibold">
                  Memory {selectedIndex + 1} of {photos.length}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  {currentPhoto.caption}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  {currentPhoto.subCaption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
