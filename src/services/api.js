import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export const getPopularMovies = (page = 1) => {
  return api.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
};

export const searchMovies = (query) => {
  return api.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}?api_key=${API_KEY}`);
};

export const getTrendingMovies = () => {
  return api.get(`/trending/movie/week?api_key=${API_KEY}`);
};

export const getTopRatedMovies = () => {
  return api.get(`/movie/top_rated?api_key=${API_KEY}`);
};

export const getMovieCredits = (id) => {
  return api.get(`/movie/${id}/credits?api_key=${API_KEY}`);
};

export default api;