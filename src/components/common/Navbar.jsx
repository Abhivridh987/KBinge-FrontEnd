import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BiSearch, BiUser, BiLogOut } from 'react-icons/bi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-3xl font-bold text-primary tracking-tighter">
              KBINGE
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-text-secondary">
              <Link to="/home" className="hover:text-white transition-colors">Home</Link>
              <Link to="/genres" className="hover:text-white transition-colors">Genres</Link>
              <Link to="/filter" className="hover:text-white transition-colors">Filter</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <form onSubmit={handleSearchSubmit} className={`transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-48 md:w-64 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, genres..."
                  className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 px-4 text-sm text-white focus:outline-none focus:border-primary placeholder:text-white/50"
                  autoFocus={isSearchOpen}
                />
              </form>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-primary transition-colors z-10"
              >
                <BiSearch size={24} />
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-sm hover:text-white transition-colors text-text-secondary">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                    {user?.profilePic && user?.profilePic !== 'default.webp' ? (
                      <img src={`/auth/upload/${user.profilePic}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <BiUser size={20} className="text-white" />
                    )}
                  </div>
                  <span>{user.username}</span>
                </Link>
                <button onClick={logout} className="text-text-secondary hover:text-primary transition-colors">
                  <BiLogOut size={24} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6 text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
