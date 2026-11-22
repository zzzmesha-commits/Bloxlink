import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BACKGROUND_SONG_SRC =
  '/assets/aistudio/Miguel_Travis_Scott_-_Skywalker__mp3.pm__6bdac2c5.mp3';
const LOW_VOLUME = 0.14;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const userMutedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = LOW_VOLUME;
    audio.loop = true;

    let unlocked = false;

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    const tryPlay = async () => {
      if (userMutedRef.current) return;
      try {
        audio.volume = LOW_VOLUME;
        await audio.play();
        unlocked = true;
        setIsPlaying(true);
        removeUnlockListeners();
      } catch {
        setIsPlaying(false);
      }
    };

    function handleFirstInteraction(event: Event) {
      const target = event.target as Node | null;
      if (target && toggleButtonRef.current?.contains(target)) {
        return;
      }
      if (!unlocked && !userMutedRef.current) {
        void tryPlay();
      }
    }

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    void tryPlay();

    return () => {
      removeUnlockListeners();
      audio.pause();
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      audio.volume = LOW_VOLUME;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={BACKGROUND_SONG_SRC}
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      />
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Mute background music' : 'Play background music'}
        className="fixed bottom-4 right-4 z-30 w-9 h-9 rounded-full border border-[#E5C0CC] hover:border-[#C45473] bg-[#FFF9FB]/90 backdrop-blur-xs text-[#9E3B58] hover:text-[#752039] shadow-[0_6px_18px_rgba(166,58,89,0.12)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4" aria-hidden="true" />
        ) : (
          <VolumeX className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
