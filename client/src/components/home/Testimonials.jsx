import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import TextReveal from './TextReveal';

const data = [
  { name: 'Sarah Mitchell', role: 'Property Investor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', text: 'TopTier helped me find an incredible waterfront property that has already appreciated 25% in just one year. Their market insights are unmatched.', rating: 5 },
  { name: 'James Rodriguez', role: 'Business Owner', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', text: 'The team at TopTier made the entire buying process seamless. From property selection to closing, they handled everything professionally.', rating: 5 },
  { name: 'Emily Chen', role: 'Real Estate Developer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', text: 'I have worked with many agencies, but TopTier stands out for their curated selection and deep market knowledge. Highly recommended.', rating: 5 },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIndex(p => (p + 1) % data.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-padding py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <TextReveal><h2 className="text-3xl lg:text-5xl font-bold text-white">What Our Clients Say</h2></TextReveal>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-white/60 mt-4 text-lg">Trusted by investors worldwide</motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: 10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 glass-card p-8 lg:p-12 flex flex-col items-center text-center" style={{ transformStyle: 'preserve-3d' }}>
              <div className="flex gap-1 mb-6">
                {[...Array(data[activeIndex].rating)].map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}>
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>
              <motion.p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8 italic max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                &ldquo;{data[activeIndex].text}&rdquo;
              </motion.p>
              <motion.div className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <motion.img src={data[activeIndex].image} alt={data[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 mb-4" whileHover={{ scale: 1.1, rotate: 5 }} />
                <h4 className="text-white font-semibold text-lg">{data[activeIndex].name}</h4>
                <p className="text-white/50 text-sm">{data[activeIndex].role}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {data.map((_, i) => (
            <motion.button key={i} onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full ${i === activeIndex ? 'bg-primary' : 'bg-white/20'}`}
              animate={{ width: i === activeIndex ? 32 : 10 }} whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
