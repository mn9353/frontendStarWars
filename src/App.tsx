import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { ProjectCard } from './components/ProjectCard';
import { SkillsSection } from './components/SkillsSection';
import { ContactForm } from './components/ContactForm';
import { useAudio } from './hooks/useAudio';
import { AudioToggle } from './components/AudioToggle';

/* =====================
   DATA
   ===================== */
const projects = [
  {
    title: 'HoloNet Nexus',
    subtitle: 'REAL-TIME COMM SYSTEM',
    description: 'A galaxy-spanning real-time communication mesh built with Elixir & Phoenix. Sustains 500k concurrent holographic transmissions with sub-10ms latency.',
    tags: ['Elixir', 'Phoenix', 'WebSockets', 'Redis'],
    icon: '🌌',
    color: 'blue' as const,
  },
  {
    title: 'Dark Matter Vault',
    subtitle: 'ENCRYPTED DATA FORTRESS',
    description: 'Decentralized ledger of Imperial-grade security. Uses custom elliptic-curve cryptography to shield transactional data from even the darkest Sith intrusions.',
    tags: ['Solidity', 'Rust', 'ZK-Proofs', 'React'],
    icon: '🔐',
    color: 'red' as const,
  },
  {
    title: 'Oracle Droid',
    subtitle: 'PREDICTIVE AI ENGINE',
    description: 'An R2-class intelligence unit that foresees architectural failures before they disrupt the fleet. Trained on 10M+ telemetry records from the Outer Rim.',
    tags: ['PyTorch', 'FastAPI', 'TimeSeries', 'Go'],
    icon: '🤖',
    color: 'green' as const,
  },
];

const experience = [
  {
    period: 'BBY 0 — PRESENT',
    role: 'Grand Architect',
    company: 'Coruscant Engineering Corp',
    desc: 'Leading the construction of high-traffic financial fortress systems. Reduced query latency by 40% through advanced hyperdrive sharding algorithms.',
    side: 'light',
  },
  {
    period: 'BBY 4 — BBY 0',
    role: 'Senior Systems Engineer',
    company: 'Rebel Alliance Tech',
    desc: 'Forged the primary API gateway for millions of rebel operatives. Implemented a micro-orchestration layer that achieved zero downtime through the Battle of Endor.',
    side: 'dark',
  },
  {
    period: 'BBY 10 — BBY 4',
    role: 'Scout Engineer',
    company: 'Mandalorian Ventures',
    desc: 'Eliminated 200+ critical vulnerabilities in early-stage mobile platforms. Built the foundational UI library used across the Outer Rim territories.',
    side: 'light',
  },
];

/* =====================
   LIGHTSABER DIVIDER
   ===================== */
const LightsaberDivider = ({ color = 'blue', isDark }: { color?: 'blue' | 'green', isDark: boolean }) => {
  // If dark side is active, fall back to 'blue' so that the global hue-rotate can turn it red!
  const actualColor = isDark ? 'blue' : color;
  const glowColor = actualColor === 'green' ? '#39ff14' : 'var(--primary-hex)';
  return (
    <div className="lightsaber-divider my-4 px-4">
      <div className="saber-line" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`, boxShadow: `0 0 8px ${glowColor}` }} />
      {/* SVG Lightsaber icon */}
      <svg width="24" height="80" viewBox="0 0 24 80" className="flex-shrink-0">
        <rect x="10" y="0" width="4" height="60" rx="2"
          fill={glowColor} style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }} />
        <rect x="8" y="60" width="8" height="4" rx="1" fill="#888" />
        <rect x="9" y="64" width="6" height="16" rx="3" fill="#aaa" />
        <rect x="6" y="68" width="12" height="2" rx="1" fill="#777" />
      </svg>
      <div className="saber-line" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`, boxShadow: `0 0 8px ${glowColor}` }} />
    </div>
  );
};

/* =====================
   NEBULA BACKGROUND SVG
   ===================== */
const NebulaBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="star-field" />
    {/* Large nebula blobs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06]"
      style={{ background: 'radial-gradient(circle, #7b2fbe 0%, transparent 70%)', filter: 'blur(60px)' }} />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.05]"
      style={{ background: 'radial-gradient(circle, var(--primary-hex) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-[0.04]"
      style={{ background: 'radial-gradient(circle, #ff0a54 0%, transparent 70%)', filter: 'blur(100px)' }} />
    {/* Imperial grid overlay */}
    <div className="absolute inset-0 imperial-grid opacity-30" />
  </div>
);

/* =====================
   MAIN APP
   ===================== */
function App() {
  const [loaded, setLoaded] = useState(false);
  const [darkSide, setDarkSide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMuted, toggleMute, playClick, playLightsaber, allowBgMusic } = useAudio();

  useEffect(() => {
    if (darkSide) {
      document.body.classList.add('dark-side');
    } else {
      document.body.classList.remove('dark-side');
    }
  }, [darkSide]);

  return (
    <>
      {/* Preloader - conditionally unmounted to prevent re-render glitches on context updates */}
      {!loaded && <Preloader onComplete={() => { setLoaded(true); playLightsaber(); allowBgMusic(); }} />}
      
      <AudioToggle isMuted={isMuted} toggleMute={toggleMute} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen bg-space-black text-republic-white overflow-x-hidden"
          >
            <NebulaBackground />

            {/* =================== NAVIGATION =================== */}
            <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-10 py-4 sm:py-5"
              style={{ background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(var(--primary-rgb),0.1)' }}>
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="font-orbitron text-saber-blue text-base sm:text-lg tracking-[0.2em] font-bold"
                  style={{ textShadow: '0 0 20px rgba(var(--primary-rgb),0.6)' }}>
                  MNJ<span className="text-republic-white/40">://</span>MANOJ
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                  {['CHRONICLES', 'CAMPAIGNS', 'WEAPONS', 'FORCE', 'CHANNEL'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
                       onClick={playClick}>
                      {item}
                    </a>
                  ))}
                </nav>

                {/* Right controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Dark/Light Side toggle */}
                  <button
                    onClick={() => { setDarkSide(d => !d); playLightsaber(); }}
                    className="font-orbitron text-[9px] tracking-[0.2em] px-3 py-2 rounded border transition-all"
                    style={{
                      color: 'var(--primary-hex)',
                      borderColor: 'rgba(var(--primary-rgb),0.4)',
                      background: 'rgba(var(--primary-rgb),0.08)',
                    }}>
                    {darkSide ? '🔴 DARK SIDE' : '🔵 LIGHT SIDE'}
                  </button>

                  {/* Hire Me */}
                  <a href="#contact"
                    onClick={playClick}
                    className="hidden sm:block font-orbitron text-[9px] tracking-[0.2em] px-5 py-2 rounded bg-saber-blue text-space-black font-bold uppercase"
                    style={{ boxShadow: '0 0 15px rgba(var(--primary-rgb),0.4)' }}>
                    Hire Me
                  </a>

                  {/* Hamburger */}
                  <button className="md:hidden p-2" onClick={() => { setMenuOpen(m => !m); playClick(); }}>
                    <div className={`w-5 h-0.5 bg-saber-blue mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ boxShadow: '0 0 4px var(--primary-hex)' }} />
                    <div className={`w-5 h-0.5 bg-saber-blue mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} style={{ boxShadow: '0 0 4px var(--primary-hex)' }} />
                    <div className={`w-5 h-0.5 bg-saber-blue transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ boxShadow: '0 0 4px var(--primary-hex)' }} />
                  </button>
                </div>
              </div>

              {/* Mobile menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden overflow-hidden"
                  >
                    <nav className="flex flex-col gap-4 py-6 px-4 border-t border-saber-blue/10 mt-4">
                      {['CHRONICLES', 'CAMPAIGNS', 'WEAPONS', 'FORCE', 'CHANNEL'].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`}
                          onClick={() => { setMenuOpen(false); playClick(); }}
                          className="nav-link text-base">
                          {item}
                        </a>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* =================== HERO =================== */}
            <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
              {/* Opening crawl area */}
              <div className="absolute inset-0 overflow-hidden flex items-end justify-center pointer-events-none">
                <div className="w-full max-w-lg pb-0 crawl-container h-48 opacity-[0.08]">
                  <div className="crawl-text font-orbitron text-force-gold text-xs tracking-widest space-y-2 text-center">
                    <p>EPISODE I</p>
                    <p>A PORTFOLIO FAR, FAR AWAY</p>
                    <p className="mt-4">In the galaxy of software engineering, one architect stands above the rest...</p>
                  </div>
                </div>
              </div>

              {/* Floating Death Star orb */}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-10 relative"
              >
                <svg width="140" height="140" viewBox="0 0 140 140" className="sm:w-[160px] sm:h-[160px]">
                  <circle cx="70" cy="70" r="65" fill="#0a0a1a"
                    stroke="rgba(var(--primary-rgb),0.3)" strokeWidth="1" />
                  <line x1="10" y1="70" x2="130" y2="70" stroke="rgba(var(--primary-rgb),0.2)" strokeWidth="1" />
                  <circle cx="50" cy="52" r="14" fill="#111130" stroke="rgba(var(--primary-rgb),0.4)" strokeWidth="1.5" />
                  <circle cx="50" cy="52" r="7" fill="#0d0d22" stroke="rgba(var(--primary-rgb),0.6)" strokeWidth="1" />
                  <circle cx="50" cy="52" r="3" fill="var(--primary-hex)"
                    style={{ filter: 'drop-shadow(0 0 8px var(--primary-hex))' }} />
                  <circle cx="70" cy="70" r="40" fill="none" stroke="rgba(var(--primary-rgb),0.06)" strokeWidth="1" />
                  <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(var(--primary-rgb),0.15)" strokeWidth="1" strokeDasharray="8 4" />
                </svg>
                {/* Orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-20px] rounded-full border opacity-20"
                  style={{ borderColor: 'var(--primary-hex)', borderStyle: 'dashed' }}
                />
              </motion.div>

              {/* Main title */}
              <div className="mb-3 font-mono text-saber-blue text-[10px] sm:text-xs tracking-[0.5em] opacity-70">
                JEDI MASTER // FULL STACK ENGINEER
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                data-text="MANOJ N."
                className="glitch font-orbitron text-4xl sm:text-6xl md:text-8xl text-republic-white mb-2 tracking-[0.15em] sm:tracking-[0.25em] leading-tight"
                style={{ textShadow: `0 0 40px rgba(var(--primary-rgb),0.4), 0 0 80px rgba(var(--primary-rgb),0.2)` }}
              >
                MANOJ N.
              </motion.h1>

              {/* Proper Lightsaber Element */}
              <motion.div
                key={darkSide ? 'dark-saber' : 'light-saber'}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-[280px] sm:max-w-sm mx-auto mb-6 flex items-center justify-center"
                style={{ transformOrigin: 'left' }}
              >
                {/* Lightsaber Hilt */}
                <svg width="80" height="18" viewBox="0 0 80 18" className="flex-shrink-0 z-10 drop-shadow-lg relative -mr-2">
                  <rect x="0" y="3" width="12" height="12" fill="#888" rx="2" />
                  <rect x="12" y="1" width="45" height="16" fill="#222" rx="2" />
                  <rect x="14" y="4" width="41" height="2" fill="#555" />
                  <rect x="14" y="12" width="41" height="2" fill="#555" />
                  <rect x="57" y="2" width="20" height="14" fill="#333" rx="2" />
                  <circle cx="35" cy="9" r="3" fill="var(--primary-hex)" style={{ filter: `drop-shadow(0 0 4px var(--primary-hex))` }} />
                  {/* Guard */}
                  <rect x="75" y="0" width="4" height="18" fill="#aaa" rx="1" />
                </svg>
                {/* Lightsaber Blade */}
                <div className="flex-1 h-3 rounded-r-full relative overflow-hidden" 
                     style={{ 
                       backgroundColor: '#fff', 
                       boxShadow: `0 0 10px var(--primary-hex), 0 0 20px var(--primary-hex), 0 0 40px var(--primary-hex)` 
                     }}>
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
                    className="absolute inset-0 bg-white"
                  />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-rajdhani text-stardust/60 tracking-[0.3em] text-xs sm:text-sm mb-10 sm:mb-12 uppercase"
              >
                Master of the Digital Force & Galactic Architect
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
              >
                <a href="#chronicles"
                  onClick={playClick}
                  className="w-full sm:w-auto px-8 py-4 bg-saber-blue text-space-black font-orbitron text-[11px] tracking-[0.25em] rounded uppercase text-center font-bold"
                  style={{ boxShadow: '0 0 25px rgba(var(--primary-rgb),0.5)' }}>
                  ⚡ EXPLORE CHRONICLES
                </a>
                <a href="#contact"
                  onClick={playClick}
                  className="w-full sm:w-auto px-8 py-4 border text-saber-blue font-orbitron text-[11px] tracking-[0.25em] rounded uppercase text-center"
                  style={{ borderColor: 'rgba(var(--primary-rgb),0.4)', background: 'rgba(var(--primary-rgb),0.05)' }}>
                  📡 OPEN CHANNEL
                </a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
              >
                <span className="font-mono text-[8px] tracking-[0.4em] text-saber-blue">SCROLL</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-saber-blue">
                  <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            </section>

            {/* Divider */}
            <LightsaberDivider color="blue" isDark={darkSide} />

            {/* =================== ABOUT (CHRONICLES) =================== */}
            <section id="chronicles" className="py-16 md:py-24 px-4 md:px-20 relative">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="font-mono text-force-gold text-[10px] tracking-[0.4em] mb-3 opacity-70">// JEDI.ARCHIVES</div>
                  <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-republic-white tracking-widest mb-6">
                    THE CHRONICLES
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="holo-card bracket-corner rounded-lg p-6 sm:p-10 relative overflow-hidden"
                >
                  <div className="scan-lines absolute inset-0 pointer-events-none" />
                  <div className="relative z-10 space-y-5 font-rajdhani text-stardust/80 text-base sm:text-lg leading-relaxed italic">
                    <p>
                      In the vast galaxy of software engineering, I have spent a decade mastering the Force that binds all systems — code itself. My journey began with the fundamental arts of the web, before ascending to the mastery of distributed systems that power entire star fleets.
                    </p>
                    <p>
                      Like a Jedi who wields both mind and lightsaber, I forge architectures that are both beautiful in their logic and unbreakable under siege. Every system I build is designed to withstand the darkest Sith intrusions and scale to serve a thousand worlds.
                    </p>
                    <div className="pt-4 text-center">
                      <span className="font-orbitron text-force-gold text-xs sm:text-sm tracking-widest"
                        style={{ textShadow: '0 0 20px rgba(247,201,72,0.5)' }}>
                        "DO OR DO NOT. THERE IS NO TRY."
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Divider */}
            <LightsaberDivider color="green" isDark={darkSide} />

            {/* =================== EXPERIENCE (CAMPAIGNS) =================== */}
            <section id="campaigns" className="py-16 md:py-24 px-4 md:px-20 relative">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-14"
                >
                  <div className="font-mono text-saber-blue text-[10px] tracking-[0.4em] mb-3 opacity-70">// BATTLE.RECORDS</div>
                  <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-republic-white tracking-widest">
                    GALACTIC CAMPAIGNS
                  </h2>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-saber-blue to-transparent mx-auto mt-6"
                    style={{ boxShadow: '0 0 8px var(--primary-hex)' }} />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                  {/* Center line (desktop) / Left line (mobile) */}
                  <div className="absolute hidden md:block"
                    style={{ left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent, var(--primary-hex)40, var(--primary-hex), var(--primary-hex)40, transparent)', transform: 'translateX(-50%)' }} />
                  <div className="absolute md:hidden"
                    style={{ left: '16px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent, var(--primary-hex)40, var(--primary-hex), var(--primary-hex)40, transparent)' }} />

                  <div className="space-y-12 md:space-y-16">
                    {experience.map((exp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className={`relative flex pl-10 md:pl-0 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute hidden md:flex left-1/2 top-6 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center z-10"
                          style={{ background: exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)', boxShadow: `0 0 12px ${exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)'}` }}>
                        </div>
                        <div className="absolute md:hidden left-[10px] top-6 w-3 h-3 rounded-full z-10"
                          style={{ background: exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)', boxShadow: `0 0 8px ${exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)'}` }} />

                        {/* Card */}
                        <div className="holo-card bracket-corner rounded-lg p-5 sm:p-7 md:w-[46%] w-full group"
                          style={{ borderColor: exp.side === 'light' ? 'rgba(var(--primary-rgb),0.2)' : 'rgba(var(--primary-rgb),0.2)' }}>
                          <span className="font-mono text-[9px] tracking-[0.3em] opacity-60 block mb-1"
                            style={{ color: exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)' }}>
                            {exp.period}
                          </span>
                          <h3 className="font-orbitron text-sm sm:text-base text-republic-white mb-1 uppercase tracking-wide">
                            {exp.role}
                          </h3>
                          <div className="font-mono text-[10px] mb-3 opacity-50"
                            style={{ color: exp.side === 'light' ? 'var(--primary-hex)' : 'var(--primary-hex)' }}>
                            @ {exp.company}
                          </div>
                          <p className="font-rajdhani text-stardust/70 text-sm leading-relaxed">{exp.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <LightsaberDivider color="blue" isDark={darkSide} />

            {/* =================== PROJECTS (WEAPONS) =================== */}
            <section id="weapons" className="py-16 md:py-24 px-4 md:px-20 relative">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-14"
                >
                  <div className="font-mono text-saber-blue text-[10px] tracking-[0.4em] mb-3 opacity-70">// WEAPON.MANIFEST</div>
                  <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-republic-white tracking-widest">
                    FORGED WEAPONS
                  </h2>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-saber-blue to-transparent mx-auto mt-6"
                    style={{ boxShadow: '0 0 8px var(--primary-hex)' }} />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {projects.map((p, i) => (
                    <ProjectCard key={p.title} {...p} index={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* Divider */}
            <LightsaberDivider color="green" isDark={darkSide} />

            {/* =================== SKILLS (FORCE) =================== */}
            <SkillsSection />

            {/* Divider */}
            <LightsaberDivider color="blue" isDark={darkSide} />

            {/* =================== CONTACT =================== */}
            <ContactForm />

            {/* =================== FOOTER =================== */}
            <footer className="py-12 md:py-16 px-4 border-t text-center"
              style={{ borderColor: 'rgba(var(--primary-rgb),0.1)', background: 'rgba(5,5,16,0.9)' }}>
              <div className="max-w-5xl mx-auto">
                <div className="font-orbitron text-2xl sm:text-3xl text-saber-blue mb-3 tracking-[0.3em]"
                  style={{ textShadow: '0 0 20px rgba(var(--primary-rgb),0.5)' }}>
                  MANOJ N.
                </div>
                <p className="font-mono text-[9px] tracking-[0.4em] text-stardust/30 mb-6 uppercase">
                  Master Engineer // Galaxy Far, Far Away
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 text-xs sm:text-sm">
                  {['Github', 'LinkedIn', 'Twitter', 'Resume'].map(link => (
                    <a key={link} href="#" onClick={playClick} className="font-rajdhani text-stardust/50 hover:text-saber-blue transition-colors tracking-widest">
                      {link}
                    </a>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mb-8 opacity-30">
                  {['⚡', '🌌', '🛸', '⚔️'].map(icon => (
                    <span key={icon} className="text-xl hover:opacity-70 cursor-help transition-opacity">{icon}</span>
                  ))}
                </div>
                <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-stardust/20 uppercase">
                  © {new Date().getFullYear()} MANOJ N. — MAY THE CODE BE WITH YOU
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
