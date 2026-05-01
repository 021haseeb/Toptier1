import { motion } from 'framer-motion';

const PropertyGrid = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PropertyGrid;
