import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-black"
    >
      <Navbar onSearch={() => {}} />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-500">
              {wishlist.length} {wishlist.length === 1 ? 'movie' : 'movies'} saved to your list
            </p>
          </div>
          
          <Link 
            to="/" 
            className="w-fit bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-full border border-white/10 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Browse More
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm mb-8">
              Start adding your favorite movies by clicking the heart icon on any movie card.
            </p>
            <Link 
              to="/" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/20"
            >
              Discover Movies
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {wishlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Wishlist;
