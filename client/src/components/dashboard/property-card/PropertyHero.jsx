import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';

const PropertyHero = ({ 
  title = "Property Management", 
  subtitle = "Manage all your property listings in one place",
  ctaText = "Add Property",
  onCtaClick,
  stats = []
}) => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/40" />
      
      {/* Content */}
      <div className="relative px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          
          <p className="text-lg text-white/70 mb-8 max-w-xl">
            {subtitle}
          </p>
          
          {onCtaClick && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCtaClick}
              className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </motion.div>

        {/* Stats badges */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10"
              >
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-white/60 text-sm ml-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />
    </div>
  );
};

export default PropertyHero;
