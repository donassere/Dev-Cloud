import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import { Movie } from '../types/movie';
import MovieLine from './ui/movies';
import MovieVideos from './ui/video';
import Link from 'next/link';
import { Upcomming } from '../components/upcoming';

const App: NextPageWithLayout = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [randomMovieId, setRandomMovieId] = useState<number | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [showPopup, setShowPopup] = useState(false);

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

                const randomDelay = Math.floor(Math.random() * 10000) + 5000;
                setTimeout(() => {
                    setShowPopup(true);
                }, randomDelay);
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
                const delay = i * 0.1;
                stars.push(
                    <span
                        key={i}
                        className="text-yellow-500 inline-block animate-ping"
                        style={{
                            animation: `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
                            animationDelay: `${delay}s`
                        }}
                    >
                        &#9733;
                    </span>
                );
            } else {
                stars.push(<span key={i} className="text-gray-300 animate-spin">&#9733;</span>);
            }
        }
        return stars;
    };

    const handleRandomVideo = async () => {
        try {
            const randomIndex = Math.floor(Math.random() * topRatedMovies.length);
            const randomMovie = topRatedMovies[randomIndex];
            setRandomMovieId(randomMovie.id);

            const videoResponse = await fetch(`/api/movies/${randomMovie.id}/videos`);
            const videoData = await videoResponse.json();
            setVideos(videoData.data.results);
        } catch (error) {
            console.error('Error fetching random video:', error);
        }
    };

    return (
        <div>
            {randomMovieId && (
                <div className="my-8 mx-auto max-w-screen-xl">
                    <MovieVideos videos={videos} changeVideo={handleRandomVideo} />
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
            <div className="flex overflow-x-auto space-x-4 pb-4">
                {topRatedMovies.map((movie, index) => (
                    <Link key={index} href={`/ui/movie/${movie.id}`}>
                        <div className="flex-shrink-0 bg-card p-4 rounded-lg shadow-md">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-32 h-auto object-cover cursor-pointer transform transition-transform duration-300 hover:scale-110" />
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
            <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
            <Upcomming />
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-xl text-amber-900 font-bold mb-4">Publicité pour lessive</h2>
                        <p className="text-gray-700">Découvrez notre nouvelle lessive qui nettoie efficacement les pulls trempés dans du chocolat !</p>
                        <img src="/th.jpg" alt="image" className="w-50 mr-2" />
                        <button onClick={() => setShowPopup(false)} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
