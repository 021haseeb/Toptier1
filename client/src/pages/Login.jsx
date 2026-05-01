import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, ArrowLeft, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back, Admin!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back to home */}
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">TopTier</span>
          </div>

          {/* Login Card */}
          <div className="glass-card p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h1>
            <p className="text-white/60 text-center text-sm mb-8">Sign in to access the admin dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@toptier.com"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" /> Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-6">
              Default: admin@toptier.com / Toptier123!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

