import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export const getPopularMovies = () => {
  return api.get(`/movie/popular?api_key=${API_KEY}`);
};

export const searchMovies = (query) => {
  return api.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
};

export default api;