import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../services/api";

function Trending() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then((res) => {
      setMovies(res.data.results);
    });
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-black">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-10">

        <h1 className="text-white text-3xl font-bold mb-8">
          Trending Movies
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      </div>

    </div>
  );
}

export default Trending;