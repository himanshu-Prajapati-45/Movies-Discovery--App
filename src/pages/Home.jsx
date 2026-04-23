import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { MovieGridSkeleton } from "../components/Skeleton";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // pagination edit state
  const [editingPage, setEditingPage] = useState(false);
  const [pageInput, setPageInput] = useState(page);

  // focus search bar from hero button
  const focusSearch = () => {
    const input = document.getElementById("movie-search");
    if (input) {
      input.focus();
    }
  };

  // Smooth scroll function
  const smoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch movies
  useEffect(() => {
    setLoading(true);
    smoothScrollToTop();

    const fetchData = async () => {
      try {
        const res = query === "" 
          ? await getPopularMovies(page)
          : await searchMovies(query);
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, query]);

  // Search handler
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-black"
    >
      <Navbar onSearch={handleSearch} />

      {query === "" && (
        <Hero onBrowseClick={focusSearch} />
      )}


      <div id="movies-section" className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl font-bold tracking-tight">
            {query === "" ? "Trending Movies" : `Results for "${query}"`}
          </h2>
          {query !== "" && (
            <button 
              onClick={() => handleSearch("")}
              className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MovieGridSkeleton count={12} />
            </motion.div>
          ) : movies.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {movies
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
              <p className="text-gray-500 max-w-xs">
                We couldn't find any movies matching "{query}". Try searching for something else.
              </p>
              <button 
                onClick={() => handleSearch("")}
                className="mt-6 text-red-500 hover:text-red-400 font-medium transition-colors"
              >
                Clear search and browse trending
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Pagination */}
        {!loading && movies.length > 0 && (
          <div className="flex justify-center items-center gap-8 mt-16 pb-12">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-white/5 text-white px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            <div className="text-white text-lg font-medium flex items-center gap-2">
              <span className="text-gray-500">Page</span>
              {editingPage ? (
                <input
                  type="number"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onBlur={() => setEditingPage(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(pageInput);
                      if (value > 0 && value <= 500) {
                        setPage(value);
                      }
                      setEditingPage(false);
                    }
                  }}
                  className="w-16 text-center bg-white/10 border border-white/20 rounded-lg outline-none focus:border-red-500/50"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => {
                    setEditingPage(true);
                    setPageInput(page);
                  }}
                  className="cursor-pointer hover:text-red-500 transition-colors underline underline-offset-4 decoration-white/20"
                >
                  {page}
                </span>
              )}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              className="bg-white/5 text-white px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;