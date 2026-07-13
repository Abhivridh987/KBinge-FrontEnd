import { Link } from 'react-router-dom';
import { BiPlay, BiInfoCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] mb-12">
      <div className="absolute inset-0">
        <img 
          src={movie['img url'] || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80'} 
          alt={movie.Name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent w-full md:w-2/3"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Featured</span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">{movie['Content Rating']}</span>
            <span className="text-text-secondary text-sm">{movie.Year}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">{movie.Name}</h1>
          
          <p className="text-lg text-text-secondary mb-8 line-clamp-3 md:line-clamp-4 max-w-xl">
            {movie.Sinopsis}
          </p>
          
          <div className="flex gap-4">
            <Link to={`/player/${movie._id}`} className="btn-primary">
              <BiPlay size={24} />
              <span>Watch Now</span>
            </Link>
            <Link to={`/movie/${movie._id}`} className="btn-secondary">
              <BiInfoCircle size={24} />
              <span>More Info</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
