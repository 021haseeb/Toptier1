import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TextReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
