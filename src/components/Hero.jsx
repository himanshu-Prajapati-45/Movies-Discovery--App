import { useEffect, useState } from "react";

function Hero({ movies = [], onBrowseClick }) {
  const [backdrop, setBackdrop] = useState("");

  useEffect(() => {
    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      if (randomMovie.backdrop_path) {
        setBackdrop(
          `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
        );
      }
    }
  }, [movies]);

  return (
    <section
      className="mt-10 relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]"></div>

      {/* Top gradient fade (merge with page background) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-gray-950 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Discover Movies Like Never Before
        </h1>

        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Explore trending movies, top rated films, and hidden cinematic gems.
        </p>

        <button
          onClick={onBrowseClick}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Browse Movies
        </button>
      </div>
    </section>
  );
}

export default Hero;