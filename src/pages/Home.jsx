import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMovie } from '../contexts/MovieContext';
import HeroBanner from '../components/common/HeroBanner';
import MovieRow from '../components/common/MovieRow';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const Home = () => {
  const { movies, topPicks, loading, fetchMovies, fetchTopPicks } = useMovie();

  useEffect(() => {
    // If not fetched, contexts will handle on mount, but we can trigger refresh
    if (movies.length === 0) fetchMovies();
    if (topPicks.length === 0) fetchTopPicks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingSkeleton type="banner" />
        <div className="px-4 md:px-8 flex gap-4 overflow-hidden">
          {[1,2,3,4,5].map(i => <div key={i} className="w-1/5 shrink-0"><LoadingSkeleton /></div>)}
        </div>
      </div>
    );
  }

  // Use the first top pick or a random movie as hero
  const heroMovie = topPicks.length > 0 ? topPicks[0] : movies[0];

  // Group movies by genre just to show rows
  const actionMovies = movies.filter(m => m.Genre && m.Genre.toLowerCase().includes('action'));
  const romanceMovies = movies.filter(m => m.Genre && m.Genre.toLowerCase().includes('romance'));
  const thrillerMovies = movies.filter(m => m.Genre && m.Genre.toLowerCase().includes('thriller'));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <HeroBanner movie={heroMovie} />
      
      <div className="relative -mt-32 z-20 space-y-8">
        <MovieRow title="Top Picks For You" movies={topPicks} />
        <MovieRow title="Trending Now" movies={movies.slice(0, 10)} />
        {actionMovies.length > 0 && <MovieRow title="Action Packed" movies={actionMovies} />}
        {romanceMovies.length > 0 && <MovieRow title="Heartwarming Romance" movies={romanceMovies} />}
        {thrillerMovies.length > 0 && <MovieRow title="Mind-Bending Thrillers" movies={thrillerMovies} />}
        <MovieRow title="Latest Additions" movies={movies.slice(10, 20)} />
      </div>
    </motion.div>
  );
};

export default Home;
