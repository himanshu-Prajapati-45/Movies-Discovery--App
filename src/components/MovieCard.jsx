import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MovieCard({ movie }) {
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
        className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer h-full"
      >
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