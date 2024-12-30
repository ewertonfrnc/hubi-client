<template>
  <h2>Novidades</h2>

  <div class="display">
    <router-link
      :to="`movies/${movie.id}`"
      v-for="movie in trendingMovies"
      :key="movie.id"
      class="movie"
    >
      <img
        :src="`${BASE_IMAGE_URL}/${movie.backdropPath}`"
        alt=""
        class="movie__cover"
      />
      <div class="movie__info">
        <img
          :src="`${BASE_IMAGE_URL}/${movie.posterPath}`"
          alt=""
          class="movie__poster"
        />
        <p>{{ movie.title }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useMoviesStore } from "~/stores/home.store";
import type { Movie } from "~/interfaces/movies/movies.interface";

const store = useMoviesStore();
const trendingMovies = ref<Movie[]>([]);

async function fetchTrendingMovies() {
  trendingMovies.value = await store.fetchTrendingMovies();
}

onMounted(() => fetchTrendingMovies());
</script>

<style scoped lang="scss">
.display {
  display: flex;
  gap: 1.6rem;
  overflow: scroll;
}

.movie {
  width: 30rem;
  height: 20rem;
  flex-shrink: 0;
  border-radius: 1.6rem;
  position: relative;
  overflow: hidden;

  &__cover {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }

  &__info {
    padding: 1.6rem;
    color: var(--white);

    display: flex;
    align-items: flex-end;
    gap: 0.8rem;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__poster {
    width: 5rem;
    height: 7.5rem;
    border-radius: 0.8rem;
    border: 1px solid var(--white);
  }
}
</style>
