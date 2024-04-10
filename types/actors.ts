export interface Actors {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    known_for: Array<{
      adult: boolean;
      backdrop_path: string | null;
      id: number;
      title?: string;
      original_title?: string;
      name?: string;
      original_name?: string;
      overview: string;
      poster_path: string | null;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      release_date?: string;
      first_air_date?: string;
      vote_average: number;
      vote_count: number;
      origin_country?: string[];
    }>;
  }

export interface Actor {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string | null;
  }
  
  