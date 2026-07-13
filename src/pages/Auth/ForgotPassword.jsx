import { motion } from 'framer-motion';

const ForgotPassword = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
    </motion.div>
  );
};

export default ForgotPassword;
