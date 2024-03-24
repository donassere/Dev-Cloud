import React, { useEffect, useState } from 'react';

interface MovieVideosProps {
    videos: Video[];
}

const MovieVideos: React.FC<MovieVideosProps> = ({ videos }) => {
    const [randomVideoIndex, setRandomVideoIndex] = useState<number | null>(null);

    useEffect(() => {
        if (videos.length > 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setRandomVideoIndex(randomIndex);
        }
    }, [videos]);

    if (!randomVideoIndex || videos.length === 0) {
        return <div>No video available</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-screen-lg">
                <video className="w-full h-96" controls>
                    <source src={`https://www.youtube.com/watch?v=${videos[randomVideoIndex].key}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default MovieVideos;
