import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

function MovieCard({ movie }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(movie.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (isFavorite) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)"
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer h-full group"
      >
        {/* Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all duration-300 group-hover:opacity-100"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "#ef4444" : "none"} 
            stroke={isFavorite ? "#ef4444" : "currentColor"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${!isFavorite && 'text-white'}`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />

        <div className="p-4">
          <h2 className="text-white text-lg font-semibold line-clamp-1">
            {movie.title}
          </h2>

          <div className="flex justify-between items-center mt-2">
            <p className="text-yellow-400 text-sm font-medium flex items-center gap-1">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>
            <p className="text-gray-500 text-xs">
              {movie.release_date?.split("-")[0]}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;
