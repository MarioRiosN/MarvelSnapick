<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './styles/mainStyles.scss'
</script>


<style lang="scss">
#app {
  height: 100%;
  font-family: sans-serif;
  background: linear-gradient(180deg,
      var(--color-background-light),
      var(--color-background-dark));
  color: var(--color-font);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}

/* .slide-enter-active,
.slide-leave-active{
  transition: all 0.75s ease-out;
}
.slide-enter-to{
  position: absolute;
  right: 30%;
}
.slide-enter-from{
  position: absolute;
  right: -100%;
}
.slide-leave-to{
  position: absolute;
  left: -100%;
}
.slide-leave-from{
  position: absolute;
  left: 0%;
} */
</style>
