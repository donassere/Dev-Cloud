import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { Actor } from '../../../types/actors';

const ActorDetailsPage = () => {
  const router = useRouter();
  const { idActor } = router.query;
  const [actorDetails, setActorDetails] = useState<Actor | null>(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await fetch(`/api/peoples/${idActor}`);
        const data = await response.json();
        setActorDetails(data.data.actor);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    if (idActor) {
      fetchActorDetails();
    }
  }, [idActor]);

  if (!actorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/3">
        <img src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`} alt={actorDetails.name} className="w-full" />
      </div>
      <div className="w-2/3 p-4">
        <h1 className="text-3xl font-bold mb-2">{actorDetails.name}</h1>
        <table>
          <tbody>
            <tr>
              <td className="font-semibold">Also Known As:</td>
              <td>{actorDetails.also_known_as.join(', ')}</td>
            </tr>
            <tr>
              <td className="font-semibold">Birthday:</td>
              <td>{actorDetails.birthday}</td>
            </tr>
            <tr>
              <td className="font-semibold">Place of Birth:</td>
              <td>{actorDetails.place_of_birth}</td>
            </tr>
            <tr>
              <td className="font-semibold">Popularity:</td>
              <td>{actorDetails.popularity}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">Biography: {actorDetails.biography}</p>
      </div>
    </div>
  );
};

export default ActorDetailsPage;
