<template>
  <div class="c-user">
    <span :innerText="innerText"></span>
    <slot v-if="$slots.icon" name="icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'CUser',

  props: {
    innerText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.c-user {
  display: flex;
  font-weight: bold;
  gap: 5px;
  width: 150px;
  text-transform: uppercase;
  font-size: x-large;
}
</style>
