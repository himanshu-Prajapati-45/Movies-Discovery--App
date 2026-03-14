function MovieCard() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer">

      <img
        src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        alt="movie"
        className="w-full h-[350px] object-cover"
      />

      <div className="p-1">

        <h2 className="text-white text-lg font-semibold">
          Interstellar
        </h2>

        <p className="text-gray-400 text-sm">
          ⭐ 8.6
        </p>

      </div>

    </div>
  );
}

export default MovieCard;