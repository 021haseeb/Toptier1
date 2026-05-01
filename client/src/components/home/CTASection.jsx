import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TextReveal from './TextReveal';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-12 lg:p-20 text-center relative overflow-hidden">
          <motion.div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
            animate={{ x: [0, -80, 0], y: [0, -40, 0], scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

          <div className="relative z-10">
            <TextReveal>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Start Your Investment Journey</h2>
            </TextReveal>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of satisfied investors who have found their perfect properties through TopTier.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/properties" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
                Get Started
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
