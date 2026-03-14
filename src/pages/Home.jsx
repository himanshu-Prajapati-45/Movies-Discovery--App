import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {

  const [movies, setMovies] = useState([]);

  // Fetch popular movies on page load
  useEffect(() => {
  getPopularMovies().then((res) => {
    console.log(res.data.results);
    setMovies(res.data.results);
  });
}, []);

  // 🔎 SEARCH FUNCTION (paste here)
  const handleSearch = (query) => {

    if (query === "") {
      getPopularMovies().then((res) => {
        setMovies(res.data.results);
      });
    } else {
      searchMovies(query).then((res) => {
        setMovies(res.data.results);
      });
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">

      
      <Navbar onSearch={handleSearch} />

      <Hero />

      <div className="max-w-7xl mx-auto px-6 pt-4 pb-12">

        <h2 className="text-white text-3xl font-bold mb-8">
          Trending Movies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;