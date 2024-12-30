<template>
  <div>
    <h2>Vem aí!</h2>

    <div class="display">
      <router-link
        :to="`/movies/${movie?.id}`"
        v-for="movie in upcomingMovies"
        :key="movie.id"
        class="movie"
      >
        <img
          :src="`${BASE_IMAGE_URL}/${movie?.backdropPath}`"
          alt=""
          class="movie__cover"
        />
        <div class="movie__info">
          <img
            :src="`${BASE_IMAGE_URL}/${movie?.posterPath}`"
            alt=""
            class="movie__poster"
          />

          <div>
            <Chip>
              <template #default>
                <span class="movie__chip">{{
                  formatRemainingDaysLabel(movie?.releaseDate)
                }}</span>
              </template>
            </Chip>
            <p>{{ movie?.title }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";

const store = useMoviesStore();
const upcomingMovies = ref<Movie[]>();

function formatRemainingDaysLabel(releaseDate: string): string {
  const remainingDays = countReleaseDays(releaseDate);
  return remainingDays === 1 ? "Amanhã" : `${remainingDays} dias`;
}

async function fetchUpcomingMovies() {
  upcomingMovies.value = await store.loadUpcomingMovies();
}

onMounted(() => fetchUpcomingMovies());
</script>

<style scoped lang="scss">
.display {
  display: flex;
  gap: 1.6rem;
  overflow: scroll;
}

.movie {
  width: 30rem;
  height: 10rem;
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

  &__chip {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>
