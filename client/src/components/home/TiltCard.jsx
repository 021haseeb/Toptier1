import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-120, 120], [5, -5]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(x, [-120, 120], [-5, 5]), { stiffness: 300, damping: 30 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
