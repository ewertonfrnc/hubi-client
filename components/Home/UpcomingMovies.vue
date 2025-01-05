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
            <p class="movie__title">{{ movie?.title }}</p>
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
  padding: 0 20px;
  overflow: scroll;
  display: flex;
  gap: 16px;
}

.movie {
  width: 300px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &__cover {
    object-fit: cover;
    width: 100%;
    height: 100%;
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

  &__chip {
    font-size: 10px;
    font-weight: 600;
  }

  &__title {
    font-size: 12px;
  }
}
</style>
