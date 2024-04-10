import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { Image, FullMovie } from '../types/movie';

interface MovieImagesProps {
  movie: FullMovie;
}

const MovieImages: React.FC<MovieImagesProps> = ({ movie }) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`);
        const data = await response.json();
        if (data.backdrops && data.backdrops.length > 0) {
          setImages(data.backdrops);
        } else {
          console.error('No backdrop images found for this movie.');
        }
      } catch (error) {
        console.error('Error fetching movie images:', error);
      }
    };

    fetchMovieImages();
  }, [movie]);

  console.log(images);
  

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index}>
          <img src={`https://image.tmdb.org/t/p/original/${image.file_path}`} alt={`Image ${index + 1}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default MovieImages;
