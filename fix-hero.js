const fs = require('fs');

const content = `import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

function useMouseParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const handler = (e) => {
      mx.set(e.clientX - window.innerWidth / 2);
      my.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);
  return { mx, my };
}

function Orb1({ sx, sy }) {
  return (
    <motion.div
      className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none"
      style={{ x: sx, y: sy }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
  );
}

function Orb2({ sx, sy }) {
  const nx = useTransform(sx, (v) => -v * 0.6);
  const ny = useTransform(sy, (v) => -v * 0.6);
  return (
    <motion.div
      className="absolute top-[50%] left-[55%] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl pointer-events-none"
      style={{ x: nx, y: ny }}
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
  );
}

function Particle({ p }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20 pointer-events-none"
      style={{ width: p.w, height: p.w, left: p.l, top: p.t }}
      animate={{ y: [0, -80, 0], opacity: [0, 0.5, 0] }}
      transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function CharReveal() {
  const chars = 'Discover exclusive luxury properties curated for discerning investors.'.split('');
  return (
    <p className="text-lg lg:text-xl text-white/60 leading-relaxed">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 + i * 0.012 }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}

const wordList = ['Find', 'Your', 'Perfect', 'Investment'];

function HeroTitle() {
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-8">
      {wordList.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] overflow-hidden">
          <motion.span
            className={'inline-block ' + (word === 'Perfect' || word === 'Investment' ? 'gradient-text' : '')}
            initial={{ y: '110%', rotateX: -80 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const stats = [
  { v: '500', s: '+', l: 'Properties' },
  { v: '2', s: 'B+', p: '$', l: 'Sales Volume' },
  { v: '98', s: '%', l: 'Client Satisfaction' },
  { v: '15', s: '+', l: 'Years Experience' },
];

function StatItem({ stat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 + i * 0.1, duration: 0.5 }}
      className="text-center group cursor-default"
      whileHover={{ y: -5 }}
    >
      <motion.div className="text-3xl lg:text-4xl font-bold gradient-text" whileHover={{ scale: 1.1 }}>
        <AnimatedCounter target={stat.v} suffix={stat.s} prefix={stat.p || ''} />
      </motion.div>
      <div className="text-sm text-white/50 mt-2 group-hover:text-white/70 transition-colors">{stat.l}</div>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.div
        className="w-7 h-12 rounded-full border-2 flex justify-center pt-2"
        animate={{ borderColor: ['rgba(255,255,255,0.2)', 'rgba(99,102,241,0.4)', 'rgba(255,255,255,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { mx, my } = useMouseParallax();
  const sx = useSpring(useTransform(mx, [-500, 500], [25, -25]), { damping: 25, stiffness: 150 });
  const sy = useSpring(useTransform(my, [-500, 500], [25, -25]), { damping: 25, stiffness: 150 });

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      w: 2 + Math.random() * 3,
      l: Math.random() * 100 + '%',
      t: Math.random() * 100 + '%',
      d: 12 + Math.random() * 10,
      delay: Math.random() * 5,
    })), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-32">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />

      <Orb1 sx={sx} sy={sy} />
      <Orb2 sx={sx} sy={sy} />

      {particles.map((p) => (
        <Particle key={p.id} p={p} />
      ))}

      <div className="relative z-20 section-padding w-full">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
            >
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-white/80 font-medium">Premium Real Estate Investment</span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>
            </motion.div>
          </motion.div>

          <HeroTitle />

          <div className="max-w-2xl mx-auto mb-12">
            <CharReveal />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/properties"
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', skewX: -15 }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Explore Properties</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="btn-outline inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.l} stat={stat} i={i} />
            ))}
          </motion.div>
        </div>

      <ScrollIndicator />
    </section>
  );
}
`;

fs.writeFileSync('client/src/components/home/HeroSection.jsx', content);
console.log('HeroSection.jsx written successfully');
