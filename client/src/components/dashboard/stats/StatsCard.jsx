import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const StatsCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  changeType = 'positive',
  color = 'primary',
  delay = 0 
}) => {
  const colorStyles = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      glow: 'group-hover:shadow-primary/20',
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      glow: 'group-hover:shadow-secondary/20',
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      glow: 'group-hover:shadow-accent/20',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      glow: 'group-hover:shadow-emerald-500/20',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      glow: 'group-hover:shadow-amber-500/20',
    },
    rose: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      glow: 'group-hover:shadow-rose-500/20',
    },
  };

  const colors = colorStyles[color] || colorStyles.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-6 group hover:scale-[1.02] transition-all duration-300 ${colors.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {changeType === 'positive' ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
