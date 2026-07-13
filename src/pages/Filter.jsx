import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import MovieCard from '../components/common/MovieCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { BiFilterAlt } from 'react-icons/bi';

const Filter = () => {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minScore: '',
    maxScore: '',
    contentRating: '',
    network: '',
    tags: '',
    topPicks: false
  });
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Build query string, omitting empty fields
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== false) {
          queryParams.append(key, value);
        }
      });
      
      const res = await api.get(`/home/movies/filter?${queryParams.toString()}`);
      setMovies(res.data.movies || []);
    } catch (error) {
      console.error('Failed to fetch filtered movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-28 shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
            <BiFilterAlt className="text-primary" />
            <h2>Advanced Filter</h2>
          </div>
          
          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Genres (comma separated)</label>
              <input 
                type="text" 
                name="genre"
                value={filters.genre}
                onChange={handleInputChange}
                placeholder="e.g. Action, Romance"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Release Year</label>
              <input 
                type="number" 
                name="year"
                value={filters.year}
                onChange={handleInputChange}
                placeholder="e.g. 2023"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-text-secondary mb-1">Min Score</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="10"
                  name="minScore"
                  value={filters.minScore}
                  onChange={handleInputChange}
                  placeholder="0.0"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-text-secondary mb-1">Max Score</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="10"
                  name="maxScore"
                  value={filters.maxScore}
                  onChange={handleInputChange}
                  placeholder="10.0"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Content Rating</label>
              <input 
                type="text" 
                name="contentRating"
                value={filters.contentRating}
                onChange={handleInputChange}
                placeholder="e.g. 15+, 18+"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Network/Platform</label>
              <input 
                type="text" 
                name="network"
                value={filters.network}
                onChange={handleInputChange}
                placeholder="e.g. Netflix, tvN"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Tags</label>
              <input 
                type="text" 
                name="tags"
                value={filters.tags}
                onChange={handleInputChange}
                placeholder="e.g. Revenge, Healing"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="topPicks"
                name="topPicks"
                checked={filters.topPicks}
                onChange={handleInputChange}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-white/20 bg-white/5"
              />
              <label htmlFor="topPicks" className="text-sm font-medium text-text-secondary cursor-pointer">
                Top Picks Only
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary py-2.5 rounded-lg mt-4 font-semibold shadow-lg hover:shadow-primary/20 transition-all"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        {!hasSearched ? (
          <div className="h-full flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <BiFilterAlt className="text-6xl text-white/10 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Refine Your Search</h2>
              <p className="text-text-secondary">Use the advanced filter panel to find your perfect movie.</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 shadow-xl"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No matching movies</h2>
            <p className="text-text-secondary px-6">
              We couldn't find any movies that match all your applied filters. Try broadening your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Filter;
