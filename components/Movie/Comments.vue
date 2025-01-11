<template>
  <div class="comments">
    <p>{{ store.reviews.length }} comentários</p>

    <div class="comments__display">
      <MovieComment :reviews="store.reviews" />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = { movieId: number };
const props = defineProps<Props>();

const store = useMoviesStore();

async function fetchReviews() {
  await store.loadMovieComments(props.movieId);
}

onMounted(() => fetchReviews());
</script>

<style scoped lang="scss">
.comments {
  display: grid;
  gap: 16px;

  &__display {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
