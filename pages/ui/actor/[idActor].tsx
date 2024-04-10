import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { Actor } from '../../../types/actors';

const ActorDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [actorDetails, setActorDetails] = useState<Actor | null>(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await fetch(`/api/actors/${id}`);
        const data = await response.json();
        setActorDetails(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    if (id) {
      fetchActorDetails();
    }
  }, [id]);

  if (!actorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{actorDetails.name}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`} alt={actorDetails.name} />
      <p>Also Known As: {actorDetails.also_known_as.join(', ')}</p>
      <p>Biography: {actorDetails.biography}</p>
      <p>Birthday: {actorDetails.birthday}</p>
      <p>Place of Birth: {actorDetails.place_of_birth}</p>
      <p>Popularity: {actorDetails.popularity}</p>
    </div>
  );
};

export default ActorDetailsPage;
