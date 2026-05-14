import { motion } from 'framer-motion';

const skills = [
  {
    category: 'JEDI FRONTEND',
    icon: '⚡',
    color: '#00b4d8',
    items: ['React & Next.js', 'TypeScript', 'Three.js / WebGL', 'Framer Motion'],
  },
  {
    category: 'SITH BACKEND',
    icon: '🔥',
    color: '#ff0a54',
    items: ['Node.js / Go / Rust', 'Distributed Systems', 'GraphQL / REST', 'PostgreSQL'],
  },
  {
    category: 'REBEL DEVOPS',
    icon: '🛸',
    color: '#57cc99',
    items: ['Kubernetes', 'AWS / GCP', 'CI/CD Pipelines', 'Docker Fleets'],
  },
];

export const SkillsSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-20 relative" id="arsenal">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="font-mono text-saber-blue text-[10px] tracking-[0.4em] mb-3 opacity-70">// ABILITY.LOG</div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-republic-white mb-4 tracking-widest">
            THE FORCE ARSENAL
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-saber-blue to-transparent mx-auto"
            style={{ boxShadow: '0 0 8px #00b4d8' }} />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {skills.map((skill, si) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: si * 0.15 }}
              className="holo-card bracket-corner rounded-lg p-6 sm:p-8 text-center group"
            >
              {/* Orb */}
              <div className="flex justify-center mb-6">
                <div className="skill-orb" style={{ borderColor: `${skill.color}50`, background: `${skill.color}08` }}>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: si * 0.5 }}
                    className="text-3xl"
                    style={{ filter: `drop-shadow(0 0 12px ${skill.color})` }}
                  >
                    {skill.icon}
                  </motion.span>
                  <div className="absolute inset-[-6px] rounded-full border opacity-20 animate-ping"
                    style={{ borderColor: skill.color }} />
                </div>
              </div>

              {/* Title */}
              <div className="font-orbitron text-xs tracking-[0.3em] mb-6 uppercase"
                style={{ color: skill.color }}>
                {skill.category}
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {skill.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.1 + ii * 0.08 }}
                    className="font-rajdhani text-stardust/70 tracking-wider text-sm flex items-center justify-center gap-2 hover:text-republic-white transition-colors cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: skill.color }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
