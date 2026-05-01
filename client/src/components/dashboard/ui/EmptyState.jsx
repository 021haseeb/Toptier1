import { motion } from 'framer-motion';
import { Home, Plus, ArrowRight } from 'lucide-react';

const EmptyState = ({ 
  title = "No Properties Yet",
  message = "Start building your portfolio by adding your first property.",
  ctaText = "Add Property",
  onCtaClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Home className="w-14 h-14 text-primary" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center animate-pulse">
          <Plus className="w-5 h-5 text-accent" />
        </div>
        
        <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        
        <div className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-secondary/20" />
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-white mb-3 text-center">
        {title}
      </h3>
      
      <p className="text-white/50 text-center max-w-md mb-8">
        {message}
      </p>

      {/* CTA Button */}
      {onCtaClick && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCtaClick}
          className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>{ctaText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
