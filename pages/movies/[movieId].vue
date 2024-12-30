<template>
  <div class="movie">
    <section class="movie__bg-hero">
      <img
        :src="`${BASE_IMAGE_URL}/${movie?.backdropPath}`"
        alt=""
        class="movie__cover"
      />
    </section>

    <section class="movie__title">
      <h1>{{ movie?.title }}</h1>
      <span>{{ movie?.tagline }}</span>
    </section>

    <Tabs value="0">
      <TabList>
        <Tab value="0">SOBRE</Tab>
        <Tab value="1">ELENCO</Tab>
        <Tab value="2">COMENTÁRIOS</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <MovieAbout />
        </TabPanel>
        <TabPanel value="1">
          <MovieCast />
        </TabPanel>
        <TabPanel value="2">
          <MovieComments />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!--    <section class="movie__cards">-->
    <!--      <div class="movie__details">-->
    <!--        <img-->
    <!--          :src="`${BASE_IMAGE_URL}/${movie?.posterPath}`"-->
    <!--          alt=""-->
    <!--          class="movie__poster"-->
    <!--        />-->
    <!--        <div class="movie__title">-->
    <!--          <h1>{{ movie?.title }}</h1>-->
    <!--          <p>{{ movie?.tagline }}</p>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <Button-->
    <!--        :label="!isWatchedMovie ? 'Quero assistir' : 'Já vi'"-->
    <!--        @click="saveWatchedMovie"-->
    <!--      />-->

    <!--      <Card>-->
    <!--        <template #title>-->
    <!--          <span>Sinopse</span>-->
    <!--        </template>-->
    <!--        <template #content>-->
    <!--          <p class="movie__synopsis">-->
    <!--            {{ movie?.overview }}-->
    <!--          </p>-->
    <!--        </template>-->
    <!--      </Card>-->

    <!--      <Card>-->
    <!--        <template #title>-->
    <!--          <span>Elenco</span>-->
    <!--        </template>-->
    <!--        <template #content>-->
    <!--          <div class="movie__cast">-->
    <!--            <div v-for="castMember in movie?.cast" :key="castMember.cast_id">-->
    <!--              <img-->
    <!--                :src="`${BASE_IMAGE_URL}/${castMember?.profile_path}`"-->
    <!--                alt=""-->
    <!--                class="movie__cast-member"-->
    <!--              />-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </template>-->
    <!--      </Card>-->
    <!--    </section>-->
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";

const { params } = useRoute();
const store = useMoviesStore();

const movieId = Number(params.movieId);
const movie = ref<Movie>();
const isWatchedMovie = ref(false);

async function fetchMovieDetails() {
  movie.value = await store.loadMovieDetails(movieId);
}

async function checkIfIsWatchedMovie() {
  const watchedMovies = await store.checkIfIsWatchedMovie(movieId);
  if (!watchedMovies) return;

  isWatchedMovie.value = !!watchedMovies.find(
    (movie) => movie.movieId === movieId,
  );
  console.log(isWatchedMovie.value);
}

async function saveWatchedMovie() {
  const user = JSON.parse(localStorage.getItem("user")!);
  const watchedMovie = { movieId: movie.value?.id, userId: user.id };

  const watchedMovies = await store.saveWatchedMovie(watchedMovie);
  isWatchedMovie.value = !!watchedMovies.find(
    (movie) => movie.movieId === movieId,
  );
}

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
  }

  &__cards {
    margin-top: -5rem;
    position: relative;
    z-index: 10;

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  &__details {
    padding: 1.6rem;
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;
  }

  &__poster {
    width: 75px;
    border-radius: 0.8rem;
  }

  &__cast {
    display: flex;
    gap: 1.6rem;
    overflow: scroll;
  }

  &__cast-member {
    width: 10rem;
    border-radius: 0.8rem;
  }
}
</style>
