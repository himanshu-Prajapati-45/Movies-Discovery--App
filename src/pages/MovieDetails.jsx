import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { getMovieDetails, getMovieImages, getMovieCredits } from "../services/api";

function MovieDetails() {

  const { id } = useParams();   // getting id from URL
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);

  useEffect(() => {

  // movie details
  getMovieDetails(id)
    .then((res) => {
      setMovie(res.data);
    })
    .catch((err) => console.log(err));

  // movie images
  getMovieImages(id)
    .then((res) => {
      setImages(res.data.backdrops.slice(0, 6));
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