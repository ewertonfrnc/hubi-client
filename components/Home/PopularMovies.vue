<template>
  <div>
    <h2>Em alta</h2>

    <div class="display">
      <router-link
        v-for="movie in popularMovies"
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
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";

const store = useMoviesStore();
const popularMovies = ref<Movie[]>();

async function fetchPopularMovies() {
  popularMovies.value = await store.loadPopularMovies();
}

onMounted(() => fetchPopularMovies());
</script>

<style scoped lang="scss">
.display {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
}

.movie {
  width: 10rem;
  border-radius: 0.8rem;
  overflow: hidden;

  &__poster {
    object-fit: cover;
    width: 100%;
  }
}
</style>
