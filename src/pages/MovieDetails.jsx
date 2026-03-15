import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

function MovieDetails() {

  const { id } = useParams();   // getting id from URL

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!movie) {
    return <p className="text-white p-10">Loading...</p>;
  }

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-4xl mx-auto">

        <img
          src={poster}
          alt={movie.title}
          className="w-full max-w-md rounded-lg"
        />

        <h1 className="text-4xl font-bold mt-6">
          {movie.title}
        </h1>

        <p className="text-yellow-400 mt-2">
          ⭐ {movie.vote_average}
        </p>

        <p className="text-gray-400 mt-4">
          {movie.overview}
        </p>

        <p className="mt-4">
          Release Date: {movie.release_date}
        </p>

      </div>

    </div>
  );
}

export default MovieDetails;