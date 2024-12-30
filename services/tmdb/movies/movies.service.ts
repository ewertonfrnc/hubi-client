import api from "~/services/config/axios.service";
import type { TMDBMovie } from "~/interfaces/movies/movies.interface";

class MoviesService {
  async fetchTrendingMovies(): Promise<TMDBMovie[]> {
    const { data } = await api().get("/trending/movie/day", {
      params: { language: "pt-BR" },
    });

    return data.results;
  }

  async loadMovieDetails(movieId: number): Promise<TMDBMovie> {
    const { data } = await api().get(
      `/movie/${movieId}?append_to_response=credits`,
      {
        params: { language: "pt-BR" },
      },
    );

    return data;
  }

  async loadUpcomingMovies(): Promise<TMDBMovie[]> {
    const { data } = await api().get("/movie/upcoming", {
      params: { language: "pt-BR", region: "br" },
    });

    return data.results;
  }

  async loadPopularMovies(): Promise<TMDBMovie[]> {
    const { data } = await api().get("/movie/popular", {
      params: { language: "pt-BR", region: "br" },
    });

    return data.results;
  }
}

export default new MoviesService();
