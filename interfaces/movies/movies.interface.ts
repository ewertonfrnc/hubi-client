export type TMDBCastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type TMDBMovie = {
  backdrop_path: string;
  id: number;
  title: string;
  tagline: string;
  name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv" | "person";
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: TMDBCastMember[];
  };
};

export type Movie = {
  backdropPath: string;
  id: number;
  title: string;
  tagline: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: "movie" | "tv" | "person";
  genreIds: number[];
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  cast: TMDBCastMember[];
};
