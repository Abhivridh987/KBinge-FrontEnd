import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpId, setOtpId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const res = await api.post('/auth/forgot-password/send-otp', { email, purpose: 'forgot-password' });
      setOtpId(res.data.otpId);
      toast.success('OTP sent to your email');
      setStep('otp');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    
    setIsLoading(true);
    try {
      await api.post('/auth/forgot-password/verify-otp', { otpId, otp });
      toast.success('OTP verified successfully');
      setStep('password');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) return;
    
    setIsLoading(true);
    try {
      await api.put('/auth/forgot-password/reset', { otpId, password, email });
      toast.success('Password reset successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      const joiErr = error.response?.data?.error?.details?.[0]?.message;
      toast.error(joiErr || error.response?.data?.message || 'Failed to reset password');
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
        <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-text-secondary mb-8">
          {step === 'email' && 'Enter your email to receive an OTP.'}
          {step === 'otp' && 'Enter the 6-digit OTP sent to your email.'}
          {step === 'password' && 'Enter your new password.'}
        </p>
        
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.form 
              key="email-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp} 
              className="space-y-6"
            >
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
              <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </motion.form>
          )}

          {step === 'otp' && (
            <motion.form 
              key="otp-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerifyOtp} 
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">6-Digit OTP</label>
                <input 
                  type="text" 
                  required
                  pattern="\d{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors tracking-widest text-center text-lg"
                  placeholder="000000"
                />
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button type="button" onClick={() => setStep('email')} className="w-full text-sm text-text-secondary hover:text-white mt-4 transition-colors">
                Back to Email
              </button>
            </motion.form>
          )}

          {step === 'password' && (
            <motion.form 
              key="password-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleResetPassword} 
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">New Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        
        <div className="mt-8 text-center text-text-secondary">
          Remember your password?{' '}
          <Link to="/login" className="text-white hover:text-primary transition-colors font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
