import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({ email, password });
      toast.success('Welcome back to KBinge!');
      navigate('/home');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-bg/50"></div>
      </div>
      
      <div className="luxury-card w-full max-w-md p-8 md:p-10 z-10">
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-text-secondary mb-8">Enter your details to continue streaming.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary hover:text-accent transition-colors">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-text-secondary">
          New to KBinge?{' '}
          <Link to="/signup" className="text-white hover:text-primary transition-colors font-medium">
            Sign up now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
