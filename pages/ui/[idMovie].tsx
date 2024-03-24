import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { Movie } from '../../types/movie';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(`/api/movies/${id}/credits`);
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchMovieCredits();
    }
  }, [id]);

  if (!movie) {
    console.log(movie);
    
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="relative lg:w-1/2">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 px-4 py-2">
          <h2 className="text-white text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-white font-medium">Rating: {movie.vote_average}</p>
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Actors</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {cast.map((actor, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} className="w-24 h-auto object-cover rounded-full" />
              <p className="text-center mt-2 w-24 truncate">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

