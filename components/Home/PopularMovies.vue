<template>
  <h2>Em alta</h2>

  <template v-if="!state.loading">
    <div class="display">
      <router-link
        v-for="movie in state.popularMovies"
        :to="`/movies/${movie.id}`"
        :key="movie.id"
        class="movie"
      >
        <img
          :src="`${BASE_IMAGE_URL}/${movie?.posterPath}`"
          alt=""
          class="movie__poster"
        />
      </router-link>
    </div>
  </template>
  <template v-else>
    <div class="skeleton-display">
      <Skeleton width="100px" height="150px" />
      <Skeleton width="100px" height="150px" />
      <Skeleton width="100px" height="150px" />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";

const store = useMoviesStore();

const state = reactive({
  loading: false,
  popularMovies: [] as Movie[],
});

async function fetchPopularMovies() {
  state.loading = true;
  state.popularMovies = await store.loadPopularMovies();
  state.loading = false;
}

onMounted(() => fetchPopularMovies());
</script>

<style scoped lang="scss">
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.movie {
  width: 100px;
  border-radius: 8px;
  overflow: hidden;

  &__poster {
    object-fit: cover;
    width: 100%;
  }
}

.skeleton-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
</style>
