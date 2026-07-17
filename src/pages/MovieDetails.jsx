import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiPlay, BiArrowBack, BiPlus } from 'react-icons/bi';
import api from '../services/api';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useMovie } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import MovieRow from '../components/common/MovieRow';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendedNames, setRecommendedNames] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { movies } = useMovie();
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [movieRes, commentsRes] = await Promise.all([
          api.get(`/home/movies/${id}`),
          api.get(`/comments/comments/${id}`).catch(() => ({ data: [] })) // catch if 404
        ]);
        // Adjust according to schema response
        setMovie(movieRes.data.movie || movieRes.data);
        setComments(commentsRes.data.comments || commentsRes.data || []);
      } catch (error) {
        toast.error('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchRecs = async () => {
      if (!movie) return;
      try {
        const res = await fetch(`https://kbinge-recommendation.onrender.com/kbinge/recommend/${encodeURIComponent(movie.Name)}`);
        const data = await res.json();
        if (data.ok && data.data) {
          setRecommendedNames(Object.keys(data.data));
        }
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      }
    };
    fetchRecs();
  }, [movie]);

  useEffect(() => {
    if (recommendedNames.length > 0 && movies.length > 0) {
      const recMovies = recommendedNames.map(name => movies.find(m => m.Name === name)).filter(Boolean);
      setRecommendedMovies(recMovies);
    }
  }, [recommendedNames, movies]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      await api.post('/comments/add-comment', { movie: id, comment: newComment });
      toast.success('Comment added!');
      setNewComment('');
      // Reload comments
      const commentsRes = await api.get(`/comments/comments/${id}`);
      setComments(commentsRes.data.comments || commentsRes.data || []);
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const isWatchlisted = user?.favorites?.includes(id);

  const handleWatchlistToggle = async () => {
    if (!user) {
      toast.error('Please login to add to watchlist');
      return;
    }
    
    try {
      if (isWatchlisted) {
        await api.delete('/auth/remove-from-watchlist', { data: { movieId: id } });
        toast.success('Removed from watchlist');
      } else {
        await api.post('/auth/add-to-watchlist', { movieId: id });
        toast.success('Added to watchlist');
      }
      await fetchUser();
    } catch (error) {
      toast.error('Failed to update watchlist');
    }
  };

  if (loading) return <LoadingSkeleton type="banner" />;
  if (!movie) return <div className="p-8 text-center mt-20">Movie not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={movie['img url'] || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80'} 
            alt={movie.Name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent"></div>
        </div>
        
        <div className="absolute top-8 left-8 z-20">
          <Link to="/home" className="flex items-center gap-2 text-white hover:text-primary transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
            <BiArrowBack /> Back
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 flex flex-col md:flex-row gap-12">
        {/* Poster & Actions */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="luxury-card overflow-hidden rounded-xl hidden md:block mb-6 shadow-2xl shadow-primary/20">
            <img 
              src={movie['img url'] || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80'} 
              alt={movie.Name} 
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <Link to={`/player/${movie._id}`} className="btn-primary w-full shadow-lg shadow-primary/30">
              <BiPlay size={24} /> Play Now
            </Link>
            <button 
              onClick={handleWatchlistToggle}
              className={`${isWatchlisted ? 'bg-white/10 text-white hover:bg-white/20' : 'btn-secondary'} w-full transition-colors flex items-center justify-center gap-2 py-3 rounded-lg font-medium`}
            >
              <BiPlus size={24} className={isWatchlisted ? 'transform rotate-45 transition-transform' : 'transition-transform'} /> 
              {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
        
        {/* Details & Comments */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.Name}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-8">
            <span className="border border-white/20 px-2 py-1 rounded text-white">{movie['Content Rating']}</span>
            <span>{movie.Year}</span>
            <span className="text-primary font-bold text-lg">{movie.Score} ★</span>
            {movie.Network && <span className="bg-white/10 px-3 py-1 rounded-full">{movie.Network}</span>}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
            <p className="text-text-secondary leading-relaxed">{movie.Sinopsis}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t border-white/10 pt-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
              <p className="text-text-secondary">{movie['Main Cast']}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Genres & Tags</h3>
              <p className="text-text-secondary mb-2">{movie.Genre}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.Tags?.split(',').map((tag, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 text-xs px-2 py-1 rounded-full text-text-secondary">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6">Comments</h3>
            
            <form onSubmit={handleAddComment} className="mb-8 flex gap-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Post
              </button>
            </form>
            
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-text-secondary italic">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-primary">{comment.user?.username || 'User'}</span>
                      <span className="text-xs text-text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-text-secondary">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendedMovies.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10">
          <MovieRow title="More Like This" movies={recommendedMovies} />
        </div>
      )}
    </motion.div>
  );
};

export default MovieDetails;
