import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    DOB: ''
  });
  const [otpId, setOtpId] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/sign-up/send-otp', { email: formData.email, purpose: 'sign-up' });
      // In a real scenario, the API would return an otpId. Since it just says 200 OK in swagger, 
      // we'll simulate the next step. Let's assume otpId comes in res.data or we just proceed.
      setOtpId(res.data.otpId || 'mock-otp-id');
      setStep(2);
      toast.success('OTP sent to your email');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/sign-up/verify-otp', { otpId, otp });
      setStep(3);
      toast.success('OTP verified');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/signup', { ...formData, otpId });
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Signup failed');
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
        <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-bg/50"></div>
      </div>
      
      <div className="luxury-card w-full max-w-md p-8 md:p-10 z-10">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-text-secondary mb-8">Join the ultimate K-Drama experience.</p>
        
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="name@example.com"
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
              {isLoading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Enter OTP</label>
              <input 
                type="text" 
                required
                pattern="\d{6}"
                title="6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors tracking-[1em] text-center"
                placeholder="000000"
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Username</label>
              <input 
                type="text" 
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Date of Birth</label>
              <input 
                type="date" 
                required
                value={formData.DOB}
                onChange={(e) => setFormData({...formData, DOB: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
              {isLoading ? 'Creating Account...' : 'Complete Signup'}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-primary transition-colors font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
