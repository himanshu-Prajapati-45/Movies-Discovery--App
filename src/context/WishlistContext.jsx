import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("movie-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("movie-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist((prev) => [...prev, movie]);
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((m) => m.id === movieId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
