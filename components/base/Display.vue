<template>
  <div class="display">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.display {
  display: flex;
  gap: 16px;
  overflow: scroll;
}
</style>
