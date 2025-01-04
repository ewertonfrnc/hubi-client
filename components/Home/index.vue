<template>
  <div class="home">
    <!--  NOVIDADES -->
    <HomeTrendingMovies />

    <!--  EM BREVE -->
    <HomeUpcomingMovies />

    <!--  EM ALTA-->
    <HomePopularMovies />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
