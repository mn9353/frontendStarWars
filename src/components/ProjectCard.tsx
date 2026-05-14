import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string;
  color: 'blue' | 'red' | 'green' | 'gold';
  index: number;
}

const colorMap = {
  blue:  { border: 'rgba(0,180,216,0.3)',   glow: '#00b4d8', text: '#00b4d8',  shadow: 'rgba(0,180,216,0.2)' },
  red:   { border: 'rgba(255,10,84,0.3)',   glow: '#ff0a54', text: '#ff0a54',  shadow: 'rgba(255,10,84,0.2)' },
  green: { border: 'rgba(87,204,153,0.3)',  glow: '#57cc99', text: '#57cc99',  shadow: 'rgba(87,204,153,0.2)' },
  gold:  { border: 'rgba(247,201,72,0.3)',  glow: '#f7c948', text: '#f7c948',  shadow: 'rgba(247,201,72,0.2)' },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, subtitle, description, tags, icon, color, index }) => {
  const c = colorMap[color];
  const { playClick } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      onClick={playClick}
      className="holo-card bracket-corner rounded-lg overflow-hidden group cursor-pointer"
      style={{ borderColor: c.border }}
    >
      {/* Header visual */}
      <div className="relative h-48 overflow-hidden imperial-grid"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${c.shadow} 0%, #0a0a1a 70%)` }}>
        
        {/* Scan line */}
        <div className="scan-lines absolute inset-0" />

        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl opacity-80 group-hover:opacity-100 transition-opacity"
            style={{ filter: `drop-shadow(0 0 20px ${c.glow})` }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 text-[8px] font-mono opacity-40" style={{ color: c.text }}>
          SYS.{String(index + 1).padStart(3, '0')}
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: c.glow, opacity: 0.3 + i * 0.25, boxShadow: `0 0 4px ${c.glow}` }} />
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-card to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="font-mono text-[9px] tracking-[0.3em] mb-1 opacity-60" style={{ color: c.text }}>
          {subtitle}
        </div>
        <h3 className="font-orbitron text-lg text-republic-white mb-3 group-hover:text-saber-cyan transition-colors tracking-wide">
          {title}
        </h3>
        <p className="font-rajdhani text-stardust/70 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map(tag => (
            <span key={tag}
              className="text-[9px] px-2 py-1 rounded font-mono tracking-wider uppercase"
              style={{ color: c.text, border: `1px solid ${c.border}`, background: `${c.shadow}` }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 font-orbitron text-[10px] tracking-widest group/link"
          style={{ color: c.text }}>
          <span className="group-hover/link:mr-2 transition-all">ACCESS FILES</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover/link:translate-x-1 transition-transform">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
