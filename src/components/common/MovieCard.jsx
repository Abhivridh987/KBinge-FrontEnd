import { Link } from 'react-router-dom';
import { BiPlay, BiInfoCircle } from 'react-icons/bi';

const MovieCard = ({ movie }) => {
  return (
    <div className="luxury-card relative group w-full h-[300px] md:h-[400px]">
      <img 
        src={movie['img url'] || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80'} 
        alt={movie.Name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white mb-2">{movie.Name}</h3>
          
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
            <span className="border border-white/20 px-1 rounded">{movie['Content Rating']}</span>
            <span>{movie.Year}</span>
            <span className="text-primary font-bold">{movie.Score} ★</span>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/player/${movie._id}`} className="bg-primary hover:bg-accent text-white p-2 rounded-full transition-colors flex-1 flex justify-center items-center">
              <BiPlay size={24} />
            </Link>
            <Link to={`/movie/${movie._id}`} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
              <BiInfoCircle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
