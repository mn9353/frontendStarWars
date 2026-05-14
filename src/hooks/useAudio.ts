import { useCallback, useRef, useState, useEffect } from 'react';

// Create a global state for mute so it persists across components if needed
// Or just manage sound globally. For simple usage, we'll keep it within the hook
// but rely on HTML5 Audio which is fast enough for UI sounds.

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(false);

  // Background music
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusicRef.current = new Audio('/sounds/bg-music.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.3; // Low volume for background
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) {
      if (isMuted) {
        bgMusicRef.current.pause();
      } else {
        // Audio might fail to play without user interaction first
        bgMusicRef.current.play().catch(e => console.log('Audio autoplay prevented'));
      }
    }
  }, [isMuted]);

  // Sound effects
  const playSound = useCallback((soundName: string, volume: number = 0.5) => {
    if (isMuted) return;
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = volume;
      audio.play().catch(e => console.log('Audio play prevented', e));
    } catch (e) {
      console.error('Error playing sound', e);
    }
  }, [isMuted]);

  const playHover = useCallback(() => playSound('r2d2-hover', 0.2), [playSound]);
  const playClick = useCallback(() => playSound('r2d2-click', 0.5), [playSound]);
  const playLightsaber = useCallback(() => playSound('lightsaber-on', 0.6), [playSound]);
  const playSubmit = useCallback(() => playSound('r2d2-happy', 0.6), [playSound]);

  return {
    isMuted,
    toggleMute,
    playHover,
    playClick,
    playLightsaber,
    playSubmit
  };
};
