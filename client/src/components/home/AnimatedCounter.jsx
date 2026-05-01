import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    const steps = 60;
    const duration = 2000;
    const inc = num / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= num) {
        setCount(num);
        clearInterval(t);
      } else {
        setCount(Math.floor(cur));
      }
    }, duration / steps);
    return () => clearInterval(t);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
