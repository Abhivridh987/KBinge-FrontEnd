import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { BiArrowBack } from 'react-icons/bi';
import api from '../services/api';
import toast from 'react-hot-toast';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/home/movies/${id}`);
        setMovie(res.data.movie || res.data);
      } catch (error) {
        toast.error('Failed to load video');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>;
  if (!movie) return <div className="h-screen flex items-center justify-center">Video not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black text-white"
    >
      {/* Top Bar overlay */}
      <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors bg-white/10 p-2 rounded-full">
          <BiArrowBack size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold">{movie.Name}</h2>
          <p className="text-sm text-text-secondary">Episode {movie.Episode || '1'} • {movie['Content Rating']}</p>
        </div>
      </div>
      
      {/* Player */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Mocking video URL since schema only provides img url */}
        <ReactPlayer
          url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
          width="100%"
          height="100%"
          controls
          playing
          light={movie['img url']} // Shows poster before playing
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
      </div>
    </motion.div>
  );
};

export default Player;
