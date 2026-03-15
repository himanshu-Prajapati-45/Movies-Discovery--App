import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails, getMovieCredits } from "../services/api";

function MovieDetails() {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);

  useEffect(() => {

    // movie details
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));


    // movie cast & director
    getMovieCredits(id)
      .then((res) => {

        setCast(res.data.cast.slice(0, 10));

        const directorData = res.data.crew.find(
          (person) => person.job === "Director"
        );

        setDirector(directorData);

      })
      .catch((err) => console.log(err));

  }, [id]);

  if (!movie) {
    return <p className="text-white p-10">Loading...</p>;
  }

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        {/* MOVIE INFO */}
        <div className="flex flex-col md:flex-row gap-10">

          <img
            src={poster}
            alt={movie.title}
            className="w-full max-w-sm rounded-lg shadow-xl"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {movie.title}
            </h1>

            <p className="text-yellow-400 mt-3 text-lg">
              ⭐ {movie.vote_average}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">

            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

            <p className="text-gray-400 mt-4 max-w-xl">
              {movie.overview}
            </p>

            <p className="mt-4 text-gray-300">
              Release Date: {movie.release_date}
            </p>

            <p className="text-gray-300 mt-2">
              Runtime: {movie.runtime} min
            </p>

            <p className="text-gray-300">
              Language: {movie.original_language.toUpperCase()}
            </p>
          </div>

        </div>


        {/* DIRECTOR */}
        {director && (
          <div className="mt-16">

            <h2 className="text-2xl font-bold mb-6">
              Director
            </h2>

            <div className="flex items-center gap-6 bg-gray-900 p-6 rounded-lg w-fit">

              <img
                src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                className="w-24 h-24 rounded-full object-cover"
              />

              <div>

                <p className="text-xl font-semibold">
                  {director.name}
                </p>

                <p className="text-gray-400">
                  Director
                </p>

              </div>

            </div>

          </div>
        )}


        {/* CAST */}
        <div className="mt-16">

          <h2 className="text-2xl font-bold mb-6">
            Cast
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {cast
            .filter(actor => actor.profile_path)
            .map((actor) => (

              <div
                key={actor.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300"
              >

                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  className="w-full h-60 object-cover"
                />

                <div className="p-3">

                  <p className="font-semibold">
                    {actor.name}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {actor.character}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;