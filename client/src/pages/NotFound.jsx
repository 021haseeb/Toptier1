import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-5 h-5" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
