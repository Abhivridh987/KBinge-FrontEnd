import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent z-10"></div>
        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover opacity-30" />
      </div>
      
      <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          Premium K-Drama.<br/><span className="text-primary">Without Limits.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl"
        >
          Experience the most luxurious way to stream your favorite Korean dramas. Cinematic quality, exclusive features, and a breathtaking interface.
        </motion.p>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/signup" className="btn-primary text-lg px-10 py-4">
            Start Watching Now
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-10 py-4">
            Sign In
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
