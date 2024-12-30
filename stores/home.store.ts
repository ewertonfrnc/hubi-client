import { MoviesService } from "~/services/tmdb";
import { SupabaseMoviesService } from "~/services/supabase";
import type { Movie, TMDBMovie } from "~/interfaces/movies/movies.interface";

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
    cast: movie?.credits?.cast || [],
  };
}

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
    async saveWatchedMovie(movie: {}) {
      const watchedMovies = await SupabaseMoviesService.saveWatchedMovie(movie);
      return watchedMovies ?? [];
    },
  },
});
