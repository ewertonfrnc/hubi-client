import { MoviesService } from "~/services/tmdb";
import { SupabaseMoviesService } from "~/services/supabase";
import type {
  CastMember,
  CrewMember,
  Movie, MovieReview,
  TMDBCastMember,
  TMDBCrewMember,
  TMDBMovie,
} from "~/interfaces/movies/movies.interface";

function formatCastMember(members: TMDBCastMember[]): CastMember[] {
  return members.map((member) => ({
    adult: member.adult,
    castId: member.cast_id,
    character: member.character,
    creditId: member.credit_id,
    gender: member.gender,
    id: member.id,
    knownForDepartment: member.known_for_department,
    name: member.name,
    order: member.order,
    originalName: member.original_name,
    popularity: member.popularity,
    profilePath: member.profile_path,
  }));
}

function formatCrewMember(members: TMDBCrewMember[]): CrewMember[] {
  return members.map((member) => ({
    adult: member.adult,
    creditId: member.credit_id,
    gender: member.gender,
    id: member.id,
    knownForDepartment: member.known_for_department,
    name: member.name,
    originalName: member.original_name,
    popularity: member.popularity,
    profilePath: member.profile_path,
    job: member.job,
    department: member.department,
  }));
}

function formatMovieResponse(movie: TMDBMovie): Movie {
  return {
    backdropPath: movie.backdrop_path,
    id: movie.id,
    title: movie.title || movie.name,
    tagline: movie.tagline,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    mediaType: movie.media_type,
    genreIds: movie.genre_ids,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    runtime: movie?.runtime,
    cast: movie?.credits ? formatCastMember(movie?.credits?.cast) : [],
    crew: movie?.credits ? formatCrewMember(movie?.credits?.crew) : [],
  };
}

function formatMovieComment(reviews: MovieReview[]) {}

export const useMoviesStore = defineStore("movies", {
  actions: {
    async fetchTrendingMovies() {
      const trendingMovies = await MoviesService.fetchTrendingMovies();
      return trendingMovies
        .filter((_, idx) => idx < 10)
        .map((movie) => formatMovieResponse(movie));
    },
    async loadMovieDetails(movieId: number) {
      const movieDetails = await MoviesService.loadMovieDetails(movieId);
      return formatMovieResponse(movieDetails);
    },
    async loadUpcomingMovies() {
      const upcomingMovies = await MoviesService.loadUpcomingMovies();

      const sortedUpcomingMovies = upcomingMovies.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );

      return sortedUpcomingMovies
        .filter((movie) => movie.backdrop_path && movie.poster_path)
        .map((movie) => formatMovieResponse(movie));
    },
    async loadPopularMovies() {
      const popularMovies = await MoviesService.loadPopularMovies();
      return popularMovies.map((movie) => formatMovieResponse(movie));
    },
    async checkIfIsWatchedMovie(movieId: number) {
      return await SupabaseMoviesService.checkIfIsWatchedMovie(movieId);
    },
    async saveWatchedMovie(movie: object) {
      const watchedMovies = await SupabaseMoviesService.saveWatchedMovie(movie);
      return watchedMovies ?? [];
    },
    async loadMovieComments(movieId: number) {
      return await SupabaseMoviesService.loadMovieComments(movieId);
    },
  },
});
