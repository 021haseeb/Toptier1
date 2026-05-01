import { motion } from 'framer-motion';

const SkeletonCard = ({ variant = 'card' }) => {
  if (variant === 'stat') {
    return (
      <div className="glass-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl skeleton" />
          <div className="w-12 h-5 rounded skeleton" />
        </div>
        <div className="w-20 h-4 rounded skeleton mb-2" />
        <div className="w-16 h-7 rounded skeleton" />
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-[16/10] skeleton" />
      
      {/* Content skeleton */}
      <div className="p-5">
        <div className="w-3/4 h-5 rounded skeleton mb-2" />
        <div className="w-1/2 h-4 rounded skeleton mb-4" />
        
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-4 rounded skeleton" />
          <div className="w-12 h-4 rounded skeleton" />
          <div className="w-16 h-4 rounded skeleton" />
        </div>
        
        <div className="flex gap-2 pt-3 border-t border-white/10">
          <div className="flex-1 h-10 rounded-xl skeleton" />
          <div className="flex-1 h-10 rounded-xl skeleton" />
          <div className="w-10 h-10 rounded-xl skeleton" />
        </div>
      </div>
    </div>
  );
};

const PropertySkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
};

const StatsSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <SkeletonCard variant="stat" />
        </motion.div>
      ))}
    </div>
  );
};

export { PropertySkeleton, StatsSkeleton, SkeletonCard };
