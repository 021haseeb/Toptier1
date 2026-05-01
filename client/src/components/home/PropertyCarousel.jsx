import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath } from 'lucide-react';
import api from '../../utils/api';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';

export default function PropertyCarousel() {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    api.get('/properties/featured/list')
      .then(r => setProperties(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!properties.length) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrentIndex(p => (p + 1) % properties.length);
    }, 5000);
    return () => clearInterval(t);
  }, [properties.length]);

  const go = (dir) => {
    setDirection(dir);
    setCurrentIndex(p => (p + dir + properties.length) % properties.length);
  };

  if (loading) {
    return (
      <section className="section-padding py-24">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 skeleton rounded-2xl" />
        </div>
      </section>
    );
  }
  if (!properties.length) return null;

  const vis = [
    properties[(currentIndex - 1 + properties.length) % properties.length],
    properties[currentIndex],
    properties[(currentIndex + 1) % properties.length],
  ];

  return (
    <section className="section-padding py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-14">
          <div>
            <TextReveal><h2 className="text-3xl lg:text-5xl font-bold text-white">Featured Properties</h2></TextReveal>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-white/60 mt-3 text-lg">
              Handpicked luxury investments for you
            </motion.p>
          </div>
          <div className="hidden sm:flex gap-3">
            <motion.button onClick={() => go(-1)} className="p-3 rounded-xl glass hover:bg-white/10" whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }}><ChevronLeft className="w-5 h-5" /></motion.button>
            <motion.button onClick={() => go(1)} className="p-3 rounded-xl glass hover:bg-white/10" whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }}><ChevronRight className="w-5 h-5" /></motion.button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 lg:gap-8 min-h-[480px]">
          {vis.map((property, idx) => {
            const isCenter = idx === 1;
            return (
              <motion.div key={`${property._id}-${currentIndex}-${idx}`}
                initial={{ x: direction > 0 ? 250 : -250, opacity: 0, scale: 0.85 }}
                animate={{ x: 0, opacity: isCenter ? 1 : 0.5, scale: isCenter ? 1 : 0.88 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`${isCenter ? 'w-full max-w-md z-20' : 'hidden md:block w-full max-w-[280px] z-10'} ${!isCenter ? 'pointer-events-none' : ''}`}>
                <TiltCard className={isCenter ? '' : 'pointer-events-none'}>
                  <Link to={`/properties/${property._id}`} className="block group">
                    <div className="glass-card overflow-hidden">
                      <div className="relative h-64 overflow-hidden">
                        <motion.img src={property.images[0]} alt={property.title} className="w-full h-full object-cover"
                          whileHover={isCenter ? { scale: 1.08 } : {}} transition={{ duration: 0.6 }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-primary/80 text-white text-xs font-medium backdrop-blur-sm">{property.type}</span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold text-lg truncate">{property.title}</p>
                          <div className="flex items-center gap-1 text-white/60 text-sm mt-1"><MapPin className="w-3.5 h-3.5" />{property.location.city}, {property.location.state}</div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold gradient-text">${property.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.bedrooms}</span>
                            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms}</span>
                          </div>
                        </div>
                        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.3, duration: 0.8 }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {properties.map((_, i) => (
            <motion.button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              className={`h-2 rounded-full ${i === currentIndex ? 'bg-primary' : 'bg-white/20'}`}
              animate={{ width: i === currentIndex ? 32 : 8 }} whileHover={{ scale: 1.2 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
