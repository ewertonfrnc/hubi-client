<template>
  <div class="about">
    <small v-text="props.movie?.tagline" />
    <p v-text="props.movie?.overview" />
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/interfaces/movies/movies.interface";

type Props = { movie: Movie };
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.about {
  font-size: 14px;

  small {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.5;
  }
}
</style>
