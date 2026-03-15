import { Link } from "react-router-dom";
function MovieCard({ movie }) {

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`}>
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg 
hover:scale-105 hover:shadow-[0_0_20px_rgba(225,225,225,0.3)] 
transition-all duration-300 cursor-pointer">

      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-[360px] object-cover"
      />

      <div className="p-4">

        <h2 className="text-white text-lg font-semibold">
          {movie.title}
        </h2>

        <p className="text-yellow-400 text-sm">
          ⭐ {movie.vote_average}
        </p>

      </div>

    </div>
    </Link>
  );
}

export default MovieCard;