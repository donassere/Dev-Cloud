import React, { useEffect, useState } from 'react';

interface Video {
    key: string;
}

interface MovieVideosProps {
    videos: Video[];
    changeVideo: () => void;
}

const MovieVideos: React.FC<MovieVideosProps> = ({ videos, changeVideo }) => {
    const [randomVideoIndex, setRandomVideoIndex] = useState<number | null>(null);

    useEffect(() => {
        if (videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setRandomVideoIndex(randomIndex);
        }
    }, [videos]);

    const handleRandomVideo = () => {
        changeVideo();
    };

    if (!randomVideoIndex || videos.length === 0 || !videos[randomVideoIndex]) {
        return <div>No video available</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-screen-lg">
                    <iframe
                        className="w-full h-96"
                        src={`https://www.youtube.com/embed/${videos[randomVideoIndex].key}`}
                        frameBorder="0"
                        allowFullScreen
                        title="YouTube Video Player"
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleRandomVideo}
                >
                    Show Another Trailer
                </button>
            </div>
        </div>
    );
};

export default MovieVideos;
