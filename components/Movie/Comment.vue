<template>
  <Panel v-for="review in props.reviews" :key="review.id" class="review">
    <template #header>
      <div class="review__header">
        <span>
          {{ review.users?.username }}
        </span>
        <span>
          {{ formatDate(review?.createdAt) }}
        </span>
      </div>
    </template>

    <p>{{ review?.review }}</p>
  </Panel>
</template>

<script setup lang="ts">
import type { MovieReview } from "~/interfaces/movies/movies.interface";

type Props = { reviews: MovieReview[] };
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.review {
  &__header {
    font-size: 12px;
    opacity: 0.75;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
