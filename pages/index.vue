<template>
  <Home />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* Base para todas as transições */
.page-enter-active,
.page-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  transition:
    all 0.4s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.4s ease;
}

.page-enter-from {
  left: -100%;
  opacity: 0;
}

.page-enter-to {
  left: 0;
  opacity: 1;
}

.page-leave-from {
  transform: scale(1);
  opacity: 1;
}

.page-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
