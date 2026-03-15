function Hero({ onBrowseClick }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center px-6">
      <div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Discover Movies Like Never Before
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
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