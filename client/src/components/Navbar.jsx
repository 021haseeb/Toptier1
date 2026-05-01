import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useScrollProgress } from '../hooks/useScrollAnimation';
import {
  Home,
  Building2,
  Info,
  Phone,
  LogIn,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Heart,
  Search,
  User,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/properties', label: 'Properties', icon: Building2 },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Phone },
];

// Magnetic link component with spring physics
const MagneticLink = ({ children, to, isActive, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.15;
    const distY = (e.clientY - centerY) * 0.15;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 block ${
          isActive ? 'text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="navbar-active-pill"
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/10"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(99,102,241,0.1)',
                    '0 0 40px rgba(99,102,241,0.2)',
                    '0 0 20px rgba(99,102,241,0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Link>
    </motion.div>
  );
};

// Animated icon with rotation on hover
const AnimatedIcon = ({ icon: Icon, isHovered }) => (
  <motion.div
    animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-4 h-4" />
  </motion.div>
);

// Glow button component
const GlowButton = ({ children, onClick, to, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isGradient = variant === 'gradient';

  const Component = to ? Link : 'button';
  const props = to ? { to } : { onClick };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <AnimatePresence>
        {isHovered && isGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur-md"
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>
      <Component
        {...props}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
          isGradient
            ? 'bg-gradient-to-r from-primary to-secondary text-white'
            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
        }`}
      >
        <AnimatePresence>
          {isHovered && isGradient && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-white/20 skew-x-12"
            />
          )}
        </AnimatePresence>
        {children}
      </Component>
    </motion.div>
  );
};

// Hamburger to X morphing icon
const MenuIcon = ({ isOpen }) => (
  <motion.div className="w-6 h-6 relative flex items-center justify-center">
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -4,
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        opacity: isOpen ? 0 : 1,
        scaleX: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 4,
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const scrollProgress = useScrollProgress();

  // Scroll handling with smoother spring
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setShowProfileMenu(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  // Entrance animations
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const linkContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const actionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 },
    },
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, when: 'afterChildren' },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, when: 'beforeChildren', staggerChildren: 0.08 },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -60, scale: 0.9 },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const mobileBackdropVariants = {
    closed: { opacity: 0, backdropFilter: 'blur(0px)' },
    open: { opacity: 1, backdropFilter: 'blur(20px)' },
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Main navbar container with hide/show spring */}
        <motion.div
          animate={{
            y: isVisible ? 0 : -120,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }}
          className={`transition-all duration-500 ${
            isScrolled
              ? 'bg-dark-900/85 backdrop-blur-2xl border-b border-white/[0.06]'
              : 'bg-transparent'
          }`}
        >
          {/* Animated gradient top border */}
          <motion.div
            className="h-[2px] relative overflow-hidden"
            style={{ opacity: isScrolled ? 1 : 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${scrollProgress}%` }}
              animate={{
                boxShadow: isScrolled
                  ? [
                      '0 0 10px rgba(99,102,241,0.3)',
                      '0 0 20px rgba(139,92,246,0.5)',
                      '0 0 10px rgba(99,102,241,0.3)',
                    ]
                  : 'none',
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Trailing glow */}
            <motion.div
              className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <div className="section-padding">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Animated Logo */}
              <motion.div variants={linkItemVariants}>
                <Link to="/" className="flex items-center gap-3 group">
                  <motion.div
                    className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {/* Pulsing glow behind logo */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white relative z-10" />
                    {/* Sparkle on hover */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="w-3 h-3 text-accent" />
                    </motion.div>
                  </motion.div>
                  <div className="overflow-hidden">
                    <motion.span
                      className="text-xl lg:text-2xl font-bold gradient-text block"
                      whileHover={{ scale: 1.02 }}
                    >
                      {'TopTier'.split('').map((char, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 + 0.2, type: 'spring' }}
                          whileHover={{
                            y: -3,
                            color: '#22d3ee',
                            transition: { duration: 0.2 },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation with staggered entrance */}
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                className="hidden lg:flex items-center gap-1"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={linkItemVariants}
                    onHoverStart={() => setHoveredLink(link.path)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <MagneticLink
                      to={link.path}
                      isActive={location.pathname === link.path}
                    >
                      <AnimatedIcon
                        icon={link.icon}
                        isHovered={hoveredLink === link.path}
                      />
                      {link.label}
                    </MagneticLink>
                  </motion.div>
                ))}

                {isAdmin && (
                  <motion.div
                    variants={linkItemVariants}
                    onHoverStart={() => setHoveredLink('/dashboard')}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <MagneticLink
                      to="/dashboard"
                      isActive={location.pathname.startsWith('/dashboard')}
                    >
                      <AnimatedIcon
                        icon={LayoutDashboard}
                        isHovered={hoveredLink === '/dashboard'}
                      />
                      Dashboard
                    </MagneticLink>
                  </motion.div>
                )}
              </motion.div>

              {/* Desktop Actions with entrance animation */}
              <motion.div
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                className="hidden lg:flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/properties"
                    className="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 relative group"
                  >
                    <Search className="w-5 h-5" />
                    <motion.span
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 bg-dark-800 px-2 py-1 rounded-md whitespace-nowrap border border-white/10"
                      initial={{ opacity: 0, y: -5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      Search
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/properties"
                    className="p-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>

                <div className="w-px h-6 bg-white/10 mx-1" />

                {user ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <User className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-sm text-white/80 font-medium">{user.name}</span>
                      <motion.div
                        animate={{ rotate: showProfileMenu ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      </motion.div>
                    </motion.button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="absolute right-0 top-full mt-2 w-56 glass-card overflow-hidden z-50"
                        >
                          <div className="p-3 border-b border-white/5">
                            <p className="text-white font-medium text-sm">{user.name}</p>
                            <p className="text-white/40 text-xs">{user.email}</p>
                          </div>
                          {isAdmin && (
                            <Link
                              to="/dashboard"
                              className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                          )}
                          <motion.button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all w-full"
                            whileHover={{ x: 4 }}
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <GlowButton to="/login" variant="gradient">
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <LogIn className="w-4 h-4" />
                    </motion.div>
                    Login
                  </GlowButton>
                )}
              </motion.div>

              {/* Mobile Menu Button with morphing animation */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: isMobileMenuOpen ? 90 : 0 }}
                whileTap={{ scale: 0.9 }}
              >
                <MenuIcon isOpen={isMobileMenuOpen} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu with dramatic entrance */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop with animated gradient */}
            <motion.div
              variants={mobileBackdropVariants}
              className="absolute inset-0 bg-dark-900/90"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Decorative orbs */}
            <motion.div
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-secondary/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />

            {/* Menu content */}
            <div className="relative h-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Logo in menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">TopTier</span>
              </motion.div>

              {/* Nav Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2 rounded-xl ${
                          location.pathname === link.path
                            ? 'bg-primary/20 text-primary'
                            : 'bg-white/5'
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.div>
                      {link.label}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="mobile-active-indicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {isAdmin && (
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                        location.pathname.startsWith('/dashboard')
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2 rounded-xl ${
                          location.pathname.startsWith('/dashboard')
                            ? 'bg-primary/20 text-primary'
                            : 'bg-white/5'
                        }`}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                      </motion.div>
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pt-8 border-t border-white/10"
              >
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-5 py-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/40 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all w-full border border-red-500/10"
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-lg font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                    >
                      <LogIn className="w-5 h-5" />
                      Login
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

