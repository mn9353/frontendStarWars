import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playLightsaber: () => void;
  playSubmit: () => void;
  allowBgMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted
  const isMutedRef = useRef(false);
  const [bgAllowed, setBgAllowed] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const activeSoundsRef = useRef<Set<HTMLAudioElement>>(new Set());

  useEffect(() => {
    // Preload lightsaber sound immediately on mount
    const lsAudio = new Audio('/sounds/lightsaber-on.mp3');
    lsAudio.preload = 'auto';

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      activeSoundsRef.current.forEach(audio => audio.pause());
      activeSoundsRef.current.clear();
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      isMutedRef.current = next;
      
      if (next) {
        // Mute everything immediately
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
          bgMusicRef.current.muted = true;
          bgMusicRef.current.volume = 0;
        }
        activeSoundsRef.current.forEach(audio => {
          audio.pause();
          audio.muted = true;
          audio.volume = 0;
        });
        activeSoundsRef.current.clear();
      } else {
        // Unmute
        if (bgMusicRef.current) {
          bgMusicRef.current.muted = false;
          bgMusicRef.current.volume = 0.1;
          if (bgAllowed) {
            bgMusicRef.current.play().catch(() => {});
          }
        }
      }
      
      return next;
    });
  }, [bgAllowed]);

  useEffect(() => {
    if (bgAllowed && !bgMusicRef.current) {
      bgMusicRef.current = new Audio('/sounds/bg-music.mp3');
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = isMutedRef.current ? 0 : 0.1;
      bgMusicRef.current.muted = isMutedRef.current;
      
      if (!isMutedRef.current) {
        bgMusicRef.current.play().catch(() => {});
      }
    }
  }, [bgAllowed]);

  // Global listener to recover from autoplay blocks
  useEffect(() => {
    const handleInteraction = () => {
      if (bgMusicRef.current && !isMutedRef.current && bgAllowed && bgMusicRef.current.paused) {
        const playPromise = bgMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [bgAllowed]);

  const playSound = useCallback((soundName: string, volume: number = 0.5) => {
    if (isMutedRef.current) return;
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = volume;
      audio.muted = false;
      activeSoundsRef.current.add(audio);
      audio.onended = () => activeSoundsRef.current.delete(audio);
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => activeSoundsRef.current.delete(audio));
      }
    } catch (e) {}
  }, []);

  const value = {
    isMuted,
    toggleMute,
    playClick: () => playSound('r2d2-click', 0.5),
    playLightsaber: () => playSound('lightsaber-on', 0.6),
    playSubmit: () => playSound('r2d2-happy', 0.6),
    allowBgMusic: useCallback(() => setBgAllowed(true), [])
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
