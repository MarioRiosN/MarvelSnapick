<template>
    <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './styles/mainStyles.scss'
</script>


<style lang="scss">
#app {
  height: 100%;
  font-family: sans-serif;
  background: linear-gradient(
    180deg,
    var(--color-background-light),
    var(--color-background-dark)
  );
  color: var(--color-font);
}
</style>
