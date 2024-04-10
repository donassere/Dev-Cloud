import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import Link from 'next/link';
import { Actors } from '../../types/actors';

const ActorLine = () => {
  const [actors, setActors] = useState<Actors[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch('/api/peoples/popular');
        const data = await response.json();
        setActors(data.data.results);
        console.log(data);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, []);

  const chunkArray = (array: Actors[], chunkSize: number) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  return (
    <div className="flex flex-wrap justify-center">
      {chunkArray(actors, 6).map((actorGroup, index) => (
        <div key={index} className="flex flex-wrap justify-center mt-4">
          {actorGroup.map((actor, actorIndex) => (
            <Link key={actorIndex} href={`/ui/actor/${actor.id}`}>
              <div className="flex-shrink-0 bg-card p-4 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110 w-40 mx-4">
                <div className="relative">
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-56 object-cover mb-2"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {actor.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-center overflow-hidden whitespace-nowrap overflow-ellipsis">{actor.name}</p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActorLine;
