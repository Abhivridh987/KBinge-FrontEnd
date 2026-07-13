import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { BiUser, BiEdit, BiHeart, BiHistory, BiCamera } from 'react-icons/bi';
import api from '../services/api';
import toast from 'react-hot-toast';
import MovieCard from '../components/common/MovieCard';

const Profile = () => {
  const { user, fetchUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      if (activeTab === 'watchlist') {
        try {
          setLoadingWatchlist(true);
          const { data } = await api.get('/auth/watchlist');
          const movieIds = data.watchlist || [];
          
          const moviePromises = movieIds.map(id => api.get(`/home/movies/${id}`));
          const movieResponses = await Promise.all(moviePromises);
          
          const movies = movieResponses.map(res => res.data.movie).filter(Boolean);
          setWatchlistMovies(movies);
        } catch (error) {
          console.error('Error fetching watchlist:', error);
          toast.error('Failed to load watchlist');
        } finally {
          setLoadingWatchlist(false);
        }
      }
    };

    fetchWatchlistMovies();
  }, [activeTab]);

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('profilePic', file);
    
    try {
      await api.post('/auth/change-profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Profile picture updated');
      fetchUser();
    } catch (error) {
      toast.error('Failed to update profile picture');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/change-password', passwords);
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="luxury-card p-6 text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={user?.profilePic && user?.profilePic !== 'default.webp' ? `/auth/upload/${user.profilePic}` : '/default-avatar.png'} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white/10 mx-auto"
              />
              <label className="absolute bottom-0 right-0 bg-primary hover:bg-accent text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                <BiCamera size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicUpload} />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
            <p className="text-sm text-text-secondary mb-6">{user?.email}</p>
            
            <div className="flex flex-col gap-2 text-left">
              <button 
                onClick={() => setActiveTab('watchlist')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'watchlist' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 text-text-secondary'}`}
              >
                <BiHeart size={20} /> Watchlist
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 text-text-secondary'}`}
              >
                <BiUser size={20} /> Account Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="luxury-card p-8 min-h-[500px]">
            {activeTab === 'watchlist' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Watchlist</h3>
                {loadingWatchlist ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : watchlistMovies.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchlistMovies.map(movie => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-text-secondary">
                    <BiHeart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>You haven't added any movies to your watchlist yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Account Settings</h3>
                
                <div className="mb-8 space-y-4">
                  <div>
                    <label className="text-sm text-text-secondary">Username</label>
                    <p className="text-lg text-white">{user?.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary">Email</label>
                    <p className="text-lg text-white">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary">Date of Birth</label>
                    <p className="text-lg text-white">{user?.DOB ? new Date(user.DOB).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                
                {isChangingPassword ? (
                  <form onSubmit={handlePasswordChange} className="space-y-4 bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-white mb-2">Change Password</h4>
                    <input 
                      type="password" 
                      placeholder="Old Password"
                      required
                      value={passwords.oldPassword}
                      onChange={e => setPasswords({...passwords, oldPassword: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                    />
                    <input 
                      type="password" 
                      placeholder="New Password"
                      required
                      value={passwords.newPassword}
                      onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-primary hover:bg-accent text-white px-4 py-2 rounded text-sm transition-colors">Save</button>
                      <button type="button" onClick={() => setIsChangingPassword(false)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button onClick={() => setIsChangingPassword(true)} className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
                    <BiEdit /> Change Password
                  </button>
                )}
                
                <div className="mt-12 pt-6 border-t border-red-500/20">
                  <button onClick={logout} className="text-red-500 hover:text-red-400 font-medium transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
