import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import Link from 'next/link';
import { Movie } from '../types/movie';

export const Upcomming = () => {
  const [upMovie, setUpMovie] = useState<Movie[]>([]);
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => {
    const fetchUpMovie = async () => {
      try {
        const response = await fetch(`/api/movies/upcoming`);
        const data = await response.json();
        setUpMovie(data.data.results);
        setStartDate(data.data.dates.minimum);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchUpMovie();
  }, []);

  return (
    <div>
      <div className="flex overflow-x-auto space-x-4 pb-4 relative">
        {upMovie.map((movie, index) => (
          <Link key={index} href={`/ui/movie/${movie.id}`}>
            <div className="flex-shrink-0 bg-card p-4 rounded-lg shadow-md relative">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-auto object-cover cursor-pointer transform transition-transform duration-300 hover:scale-110"
              />
              {startDate && (
                <p
                className="absolute top-1/2 left-1/4 text-white bg-red-500 py-2 px-4 rounded-lg text-xl font-bold animate-pulse animate-bounce"
                style={{ zIndex: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, bounce 1s infinite', }}
              >
                {startDate}
              </p>
              
              
              )}
              <p className="text-center mt-2 w-32 truncate">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
