/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PhotoGallery } from './components/PhotoGallery.tsx';
import { BirthdayCake } from './components/BirthdayCake.tsx';
import { ChaiCorner } from './components/ChaiCorner.tsx';
import { SpecialQualities } from './components/SpecialQualities.tsx';
import { FriendLetter } from './components/FriendLetter.tsx';
import { BirthdayArcade } from './components/BirthdayArcade.tsx';
import { BirthdayWishes } from './components/BirthdayWishes.tsx';
import { InteractiveStickers } from './components/InteractiveStickers.tsx';
import { FloatingBalloons } from './components/FloatingBalloons.tsx';
import { MusicPlayer } from './components/MusicPlayer.tsx';
import { CatboxSettingsModal } from './components/CatboxSettingsModal.tsx';
import { IntroCurtain } from './components/IntroCurtain.tsx';
import { loadSavedMedia, saveMedia } from './utils/defaultData.ts';
import { MediaSettings } from './types.ts';

export default function App() {
  const [mediaSettings, setMediaSettings] = useState<MediaSettings>(() => loadSavedMedia());
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const handleSaveSettings = (newSettings: MediaSettings) => {
    setMediaSettings(newSettings);
    saveMedia(newSettings);
  };

  const handleToggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F9] text-stone-800 font-sans selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Starting Animation / Intro Curtain */}
      {!hasEntered && (
        <IntroCurtain
          onEnter={() => {
            setHasEntered(true);
            setIsPlayingMusic(true);
          }}
        />
      )}

      {/* Ambient floating balloons & petals effect */}
      <FloatingBalloons />

      {/* Interactive floating stickers that react on hover/tap */}
      <InteractiveStickers />

      {/* Top Navigation Bar */}
      <Navbar
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main>
        {/* Hero Section with Navi's Portrait First */}
        <HeroSection
          onScrollToCake={() => scrollToSection('cake')}
          onScrollToMemories={() => scrollToSection('memories')}
        />

        {/* 10 Polaroid Photo & Video Scrapbook */}
        <PhotoGallery
          photos={mediaSettings.photos}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Interactive 18th Birthday Cake */}
        <BirthdayCake />

        {/* Dedicated Chai Corner for Navi */}
        <ChaiCorner />

        {/* Special Qualities from Best Friend POV */}
        <SpecialQualities />

        {/* Fun & Play Zone: 20s Catcher Game, Birthday Confetti & Scratch Fortune Card */}
        <BirthdayArcade />

        {/* Confidential Best Friend Envelope & Emotional Letter */}
        <FriendLetter />

        {/* Birthday Cheers */}
        <BirthdayWishes />
      </main>

      {/* Floating Music Player with 60% default volume and controller */}
      <MusicPlayer
        audioUrl={mediaSettings.audioUrl}
        audioTitle={mediaSettings.audioTitle}
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Catbox Links Configuration Modal */}
      <CatboxSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSettings={mediaSettings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
