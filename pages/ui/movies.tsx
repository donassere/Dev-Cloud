import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import Link from 'next/link';
import { Movie } from '../../types/movie';

const MovieLine = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/discover');
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {movies &&
        movies.map((movie, index) => (
          <Link key={index} href={`/ui/movie/${movie.id}`}>
            <div className="flex-shrink-0 bg-card p-4 rounded-lg shadow-md w-40">
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 h-56 object-cover mb-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium text-center overflow-hidden whitespace-nowrap overflow-ellipsis">{movie.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MovieLine;