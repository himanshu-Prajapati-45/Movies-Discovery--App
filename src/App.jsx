import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/trending" element={<Trending />} />

        <Route path="/toprated" element={<TopRated />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;