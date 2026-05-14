import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

export const ContactForm = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { playSubmit } = useAudio();

  return (
    <section className="py-16 md:py-24 px-4 md:px-20 relative" id="contact">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-mono text-saber-blue text-[10px] tracking-[0.4em] mb-3 opacity-70">// COMM.TRANSMIT</div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-republic-white tracking-widest mb-4">
            OPEN A CHANNEL
          </h2>
          <p className="font-rajdhani text-stardust/60 tracking-widest text-sm">
            Transmit your message across the HoloNet
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-saber-blue to-transparent mx-auto mt-6"
            style={{ boxShadow: '0 0 8px var(--primary-hex)' }} />
        </motion.div>

        {/* Form card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, rotateX: 10, y: 40 }}
          animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="holo-card bracket-corner rounded-lg p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Scan line */}
          <div className="scan-lines absolute inset-0 pointer-events-none" />

          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-[0.3em] text-saber-blue/70 uppercase block">
                  Identification
                </label>
                <input
                  type="text"
                  placeholder="Commander Rex"
                  className="w-full bg-transparent border-b border-saber-blue/30 focus:border-saber-blue text-republic-white placeholder:text-stardust/30 py-3 px-0 font-rajdhani tracking-wider text-sm focus:ring-0 transition-colors"
                  style={{ outline: 'none' }}
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-[0.3em] text-saber-blue/70 uppercase block">
                  Comm Frequency
                </label>
                <input
                  type="email"
                  placeholder="rebel@alliance.com"
                  className="w-full bg-transparent border-b border-saber-blue/30 focus:border-saber-blue text-republic-white placeholder:text-stardust/30 py-3 px-0 font-rajdhani tracking-wider text-sm focus:ring-0 transition-colors"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.3em] text-saber-blue/70 uppercase block">
                Mission Briefing
              </label>
              <input
                type="text"
                placeholder="Describe your quest..."
                className="w-full bg-transparent border-b border-saber-blue/30 focus:border-saber-blue text-republic-white placeholder:text-stardust/30 py-3 px-0 font-rajdhani tracking-wider text-sm focus:ring-0 transition-colors"
                style={{ outline: 'none' }}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[0.3em] text-saber-blue/70 uppercase block">
                Encrypted Transmission
              </label>
              <textarea
                rows={4}
                placeholder="Your message to the Jedi Council..."
                className="w-full bg-transparent border-b border-saber-blue/30 focus:border-saber-blue text-republic-white placeholder:text-stardust/30 py-3 px-0 font-rajdhani tracking-wider text-sm focus:ring-0 transition-colors resize-none"
                style={{ outline: 'none' }}
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex justify-center">
              <motion.button
                type="submit"
                onClick={e => { e.preventDefault(); playSubmit(); }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(var(--primary-rgb),0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="relative px-10 py-4 font-orbitron text-xs tracking-[0.3em] text-space-black bg-saber-blue rounded overflow-hidden group uppercase"
                style={{ boxShadow: '0 0 15px rgba(var(--primary-rgb),0.3)' }}
              >
                <span className="relative z-10">TRANSMIT SIGNAL</span>
                <div className="absolute inset-0 bg-saber-cyan opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
