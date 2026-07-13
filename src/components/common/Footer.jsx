import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bg-secondary border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold text-primary tracking-tighter mb-4">KBINGE</h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Your premium destination for the finest K-Dramas. Experience cinematic quality streaming with a luxurious interface.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/movies" className="hover:text-white transition-colors">Movies</Link></li>
              <li><Link to="/genres" className="hover:text-white transition-colors">Genres</Link></li>
              <li><Link to="/top-picks" className="hover:text-white transition-colors">Top Picks</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-text-secondary text-xs pt-8 border-t border-white/10">
          &copy; {new Date().getFullYear()} KBinge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
