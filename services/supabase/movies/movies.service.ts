import type { Movie, MovieReview } from "~/interfaces/movies/movies.interface";
import supabase from "~/services/config/supabase.service";

class SupabaseMoviesService {
  async saveWatchedMovie(movie: {}) {
    const { data, error } = await supabase
      .from("watched_movies")
      .insert([movie])
      .select();

    if (error) throw new Error(error.message);

    return data;
  }

  async checkIfIsWatchedMovie(
    movieId: number,
  ): Promise<{ id: number; movieId: number; userId: string }[] | null> {
    const { data: watched_movies, error } = await supabase
      .from("watched_movies")
      .select("*")
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return watched_movies;
  }

  async loadMovieComments(movieId: number): Promise<MovieReview[]> {
    const { data, error } = await supabase
      .from("movie_reviews")
      .select("*, users(*)")
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return data;
  }
}

export default new SupabaseMoviesService();
