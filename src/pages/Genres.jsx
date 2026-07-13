import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import MovieCard from '../components/common/MovieCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const ALL_GENRES = [
  'Comedy', 'Romance', 'Historical', 'Drama', 'Youth', 'Sci-Fi', 'Life', 
  'Fantasy', 'Family', 'Sitcom', 'Action', 'Thriller', 'Mystery', 'Crime', 
  'Music', 'Melodrama', 'Supernatural', 'Psychological', 'Medical', 'Horror', 
  'Adventure', 'Business', 'Law', 'Documentary', 'Political', 'Food', 'Sports', 
  'Military', 'War', 'Martial Arts', 'Mature'
];

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState(ALL_GENRES[0]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/home/movies/genres?genre=${encodeURIComponent(selectedGenre)}`);
        setMovies(res.data.movies || []);
      } catch (error) {
        console.error('Failed to fetch genre movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-6">Explore Genres</h1>
        
        {/* Genre Tabs */}
        <div className="flex flex-wrap gap-3">
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 luxury-card"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-2">No movies found</h2>
          <p className="text-text-secondary">
            We couldn't find any movies for the "{selectedGenre}" genre.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Genres;
