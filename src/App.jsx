import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;