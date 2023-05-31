<template>
  <img class="c-cards-image" :src="src" :alt="alt" :have="have" />
</template>

<script>
export default {
  name: 'CCardsImage',

  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    have: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.c-cards-image {
  height: 200px;
}
.c-cards-image:hover {
  cursor: pointer;
}
</style>
