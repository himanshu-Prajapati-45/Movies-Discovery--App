import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import MovieCard from "../components/MovieCard";
function Home() {
  return (
    <div>

      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto px-6 pt-4 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6">

        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />

      </div>
      

    </div>
  );
}

export default Home;