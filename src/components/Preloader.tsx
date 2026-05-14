import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'text' | 'enter' | 'done'>('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setPhase('text');
          setTimeout(() => {
            setPhase('enter');
          }, 2000);
          return 100;
        }
        return p + 1.5;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setPhase('done');
    onComplete();
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Star field */}
          <div className="star-field" />

          {/* Death Star SVG */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* Outer ring */}
              <circle cx="90" cy="90" r="85" fill="none" stroke="rgba(var(--primary-rgb),0.15)" strokeWidth="1" />
              <circle cx="90" cy="90" r="85" fill="none" stroke="var(--primary-hex)" strokeWidth="2"
                strokeDasharray={`${progress * 5.34} 534`} strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px var(--primary-hex))' }}
              />

              {/* Death Star body */}
              <circle cx="90" cy="90" r="70" fill="#0a0a1a" stroke="rgba(var(--primary-rgb),0.1)" strokeWidth="1" />

              {/* Hemisphere line */}
              <line x1="20" y1="90" x2="160" y2="90" stroke="rgba(var(--primary-rgb),0.3)" strokeWidth="1" />

              {/* Superlaser dish */}
              <circle cx="65" cy="70" r="18" fill="#111130" stroke="rgba(var(--primary-rgb),0.4)" strokeWidth="1.5" />
              <circle cx="65" cy="70" r="10" fill="#0d0d22" stroke="rgba(var(--primary-rgb),0.6)" strokeWidth="1" />
              <circle cx="65" cy="70" r="4" fill="var(--primary-hex)" opacity="0.8"
                style={{ filter: 'drop-shadow(0 0 6px var(--primary-hex))' }}
              />

              {/* Panel lines */}
              <line x1="90" y1="30" x2="90" y2="160" stroke="rgba(var(--primary-rgb),0.08)" strokeWidth="1" />
              <line x1="45" y1="45" x2="135" y2="135" stroke="rgba(var(--primary-rgb),0.06)" strokeWidth="1" />
              <line x1="135" y1="45" x2="45" y2="135" stroke="rgba(var(--primary-rgb),0.06)" strokeWidth="1" />
              <circle cx="90" cy="90" r="45" fill="none" stroke="rgba(var(--primary-rgb),0.06)" strokeWidth="1" />
              <circle cx="90" cy="90" r="20" fill="none" stroke="rgba(var(--primary-rgb),0.08)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Progress percentage */}
          <div className="text-center">
            <div className="font-mono text-saber-blue text-3xl font-bold mb-2"
              style={{ fontFamily: 'Share Tech Mono', textShadow: '0 0 20px var(--primary-hex)' }}>
              {Math.floor(progress)}%
            </div>
            <div className="font-orbitron text-[10px] tracking-[0.4em] text-stardust/50 uppercase">
              Initializing Holonet
            </div>
          </div>

          {/* Lightsaber Progress Bar */}
          <div className="w-64 md:w-80 flex items-center justify-start mt-4">
            {/* Lightsaber Hilt */}
            <svg width="60" height="16" viewBox="0 0 80 18" className="flex-shrink-0 z-10 drop-shadow-lg relative -mr-2 scale-75 md:scale-100 origin-left">
              <rect x="0" y="3" width="12" height="12" fill="#888" rx="2" />
              <rect x="12" y="1" width="45" height="16" fill="#222" rx="2" />
              <rect x="14" y="4" width="41" height="2" fill="#555" />
              <rect x="14" y="12" width="41" height="2" fill="#555" />
              <rect x="57" y="2" width="20" height="14" fill="#333" rx="2" />
              <circle cx="35" cy="9" r="3" fill="var(--primary-hex)" style={{ filter: 'drop-shadow(0 0 4px var(--primary-hex))' }} />
              <rect x="75" y="0" width="4" height="18" fill="#aaa" rx="1" />
            </svg>

            {/* Lightsaber Blade */}
            <div className="flex-1 h-2 md:h-3 rounded-r-full relative overflow-hidden ml-[-2px] bg-transparent">
              <motion.div
                className="absolute left-0 top-0 bottom-0 rounded-r-full"
                style={{ 
                  width: `${progress}%`, 
                  backgroundColor: '#fff',
                  boxShadow: `0 0 10px var(--primary-hex), 0 0 20px var(--primary-hex), 0 0 40px var(--primary-hex)`
                }}
              />
            </div>
          </div>

          {/* Opening crawl text phase or Enter Button */}
          <div className="w-full flex justify-center h-16 items-center mt-8 md:mt-12">
            <AnimatePresence mode="wait">
              {phase === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-orbitron text-force-gold text-sm tracking-[0.3em]"
                    style={{ textShadow: '0 0 20px #f7c948' }}>
                    A LONG TIME AGO IN A GALAXY FAR, FAR AWAY....
                  </p>
                </motion.div>
              )}

              {phase === 'enter' && <motion.button
                    key="enter"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--primary-rgb),0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="px-6 py-3 md:px-10 md:py-4 border border-saber-blue bg-space-black/80 backdrop-blur-sm text-saber-blue font-orbitron tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm rounded shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] hover:bg-saber-blue/10 transition-all uppercase cursor-pointer"
                  >
                  Enter Galaxy
                </motion.button>
              }
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
