import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Building2, Mail, Users, LogOut, X, Building2 as LogoIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/properties', label: 'Properties', icon: Building2 },
    { path: '/dashboard/inquiries', label: 'Inquiries', icon: Mail },
    { path: '/dashboard/users', label: 'Users', icon: Users },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-dark-800 border-r border-white/5 z-50 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">TopTier</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/60">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === item.path ? 'bg-primary/20 text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
