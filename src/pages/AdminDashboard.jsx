import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiTrash, BiEdit, BiPlus } from 'react-icons/bi';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  
  const initialFormState = {
    Name: '', Year: '', Genre: '', 'Main Cast': '', Sinopsis: '', 
    Score: '', 'Content Rating': '', Tags: '', Network: '', 
    'img url': '', Episode: '1', topPicks: false
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await api.get('/home/movies');
      setMovies(res.data.movies || []);
    } catch (err) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await api.delete('/admin/movies/delete', { data: { id } });
      toast.success('Movie deleted');
      fetchMovies();
    } catch (err) {
      toast.error('Failed to delete movie');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData(movie);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingMovie(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Data type conversions for Swagger schema
      const payload = {
        ...formData,
        Year: parseInt(formData.Year),
        Score: parseFloat(formData.Score)
      };

      if (editingMovie) {
        // Schema for update requires 'id'
        await api.put('/admin/movies/update', { ...payload, id: editingMovie._id });
        toast.success('Movie updated');
      } else {
        await api.post('/admin/movies/add', payload);
        toast.success('Movie added');
      }
      setIsModalOpen(false);
      fetchMovies();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button onClick={handleAddNew} className="btn-primary py-2 px-4 text-sm">
          <BiPlus size={20} /> Add New Movie
        </button>
      </div>
      
      <div className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-text-secondary text-sm">
                <th className="p-4 font-medium">Movie Name</th>
                <th className="p-4 font-medium">Year</th>
                <th className="p-4 font-medium">Score</th>
                <th className="p-4 font-medium">Top Pick</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-text-secondary">Loading...</td></tr>
              ) : movies.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-text-secondary">No movies found.</td></tr>
              ) : (
                movies.map(movie => (
                  <tr key={movie._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={movie['img url'] || '/default.png'} className="w-10 h-10 rounded object-cover" />
                      <span className="font-medium text-white">{movie.Name}</span>
                    </td>
                    <td className="p-4 text-text-secondary">{movie.Year}</td>
                    <td className="p-4 text-text-secondary">{movie.Score}</td>
                    <td className="p-4 text-text-secondary">{movie.topPicks ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(movie)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                          <BiEdit size={18} />
                        </button>
                        <button onClick={() => handleDelete(movie._id)} className="p-2 text-primary hover:bg-primary/10 rounded transition-colors">
                          <BiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Name</label>
                  <input required value={formData.Name} onChange={e => setFormData({...formData, Name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Year</label>
                  <input type="number" required value={formData.Year} onChange={e => setFormData({...formData, Year: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Genre</label>
                  <input required value={formData.Genre} onChange={e => setFormData({...formData, Genre: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Score</label>
                  <input type="number" step="0.1" required value={formData.Score} onChange={e => setFormData({...formData, Score: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Content Rating</label>
                  <input value={formData['Content Rating']} onChange={e => setFormData({...formData, 'Content Rating': e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Image URL</label>
                  <input value={formData['img url']} onChange={e => setFormData({...formData, 'img url': e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">Synopsis</label>
                <textarea rows="3" value={formData.Sinopsis} onChange={e => setFormData({...formData, Sinopsis: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white"></textarea>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" checked={formData.topPicks} onChange={e => setFormData({...formData, topPicks: e.target.checked})} className="accent-primary" id="topPicks" />
                <label htmlFor="topPicks" className="text-sm">Mark as Top Pick</label>
              </div>
              
              <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2 px-6">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6">Save Movie</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
