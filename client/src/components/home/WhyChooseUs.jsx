import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Award, Users } from 'lucide-react';
import TextReveal from './TextReveal';

const features = [
  { icon: TrendingUp, title: 'High ROI Properties', desc: 'We analyze market trends to identify properties with the highest potential returns on investment.', color: 'from-emerald-500/20 to-emerald-600/10', iconColor: 'text-emerald-400' },
  { icon: Shield, title: 'Secure Transactions', desc: 'End-to-end encrypted processes ensure your investments and personal data remain protected.', color: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-400' },
  { icon: Award, title: 'Premium Selection', desc: 'Only 5% of properties make it through our rigorous vetting process for quality assurance.', color: 'from-amber-500/20 to-amber-600/10', iconColor: 'text-amber-400' },
  { icon: Users, title: 'Expert Guidance', desc: 'Our team of seasoned real estate professionals provides personalized investment strategies.', color: 'from-purple-500/20 to-purple-600/10', iconColor: 'text-purple-400' },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <TextReveal><h2 className="text-3xl lg:text-5xl font-bold text-white">Why Choose Us</h2></TextReveal>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            We combine market expertise with cutting-edge technology to deliver exceptional real estate investments.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }} className="group">
              <div className="glass-card-hover p-8 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <motion.div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                    <f.icon className={`w-7 h-7 ${f.iconColor}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
