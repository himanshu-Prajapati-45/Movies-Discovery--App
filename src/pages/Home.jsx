import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // const searchRef = useRef(null);



  // focus search bar from hero button
  const focusSearch = () => {
  const input = document.getElementById("movie-search");
  if (input) {
    input.focus();
  }
};



  // Smooth scroll function
  const smoothScrollToTop = () => {

    const duration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    const scroll = (currentTime) => {

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }

    };

    requestAnimationFrame(scroll);

  };



  // Fetch movies
  useEffect(() => {

    smoothScrollToTop();

    if (query === "") {

      getPopularMovies(page).then((res) => {
        setMovies(res.data.results);
      });

    } else {

      searchMovies(query).then((res) => {
        setMovies(res.data.results);
      });

    }

  }, [page, query]);



  // Search handler
  const handleSearch = (searchQuery) => {

    setQuery(searchQuery);
    setPage(1);

  };



  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black via-gray-950 to-black">

      <Navbar onSearch={handleSearch} />

      <Hero onBrowseClick={focusSearch} />

      <div
        id="movies-section"
        className="max-w-7xl mx-auto px-6 pt-4 pb-12"
      >

        <h2 className="text-white text-3xl font-bold mb-8">
          Trending Movies
        </h2>



        {/* Movie Grid */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        </div>



        {/* Pagination */}

        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-40"
          >
            Prev
          </button>


          {[...Array(8)].map((_, i) => {

            const pageNumber = i + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-2 rounded ${
                  page === pageNumber
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );

          })}


          <button
            onClick={() => setPage(page + 1)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;