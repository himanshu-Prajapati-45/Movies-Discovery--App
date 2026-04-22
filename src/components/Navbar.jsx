import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar({ onSearch }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending' },
    { name: 'Top Rated', path: '/toprated' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent tracking-tight cursor-pointer"
          >
            MovieVerse
          </motion.h1>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-64 group">
          <input
            id="movie-search"
            type="text"
            placeholder="Search movies..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
          />
          <span className="absolute left-3.5 top-2.5 text-gray-500 group-focus-within:text-red-500 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;