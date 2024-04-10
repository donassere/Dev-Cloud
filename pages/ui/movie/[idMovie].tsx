import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { FullMovie } from '../../../types/movie';
import { useRouter } from 'next/router';
import MovieImages from '../../../components/movie_images';

const MovieDetails = () => {
  const router = useRouter();
  const { idMovie } = router.query;
  const [movie, setMovie] = useState<FullMovie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${idMovie}`);
        const data = await response.json();
        setMovie(data.data.movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (idMovie) {
      fetchMovieDetails();
    }
  }, [idMovie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative lg:w-1/2">
          {movie.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className="w-full" />
          )}
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 px-4 py-2">
            <h2 className="text-white text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-white font-medium">Rating: {movie.vote_average}</p>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2">
          <div className="text-2xl font-bold mb-4">Movie Details</div>
          <div className="flex flex-col gap-4">
            <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-bold">Language:</span> {movie.original_language}</p>
            <p><span className="font-bold">Overview:</span> {movie.overview}</p>
            <p><span className="font-bold">Genres:</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><span className="font-bold">Runtime:</span> {movie.runtime} minutes</p>
            <p><span className="font-bold">Status:</span> {movie.status}</p>
          </div>
        </div>
      </div>
      <div className="lg:w-full">
        <div className="text-2xl font-bold mb-4">Images</div>
        <MovieImages movie={movie} />
      </div>
    </div>
  );
};

export default MovieDetails;
