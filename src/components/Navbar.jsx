import {Link} from 'react-router-dom';
function Navbar({ onSearch }) {

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg shadow-black/30">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500 tracking-wide cursor-pointer hover:text-red-400 transition duration-300">
          MovieVerse
        </h1>


        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-200 font-medium">

          <Link to = "/" className="hover:text-red-500 transition duration-200">
            Home
          </Link>

          <Link to="/trending" className="hover:text-red-500 transition duration-200">
            Trending
          </Link>

          <Link to="/toprated" className="hover:text-red-500 transition duration-200">
            Top Rated
          </Link>

        </div>


        {/* Search */}
        <div className="relative w-56">

          <input
            id="movie-search"
            type="text"
            placeholder="Search movies..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <span className="absolute left-3 top-2.5 text-gray-300">
            🔍
          </span>

        </div>

      </div>

    </nav>
  );

}

export default Navbar;