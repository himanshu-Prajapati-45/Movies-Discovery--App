import React from 'react';

const MovieSkeleton = () => {
  return (
    <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 animate-pulse">
      {/* Poster Placeholder */}
      <div className="aspect-[2/3] bg-gray-800" />
      
      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const MovieGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  );
};

export default MovieSkeleton;
