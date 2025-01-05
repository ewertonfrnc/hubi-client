<template>
  <h2>Novidades</h2>

  <template v-if="!state.loading">
    <div class="display">
      <router-link
        :to="`movies/${movie.id}`"
        v-for="movie in state.trendingMovies"
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
  <template v-else>
    <div class="skeleton-display">
      <Skeleton width="300px" height="169px" />
      <Skeleton width="300px" height="169px" />
      <Skeleton width="300px" height="169px" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { useMoviesStore } from "~/stores/home.store";
import type { Movie } from "~/interfaces/movies/movies.interface";

const store = useMoviesStore();

const state = reactive({
  loading: false,
  trendingMovies: [] as Movie[],
});

async function fetchTrendingMovies() {
  state.loading = true;
  state.trendingMovies = await store.fetchTrendingMovies();
  state.loading = false;
}

onMounted(() => fetchTrendingMovies());
</script>

<style scoped lang="scss">
.display {
  padding: 0 20px;
  overflow: scroll;
  display: flex;
  gap: 16px;
}

.movie {
  width: 300px;
  flex-shrink: 0;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &__cover {
    object-fit: cover;
    width: 100%;
    opacity: 0.4;
  }

  &__info {
    padding: 16px;
    color: var(--white);

    display: flex;
    align-items: flex-end;
    gap: 8px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__poster {
    width: 50px;
    height: 75px;
    border-radius: 8px;
    border: 1px solid var(--white);
  }
}

.skeleton-display {
  padding: 0 20px;
  overflow: scroll;
  display: flex;
  gap: 16px;
}
</style>
