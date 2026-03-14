import { useState } from "react";


function Navbar({ onSearch }) {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-red-500">
          🎬 MovieVerse
        </h1>

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearch}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700"
        />

      </div>

    </nav>
  );
}

export default Navbar;