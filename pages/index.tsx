import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import { Movie } from '../types/movie';
import MovieLine from './ui/movies';
import MovieVideos from './ui/video';
import Link from 'next/link';

const App: NextPageWithLayout = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [randomMovieId, setRandomMovieId] = useState<number | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await fetch('/api/movies/discover/toprated');
                const data = await response.json();
                setTopRatedMovies(data.data.results);

                const randomIndex = Math.floor(Math.random() * data.data.results.length);
                const randomMovie = data.data.results[randomIndex];
                setRandomMovieId(randomMovie.id);

                const videoResponse = await fetch(`/api/movies/${randomMovie.id}/videos`);
                const videoData = await videoResponse.json();
                setVideos(videoData.data.results);
                console.log(videoData);
                
                
            } catch (error) {
                console.error('Error fetching top rated movies:', error);
            }
        };

        fetchTopRatedMovies();
    }, []);

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating / 2) {
                stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">&#9733;</span>);
            }
        }
        return stars;
    };

    return (
        <div>
            {randomMovieId && (
                <div className="my-8 mx-auto max-w-screen-xl">
                    <MovieVideos videos={videos} />
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
            <div className="flex overflow-x-auto space-x-4 pb-4">
                {topRatedMovies.map((movie, index) => (
                    <Link key={index} href={`/ui/movie/${movie.id}`}>
                    <div className="flex flex-col items-center">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-32 h-auto object-cover" />
                        <p className="text-center mt-2 w-32 truncate">{movie.title}</p>
                        <div className="flex mt-1">
                            {renderStars(movie.vote_average)}
                        </div>
                    </div>
                </Link>
                 ))}
            </div>
            <h1 className="text-2xl font-bold mb-4">Discover</h1>
            <MovieLine />
        </div>
    );
};

export default App;
