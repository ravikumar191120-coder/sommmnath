import { MediaSettings, PhotoItem } from '../types.ts';

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    url: 'https://files.catbox.moe/09klut.jpeg',
    caption: 'Bunnu in her natural aesthetic element ✨',
    subCaption: 'That calm face before starting mischief',
    rotation: -2.5,
    tapeColor: 'bg-pink-300/80'
  },
  {
    id: 2,
    url: 'https://files.catbox.moe/yc02nt.jpeg',
    caption: 'Bilauti 🐱 vibe in full bloom',
    subCaption: 'Goofy, adorable, and unmatched charm',
    rotation: 2,
    tapeColor: 'bg-rose-300/80'
  },
  {
    id: 3,
    url: 'https://files.catbox.moe/x5z3dn.jpeg',
    caption: 'Diary & Snap Story Queen 📖',
    subCaption: 'Deep English lines straight to the story',
    rotation: -3,
    tapeColor: 'bg-amber-200/80'
  },
  {
    id: 4,
    url: 'https://files.catbox.moe/y8uk45.jpeg',
    caption: 'The Aesthetic Art Soul 🎨',
    subCaption: 'Thinking in colors, canvases, and imagination',
    rotation: 2.5,
    tapeColor: 'bg-fuchsia-300/80'
  },
  {
    id: 5,
    url: 'https://files.catbox.moe/yzpwpm.jpeg',
    caption: 'Future Dr. Navi 🩺',
    subCaption: 'Stethoscope dreams and NEET warrior mindset',
    rotation: -2,
    tapeColor: 'bg-teal-200/80'
  },
  {
    id: 6,
    url: 'https://files.catbox.moe/p29m0m.jpeg',
    caption: 'Officially 18 Today! 🎂',
    subCaption: 'Welcome to the official legal adult chapter',
    rotation: 2.5,
    tapeColor: 'bg-pink-400/80'
  },
  {
    id: 7,
    url: 'https://files.catbox.moe/wlky0w.jpeg',
    caption: 'Pure Comfort Energy 🌸',
    subCaption: 'Effortlessly cool, friendly, and heartwarming',
    rotation: -1.5,
    tapeColor: 'bg-purple-200/80'
  },
  {
    id: 8,
    url: 'https://files.catbox.moe/pm1140.jpeg',
    caption: 'Golden Smile 🌟',
    subCaption: 'Brightening everyone around with ease',
    rotation: 2,
    tapeColor: 'bg-rose-200/80'
  },
  {
    id: 9,
    url: 'https://files.catbox.moe/g497d9.mp4',
    caption: 'Bilauti 🐱 in Motion 🎬',
    subCaption: 'Sweet candid moments playing on loop',
    rotation: -2.5,
    tapeColor: 'bg-amber-300/80'
  },
  {
    id: 10,
    url: 'https://files.catbox.moe/84lkns.mp4',
    caption: 'Bunnu’s Golden Memory ✨',
    subCaption: 'Pure joy & 18th chapter celebration',
    rotation: 1.5,
    tapeColor: 'bg-pink-300/80'
  }
];

export const DEFAULT_AUDIO_URL = 'https://files.catbox.moe/j9pgsm.mp4';

export const STORAGE_KEY = 'navi_birthday_media_v5';

export function loadSavedMedia(): MediaSettings {
  if (typeof window === 'undefined') {
    return {
      photos: DEFAULT_PHOTOS,
      audioUrl: DEFAULT_AUDIO_URL,
      audioTitle: 'Navi’s Birthday Melody'
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.photos) && parsed.photos.length === 10) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read from localStorage', e);
  }
  return {
    photos: DEFAULT_PHOTOS,
    audioUrl: DEFAULT_AUDIO_URL,
    audioTitle: 'Navi’s Birthday Melody'
  };
}

export function saveMedia(settings: MediaSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}
