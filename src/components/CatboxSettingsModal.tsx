import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, Link2, Music, Image as ImageIcon, Check } from 'lucide-react';
import { MediaSettings } from '../types.ts';
import { DEFAULT_PHOTOS, DEFAULT_AUDIO_URL } from '../utils/defaultData.ts';
import { sfx } from '../utils/audio.ts';

interface CatboxSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: MediaSettings;
  onSave: (settings: MediaSettings) => void;
}

export const CatboxSettingsModal: React.FC<CatboxSettingsModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSave
}) => {
  const [photos, setPhotos] = useState(currentSettings.photos);
  const [audioUrl, setAudioUrl] = useState(currentSettings.audioUrl);
  const [audioTitle, setAudioTitle] = useState(currentSettings.audioTitle);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoUrlChange = (index: number, newUrl: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], url: newUrl };
    setPhotos(updated);
  };

  const handlePhotoCaptionChange = (index: number, newCaption: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], caption: newCaption };
    setPhotos(updated);
  };

  const handleSave = () => {
    sfx.playSparkle();
    onSave({
      photos,
      audioUrl,
      audioTitle: audioTitle || 'Navi’s Birthday Track'
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleResetDefaults = () => {
    sfx.playPop();
    setPhotos(DEFAULT_PHOTOS);
    setAudioUrl(DEFAULT_AUDIO_URL);
    setAudioTitle('Navi’s Birthday Melody');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-7 shadow-2xl border border-pink-100 my-4 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-xl text-pink-600">
                  <Link2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                    Catbox Media Manager
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Paste your 10 Catbox photo links and 1 Catbox background music link
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
              {/* Background Music Setting */}
              <div className="bg-pink-50/70 border border-pink-100 rounded-2xl p-3.5 sm:p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Music className="h-4 w-4 text-pink-600" />
                  <span className="font-serif font-bold text-xs sm:text-sm text-stone-800">
                    Background Audio (.mp3 Catbox Link)
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mb-2.5">
                  Catbox pe song upload karke direct <code className="text-pink-600 bg-white px-1 py-0.5 rounded">.mp3</code> link yahan paste karein.
                </p>
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://files.catbox.moe/example.mp3"
                  className="w-full text-xs bg-white border border-pink-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* 10 Photos Form */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-pink-600" />
                    <span className="font-serif font-bold text-xs sm:text-sm text-stone-800">
                      10 Photo Links for Navi
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-pink-600">
                    10 Slots Available
                  </span>
                </div>

                <div className="space-y-3">
                  {photos.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="flex items-center gap-2.5 p-2.5 bg-stone-50 border border-stone-200/70 rounded-xl"
                    >
                      {/* Thumbnail Preview */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300 flex items-center justify-center">
                        {photo.url && !photo.url.endsWith('.mp4') && !photo.url.endsWith('.webm') && !photo.url.endsWith('.mov') ? (
                          <img
                            src={photo.url}
                            alt={`Slot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                        ) : (
                          <span className="text-base select-none">
                            {idx >= 8 ? '🎬' : '🖼️'}
                          </span>
                        )}
                      </div>

                      {/* Input fields */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-stone-700">
                            {idx >= 8 ? `Slot ${idx + 1} (Video / Photo)` : `Photo ${idx + 1}`}
                          </span>
                          {idx >= 8 && (
                            <span className="text-[10px] text-pink-600 font-semibold bg-pink-50 px-1.5 py-0.2 rounded">
                              Video Supported
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={photo.url}
                          onChange={(e) => handlePhotoUrlChange(idx, e.target.value)}
                          placeholder={
                            idx >= 8
                              ? 'https://files.catbox.moe/video.mp4 (or image link)'
                              : `https://files.catbox.moe/pic${idx + 1}.jpg`
                          }
                          className="w-full text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-pink-400 truncate"
                        />
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => handlePhotoCaptionChange(idx, e.target.value)}
                          placeholder="Caption..."
                          className="w-full text-[11px] bg-white border border-stone-200 rounded-lg px-2.5 py-0.5 text-stone-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 px-2 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800 rounded-full hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save & Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
