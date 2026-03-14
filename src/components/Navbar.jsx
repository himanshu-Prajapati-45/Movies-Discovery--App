import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500 tracking-wide cursor-pointer">
          🎬 MovieVerse
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">
          <a href="#" className="hover:text-red-500 transition">Home</a>
          <a href="#" className="hover:text-red-500 transition">Trending</a>
          <a href="#" className="hover:text-red-500 transition">Favorites</a>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-red-500 transition"
          />

        </div>

      </div>

    </nav>
  );
}

export default Navbar;