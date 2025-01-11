<template>
  <div class="movie" v-if="!state.loading && store.currentMovie">
    <section class="movie__bg-hero">
      <img
        :src="`${BASE_IMAGE_URL}/${store.currentMovie?.backdropPath}`"
        alt=""
        class="movie__cover"
      />
    </section>

    <section class="movie__title">
      <img
        :src="`${BASE_IMAGE_URL}/${store.currentMovie?.posterPath}`"
        alt=""
        class="movie__poster"
      />

      <h1>{{ store.currentMovie?.title }}</h1>
    </section>

    <MovieActions :movie="store.currentMovie" />

    <Tabs value="0">
      <TabList>
        <Tab value="0">SOBRE</Tab>
        <Tab value="1">ELENCO</Tab>
        <Tab value="2">COMENTÁRIOS</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <MovieAbout :movie="store.currentMovie" />
        </TabPanel>
        <TabPanel value="1">
          <MovieCast />
        </TabPanel>
        <TabPanel value="2">
          <MovieComments :movie-id="state.movieId" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";
import MovieActions from "~/components/Movie/MovieActions.vue";

const { params } = useRoute();
const store = useMoviesStore();

type State = { loading: boolean; isWatchedMovie: boolean; movieId: number };
const state = reactive<State>({
  loading: false,
  isWatchedMovie: false,
  movieId: Number(params.movieId),
});

async function fetchMovieDetails() {
  state.loading = true;
  await store.loadMovieDetails(state.movieId);
  state.loading = false;
}

async function checkIfIsWatchedMovie() {
  const watchedMovies = await store.checkIfIsWatchedMovie(state.movieId);
  if (!watchedMovies) return;

  state.isWatchedMovie = !!watchedMovies.find(
    (movie) => movie.movieId === state.movieId,
  );
}

// async function saveWatchedMovie() {
//   const user = JSON.parse(localStorage.getItem("user")!);
//   const watchedMovie = { movieId: movie.value?.id, userId: user.id };
//
//   const watchedMovies = await store.saveWatchedMovie(watchedMovie);
//   isWatchedMovie.value = !!watchedMovies.find(
//     (movie) => movie.movieId === movieId,
//   );
// }

onMounted(() => {
  fetchMovieDetails();
  checkIfIsWatchedMovie();
});
</script>

<style scoped lang="scss">
.movie {
  position: relative;

  &__bg-hero {
    height: 30vh;
    opacity: 0.75;
    z-index: -10;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &::after {
      content: "";
      background: linear-gradient(to bottom, transparent, #121212);
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__title {
    padding: 20px 20px 10px;
    margin-top: -100px;

    display: flex;
    align-items: flex-end;
    gap: 16px;
  }

  &__details {
    padding: 16px;
    display: flex;
    align-items: flex-end;
    gap: 16px;
  }

  &__poster {
    width: 75px;
    border-radius: 8px;
  }

  &__cast {
    display: flex;
    gap: 16px;
    overflow: scroll;
  }

  &__cast-member {
    width: 100px;
    border-radius: 8px;
  }
}
</style>
