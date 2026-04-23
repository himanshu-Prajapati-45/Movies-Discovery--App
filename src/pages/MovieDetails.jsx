import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies } from "../services/api";
import TrailerModal from "../components/TrailerModal";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id)
    ]).then(([detailsRes, creditsRes, videosRes]) => {
      setMovie(detailsRes.data);
      setCast(creditsRes.data.cast.slice(0, 10));
      
      const directorData = creditsRes.data.crew.find(
        (person) => person.job === "Director"
      );
      setDirector(directorData);

      // Find first trailer
      const trailer = videosRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer?.key || videosRes.data.results[0]?.key);
    })
.catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white pb-20"
    >
      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoKey={trailerKey} 
      />

      {/* Hero Backdrop */}
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={backdrop}
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <motion.img
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              src={poster}
              className="hidden md:block w-64 rounded-2xl shadow-2xl border border-white/10"
              alt={movie.title}
            />
            <div className="flex-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button 
                  onClick={() => navigate(-1)}
                  className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back
                </button>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-lg mb-8">
                  <span className="text-yellow-400 font-bold flex items-center gap-1">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>{movie.release_date?.split("-")[0]}</span>
                  <span className="text-gray-400">•</span>
                  <span>{movie.runtime} min</span>
                  <div className="flex gap-2">
                    {movie.genres.slice(0, 2).map(g => (
                      <span key={g.id} className="text-sm bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>

                {trailerKey && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl shadow-red-600/30 active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    Watch Trailer
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </section>

          {director && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Director</h2>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit pr-8">
                <img
                  src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                  alt={director.name}
                />
                <div>
                  <p className="text-xl font-bold">{director.name}</p>
                  <p className="text-gray-500">Director</p>
                </div>
              </div>
            </section>
          )}

          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-gradient">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {cast.filter(a => a.profile_path).map((actor, idx) => (
                <motion.div
                  key={actor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="text-center group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/10 group-hover:border-red-500/50 transition-colors">
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={actor.name}
                    />
                  </div>
                  <p className="font-bold text-sm line-clamp-1">{actor.name}</p>
                  <p className="text-gray-500 text-xs line-clamp-1">{actor.character}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>


        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl sticky top-24">
            <h3 className="text-xl font-bold mb-6">Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Status</p>
                <p className="text-white font-medium">{movie.status}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Original Language</p>
                <p className="text-white font-medium">{movie.original_language?.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Production</p>
                <div className="space-y-1 mt-1">
                  {movie.production_companies.slice(0, 3).map(c => (
                    <p key={c.id} className="text-white text-sm">{c.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MovieDetails;