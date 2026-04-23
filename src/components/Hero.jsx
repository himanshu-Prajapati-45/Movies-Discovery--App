import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTrendingMovies, getTopRatedMovies } from "../services/api";

function Hero({ onBrowseClick }) {
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        // Fetch from multiple sources to get a huge variety
        const [trending, topRated] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies()
        ]);

        const allMovies = [
          ...trending.data.results,
          ...topRated.data.results
        ].filter(m => m.backdrop_path);

        // Pick a truly random movie from the combined pool of 40+ movies
        const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
        setCurrentMovie(randomMovie);
      } catch (err) {
        console.error("Failed to fetch hero images:", err);
      }
    };

    fetchHeroMovies();
  }, []);

  if (!currentMovie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={backdrop}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
      </AnimatePresence>

      {/* Gradients for depth and sharpness */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-1" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter">
            Discover Movies <br />
            <span className="text-gradient">Like Never Before</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore trending blockbusters, top-rated classics, and hidden cinematic gems 
            from around the world.
          </p>

          <div className="flex justify-center">
            <button
              onClick={onBrowseClick}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-600/20 active:scale-95"
            >
              Browse Movies
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </motion.div>
    </section>
  );
}

export default Hero;
